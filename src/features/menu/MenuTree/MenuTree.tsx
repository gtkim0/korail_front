'use client'
import MenuNode from "@/features/menu/MenuTreeItem/MenuNode";
import {BaseMenu, SettingMenu} from "@/types/menu";

interface Props {
  parentId: string | null;
  parentCid?: string | null;
  data: SettingMenu[],
  defaultExpandAll: boolean,
  level?: number,
  storageKey?: string;
  selectedMenu: SettingMenu;
  onSelect: (menu: SettingMenu) => void;
  addedMenuId?: string | null;
}

export default function MenuTree(props: Props) {

  const {
    parentId,
    parentCid,
    data,
    storageKey = 'menuState',
    defaultExpandAll = false,
    level = 1,
    selectedMenu,
    onSelect,
    addedMenuId
  } = props

  const children = data
    .filter(item => {
      const byId = item.upMenuId === parentId;
      const byCid = !item.upMenuId && parentCid && item.upCid === props.parentCid;
      return byId || byCid;
    }).sort((a, b) => a.menuSortSn - b.menuSortSn)

  if (children.length === 0) return null;

  return (
    <div style={{padding: '0 1.6rem', display: 'flex', flex: 1}}>
      <ul style={{
        paddingLeft: (level === 3) ? 0 : level * 6,
        width: '100%',
        background: level === 3 ? '#EBEBEB' : 'inherit',
        borderRadius: level === 3 ? '4px' : 0
      }}>
        {children.map(child => (
          <MenuNode
            key={`${child.cid || child.menuId}-${child.menuSortSn}`}
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

