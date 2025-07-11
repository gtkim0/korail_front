import styles from './RoutePlanner.module.scss'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import clsx from "clsx";
import {useState, MouseEvent, useRef, useEffect} from "react";
import StationList from "@/features/routeMap/components/StationList/StationList";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";

const dummy = Array.from({length: 15}, (_, i) => ({
  id: i + 1,
  number: `I26K${i+1}`,
  name: `부천역${i+1}`
}));
type Dummy = {
  id: number;
  number: string;
  name: string;
}
type ClickSource = 'left' | 'right';
type LastClicked = {
  index: number;
  source: ClickSource;
} | null;

export const fetchStations = async ({ pageParam = 0 }): Promise<{ data: Dummy[]; nextPage: number | null }> => {
  const res = await fetch(`/api/stations?page=${pageParam}`);
  const json = await res.json();
  return {
    data: json.stations,
    nextPage: json.hasNext ? pageParam + 1 : null,
  };
};

export default function RoutePlanner() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['stations'],
    queryFn: fetchStations,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { ref: bottomRef, inView } = useInView();
  // const stations = data?.pages.flatMap((page) => page.data) ?? [];

  const [ stations, setStations ] = useState<Dummy[]>([...dummy]);
  const [ addStations, setAddStations ] = useState<Dummy[]>([]);
  const [lastClicked, setLastClicked] = useState<LastClicked>(null);
  const [ selected, setSelected ] = useState<number[]>([]);

  const isAllLeftSelected = stations.length > 0 && stations.every(st => selected.includes(st.id));
  const isAllRightSelected = addStations.length > 0 && addStations.every(st => selected.includes(st.id));

  const toggleSelectAll = (source: ClickSource) => {
    const targetList = source === 'left' ? stations : addStations;
    const targetIds = targetList.map(st => st.id);
    const isAllSelected = targetIds.every(id => selected.includes(id));

    if (isAllSelected) {
      setSelected(prev => prev.filter(id => !targetIds.includes(id)));
      setLastClicked(null);
    } else {
      setSelected(prev => Array.from(new Set([...prev, ...targetIds])));
      setLastClicked({ index: 0, source });
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const selectedStations = stations.filter(i => selected.includes(i.id));
    setAddStations(prev => [...prev, ...selectedStations]);
    setStations(prev => prev.filter(i => !selected.includes(i.id)));
    setSelected([]);
    setLastClicked(null);
  }

  const handleCheckboxToggle = (station: Dummy, source: ClickSource) => {

    const list = getCurrentList(source);
    const index = list.findIndex(i => i.id === station.id);

    toggleSelect(station.id);
    updateLastClicked(index, source);
  };

  const handleDelete = () => {
    const selectedStations = addStations.filter(i => selected.includes(i.id));

    setAddStations(prev => prev.filter(i => !selected.includes(i.id)));

    setStations(prev => {
      const existingIds = new Set(prev.map(i => i.id));
      const filteredToAdd = selectedStations.filter(i => !existingIds.has(i.id));
      return [...prev, ...filteredToAdd];
    });

    setSelected([]);
    setLastClicked(null);
  };

  const getCurrentList = (source: ClickSource) =>
    source === 'left' ? stations : addStations;

  const updateLastClicked = (index: number, source: ClickSource) =>
    setLastClicked({ index, source });

  const toggleSelect = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  /**
   * @TODO
   * @param e
   * @param station
   * @param source
   *
   * 리스트에서 station id 가 몇번째 인덱스인지 찾아서 currentIndex
   * Shift 누른 상태에서 클릭하면, lastClickedIndex 부터 현재 클릭까지의 범위를 구해서 선택
   * 기존 selected와 합쳐서 중복 제거
   * infiniteScroll 처리하거나 , 검색했을때 문제없어보이는데, 추후 확인필요
   * shift 시 mac 도 지원해야되는지 ? e.metaKey 까지 넣을지 말지.
   */
  const handleStationClick = (
    e: MouseEvent,
    station: Dummy,
    source: ClickSource
  ) => {
    const list = getCurrentList(source);
    const currentIndex = list.findIndex((i) => i.id === station.id);

    if (e.shiftKey && lastClicked?.source === source) {
      const start = Math.min(lastClicked.index, currentIndex);
      const end = Math.max(lastClicked.index, currentIndex);
      const range = list.slice(start, end + 1).map((i) => i.id);
      setSelected((prev) => Array.from(new Set([...prev, ...range])));
    } else if (e.ctrlKey || e.metaKey) {
      toggleSelect(station.id);
      updateLastClicked(currentIndex, source);
    } else {
      setSelected([station.id]);
      updateLastClicked(currentIndex, source);
    }
  };

  const handleSearch = () => {

  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        <div className={styles.inputArea}>
          <div className={styles.input}>
            <input ref={inputRef} placeholder={'검색어를 입력해주세요.'}/>
            <span onClick={handleSearch} style={{cursor:'pointer'}}>
              <ImageWrapper width={20} height={20} src={'/search.svg'}/>
            </span>
          </div>
        </div>

        <div className={styles.stationArea}>
          <div className={styles.header}>
            <div className={styles.item}><input checked={isAllLeftSelected} onChange={()=> toggleSelectAll('left')} type={'checkbox'} /></div>
            <div className={clsx(styles.item, styles.number)}>역번호</div>
            <div className={clsx(styles.item, styles.name)}>역사명</div>
          </div>
          <div className={styles.stationList}>
            <StationList
              items={stations}
              selectedIds={selected}
              source="left"
              onClick={handleStationClick}
              onCheckToggle={handleCheckboxToggle}
            />
          </div>

          {/*<div className={styles.stationList}>*/}
          {/*  <StationList*/}
          {/*    items={stations}*/}
          {/*    selectedIds={selected}*/}
          {/*    source="left"*/}
          {/*    onClick={handleStationClick}*/}
          {/*    onCheckToggle={handleCheckboxToggle}*/}
          {/*  />*/}
          {/*  {hasNextPage && (*/}
          {/*    <div ref={bottomRef} className={styles.loading}>*/}
          {/*      {isFetchingNextPage && <span>불러오는 중...</span>}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>

      <div className={styles.switchBtnArea}>
        <button
          onClick={handleAdd}
          className={(selected.length !== 0 && lastClicked?.source === 'left') ? styles.active : ''}
        >
          <ImageWrapper width={16} height={16} src={'/arrow-right.svg'}/>
        </button>
        <button
          onClick={handleDelete}
          className={(selected.length !== 0 && lastClicked?.source === 'right') ? styles.active : ''}
        >
          <ImageWrapper width={16} height={16} src={'/arrow-left.svg'}/>
        </button>
      </div>

      <div className={styles.rightArea}>
        <div className={styles.header}>
          <div className={styles.inner}>
          <span>
            총 <span className={styles.count}>{addStations.length}</span>개 등록됨
          </span>
            <div className={styles.buttonArea}>
              <button><ImageWrapper width={20} height={20} src={'/arrow-top.svg'}/></button>
              <button><ImageWrapper width={20} height={20} src={'/arrow-down.svg'}/></button>
            </div>
          </div>
        </div>

        <div className={styles.addedArea}>
          <div className={styles.header}>
            <div className={styles.item}><input checked={isAllRightSelected} onChange={()=> toggleSelectAll('right')} type={'checkbox'} /></div>
            <div className={clsx(styles.item, styles.order)}>순서</div>
            <div className={clsx(styles.item, styles.number)}>역번호</div>
            <div className={clsx(styles.item, styles.name)}>역사명</div>
          </div>
          <div className={styles.addedStationArea}>
            <StationList
              items={addStations}
              selectedIds={selected}
              source="right"
              onClick={handleStationClick}
              onCheckToggle={handleCheckboxToggle}
              isOrdered
            />
          </div>
        </div>
      </div>
    </div>
  );
}
