import styles from '../RoutePlanner/RoutePlanner.module.scss'
import clsx from "clsx";
import {MouseEvent} from "react";

type Dummy = {
  id: number;
  number: string;
  name: string;
}

type ClickSource = 'left' | 'right';


interface StationListProps {
  items: Dummy[];
  selectedIds: number[];
  onClick: (e: MouseEvent, station: Dummy, source: ClickSource) => void;
  onCheckToggle?: (station: Dummy, source: ClickSource) => void;
  source: ClickSource;
  isOrdered?: boolean;
}

export default function StationList({items, selectedIds, onClick, onCheckToggle, source, isOrdered = false}: StationListProps) {
  return (
    <>
      {items.map((station, idx) => {

        const isSelected = selectedIds.includes(station.id);

        return (
          <div
            key={station.id}
            onClick={(e) => onClick(e, station, source)}
            className={clsx(
              source === 'left' ? styles.station : styles.addStation,
              selectedIds.includes(station.id) && styles.selected
            )}
          >
            {
              <div className={styles.item}>
                <input
                  onClick={e=> e.stopPropagation()}
                  onChange={() => {
                    onCheckToggle?.(station, source);
                  }}
                  checked={isSelected}
                  type={'checkbox'}/>
              </div>
            }
            {isOrdered && (
              <div className={clsx(styles.item, styles.order)}>{idx + 1}</div>
            )}
            <div className={clsx(styles.item, styles.number)}>{station.number}</div>
            <div className={clsx(styles.item, styles.name)}>{station.name}</div>
          </div>
        )
      })}
    </>
  );
}