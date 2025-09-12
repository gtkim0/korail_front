'use client';

import {useEffect, useState, useRef} from "react";
import MenuTree from "@/features/menu/MenuTree/MenuTree";
import styles from './MenuNode.module.css';
import clsx from "clsx";
import {SettingMenu} from "@/types/menu";
import useExpand from '@/features/menu/hooks/useExpand';
import isDescendant from '@/shared/utils/isDescendant';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {
  item: SettingMenu;
  data: SettingMenu[];
  defaultExpandAll: boolean;
  level: number;
  storageKey: string;
  selectedMenu: SettingMenu;
  onSelect: (item: SettingMenu) => void;
  addedMenuId?: string | null;
}

export default function MenuNode(props: Props) {

  const {item, data, defaultExpandAll, level, storageKey, selectedMenu, onSelect} = props;
  const {isOpen, toggle, loadItem} = useExpand({
    storageKey,
    defaultExpandAll,
    id: item.cid || item.menuId
  });

  const hasChildren = data?.some(i => i.upMenuId === item.menuId);

  const hasMounted = useRef(false);
  const [wrapperClass, setWrapperClass] = useState(styles.closed);

  useEffect(() => {
    loadItem();
  }, [item.menuId, storageKey, defaultExpandAll]);

  useEffect(() => {
    if (isOpen) {
      setWrapperClass(styles.closed);

      const suppressAnimation =
        props.addedMenuId === item.menuId ||
        (props.addedMenuId && isDescendant(props.data, props.addedMenuId, item.menuId));

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
        styles.menu,
      )}
    >
      <div
        className={(selectedMenu?.menuId === item.menuId && selectedMenu?.menuSortSn === item.menuSortSn) ? styles.selected : ''}
        style={{display: 'flex', alignItems: 'center', padding: '.6rem 0', gap: '.6rem'}}
      >
        {
          (hasChildren && item.depth !== 3) ? (
            <span onClick={toggle} style={{cursor: 'pointer', userSelect: 'none'}}>
            <ImageWrapper width={16} height={16} src={isOpen ? '/tree_up.svg' : '/tree_down.svg'}/>
          </span>
          ) : (
            <span style={{fontSize: '1.6rem', visibility: 'hidden'}}>
            <ImageWrapper width={16} height={16} src={isOpen ? '/tree_up.svg' : '/tree_down.svg'}/>
          </span>
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
          {item.menuNm}
        </div>
      </div>
      <div className={clsx(styles.childrenWrapper, wrapperClass)}>
        {isOpen && (
          <MenuTree
            onSelect={onSelect}
            selectedMenu={selectedMenu}
            data={data ?? []}
            parentId={item.menuId}
            parentCid={item.cid ?? null}
            defaultExpandAll={defaultExpandAll}
            level={level + 1}
          />
        )}
      </div>
    </li>
  );
}
