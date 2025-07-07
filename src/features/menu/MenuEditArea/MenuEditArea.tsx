'use client'
import {useState} from "react";
import MenuTree from "@/features/menu/MenuTree/MenuTree";
import MenuEditForm from "@/features/menu/MenuEditForm/MenuEditForm";
import MenuHeader from "@/features/menu/MenuHeader/MenuHeader";
import {useGlobalStore} from "@/shared/store/globalStore";
import {toastConfirm} from "@/shared/components/confirm/ToastConfirm/toastConfirm";
import {MODAL_MESSAGES} from "@/shared/contants/modalMessage";
import useExpand from "@/features/menu/hooks/useExpand";

export default function MenuEditArea () {

  const { menu, setMenu, selectedMenu, setSelectMenu, addMenu, delMenu, upMenu, downMenu } = useGlobalStore(state=> state);
  const [menuTreeKey, setMenuTreeKey] = useState(0);
  const { open } = useExpand({ storageKey: 'menuState', defaultExpandAll: false, id: selectedMenu.id });
  const [addedMenuId, setAddedMenuId] = useState<string | null>(null);

  const handleDeleteMenu = async () => {

    const deleteMenuLabel = selectedMenu.name;

    const delMenuHasChildren = menu.filter(i=> i.pid === selectedMenu.id)?.length !== 0;

    const confirm = await toastConfirm(
      delMenuHasChildren ? `${deleteMenuLabel} ${MODAL_MESSAGES.deleteMenuWithChildren.message}` : `${deleteMenuLabel} ${MODAL_MESSAGES.deleteMenu.message}`
    )

    confirm ? delMenu() : null;
  }

  const handleAddMenu = () => {
    open();
    setAddedMenuId(selectedMenu.id);
    setMenuTreeKey(prev => prev + 1); // MenuTree 강제 리렌더링 유도
    addMenu();
  }

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <MenuHeader
        disableCreate={selectedMenu.depth === 3}
        onCreateMenu={handleAddMenu}
        onDeleteMenu={handleDeleteMenu}
        onUpMenu={upMenu}
        onDownMenu={downMenu}
      />
      <div style={{display:'flex',gap:'2rem',padding:'2rem 3rem', height:'50vh'}}>
        <div style={{minWidth: '20rem', height:'100%', overflow:'auto'}}>
          <MenuTree
            storageKey={'menuState'}
            parentId={null}
            data={menu}
            defaultExpandAll={false}
            selectedMenu={selectedMenu}
            onSelect={setSelectMenu}
            addedMenuId={addedMenuId}
          />
        </div>
        <div style={{minWidth:'20rem'}}>
          <MenuEditForm
            menu={menu}
            setMenu={setMenu}
            selectedMenu={selectedMenu}
          />
        </div>
      </div>
    </div>
  )
}