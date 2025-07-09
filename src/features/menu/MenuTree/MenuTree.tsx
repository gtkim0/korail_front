'use client'
import MenuNode from "@/features/menu/MenuTreeItem/MenuNode";
import {BaseMenu} from "@/types/menu";

interface Props {
  parentId: string | null;
  data: BaseMenu[],
  defaultExpandAll: boolean,
  level?: number,
  storageKey?: string;
  selectedMenu: BaseMenu;
  onSelect: (menu: BaseMenu)=> void;
  addedMenuId?: string | null;
}

export default function MenuTree(props: Props) {

  const {
    parentId,
    data,
    storageKey = 'menuState',
    defaultExpandAll = false,
    level = 1,
    selectedMenu,
    onSelect,
    addedMenuId
  } = props

  const children = data
    .filter(item => item.pid === parentId)
    .sort((a, b) => a.order - b.order); // 정렬 추가

  if (children.length === 0) return null;

  return (
    <div
      style={{
        padding:'.8rem 1.6rem',
        display:'flex',
        flex: 1
      }}
    >
      <ul style={{paddingLeft: level * 6}}>
        {children.map(child => (
          <MenuNode
            key={child.id}
            item={child}
            data={data}
            defaultExpandAll={defaultExpandAll}
            level={level}
            storageKey={storageKey}
            selectedMenu={selectedMenu}
            onSelect={onSelect}
            addedMenuId={addedMenuId}
          />
        ))}
      </ul>
    </div>
  );
}

