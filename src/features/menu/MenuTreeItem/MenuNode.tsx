'use client';

import {useEffect, useState, useRef} from "react";
import MenuTree from "@/features/menu/MenuTree/MenuTree";
import styles from './MenuNode.module.css';
import clsx from "clsx";
import {BaseMenu} from "@/types/menu";
import useExpand from '@/features/menu/hooks/useExpand';
import isDescendant from '@/shared/utils/isDescendant';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {
  item: BaseMenu;
  data: BaseMenu[];
  defaultExpandAll: boolean;
  level: number;
  storageKey: string;
  selectedMenu: BaseMenu;
  onSelect: (item: BaseMenu) => void;
  addedMenuId?: string | null;
}

export default function MenuNode(props: Props) {

  const {item, data, defaultExpandAll, level, storageKey, selectedMenu, onSelect} = props;
  const {isOpen, toggle, loadItem} = useExpand({
    storageKey,
    defaultExpandAll,
    id: item.id
  });

  const hasChildren = data?.some(i => i.pid === item.id);

  const hasMounted = useRef(false);
  const [wrapperClass, setWrapperClass] = useState(styles.closed);

  useEffect(() => {
    loadItem();
  }, [item.id, storageKey, defaultExpandAll]);

  useEffect(() => {
    if (isOpen) {
      setWrapperClass(styles.closed);

      const suppressAnimation =
        props.addedMenuId === item.id ||
        (props.addedMenuId && isDescendant(props.data, props.addedMenuId, item.id));

      if (!suppressAnimation) {
        requestAnimationFrame(() => {
          setWrapperClass(styles.open);
        });
      } else {
        setWrapperClass(styles.open);
      }
    } else {
      setWrapperClass(styles.closed);
    }

    if (!hasMounted.current) hasMounted.current = true;
  }, [isOpen, props.addedMenuId]);

  return (
    <li
      className={clsx(
        styles.menu
      )}
    >
      <div className={selectedMenu?.id === item.id ? styles.selected : ''}
           style={{display: 'flex', alignItems: 'center'}}>
        {hasChildren ? (
          <span onClick={toggle} style={{cursor: 'pointer', userSelect: 'none'}}>
            <ImageWrapper width={16} height={16} src={isOpen ? '/tree_up.svg' : '/tree_down.svg'}/>
          </span>
        ) : (
          <span style={{width: '1rem'}}/>
          // <span/>
        )}
        <div
          onClick={() => onSelect(item)}
          style={{
            display: 'flex',
            gap: '.3rem',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#2A2A2B',
          }}
        >
          {/*<Image src={*/}
          {/*  (!item.component && hasChildren) ? '/folder-open.svg' :*/}
          {/*    (!item.component && !hasChildren) ? '/folder-close.svg' : '/file.svg'*/}
          {/*} alt={''} width={20} height={20} />*/}
          {item.name}
        </div>
      </div>
      <div className={clsx(styles.childrenWrapper, wrapperClass)}>
        {isOpen && (
          <MenuTree
            onSelect={onSelect}
            selectedMenu={selectedMenu}
            data={data ?? []}
            parentId={item.id}
            defaultExpandAll={defaultExpandAll}
            level={level + 1}
          />
        )}
      </div>
    </li>
  );
}
