'use client'
import {forwardRef, useImperativeHandle, useState} from "react";
import MenuTree from "@/features/menu/MenuTree/MenuTree";
import MenuEditForm from "@/features/menu/MenuEditForm/MenuEditForm";
import MenuHeader from "@/features/menu/MenuHeader/MenuHeader";
import {useGlobalStore} from "@/shared/store/globalStore";
import {MODAL_MESSAGES} from "@/shared/contants/modalMessage";
import useExpand from "@/features/menu/hooks/useExpand";
import ConfirmModal from "@/shared/components/modal/ConfirmModal/ConfirmModal";
import useModal from "@/shared/hooks/useModal";
import {ActionButtons} from "@/shared/components/actionButtons/ActionButtons";
import styles from './MenuEditArea.module.css'

export type MenuEditAreaRef = {
  submit: () => void;
};

const MenuEditArea = forwardRef<MenuEditAreaRef>((_,ref) =>  {

  const {
    menu, setMenu, selectedMenu, setSelectMenu, addMenu, delMenu, upMenu, downMenu
  } = useGlobalStore(state => state);

  const { isOpen, open: setOpen, close: setClose } = useModal();

  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('저장 로직 실행');
      console.log('선택된 메뉴:', selectedMenu);
      console.log('메뉴 전체:', menu);
    }
  }));

  const { open } = useExpand({storageKey: 'menuState', defaultExpandAll: false, id: selectedMenu.id});
  const [addedMenuId, setAddedMenuId] = useState<string | null>(null);

  const handleAddMenu = () => {
    open();
    setAddedMenuId(selectedMenu.id);
    addMenu();
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <div className={styles.leftPanel}>
          <MenuHeader
            disableCreate={selectedMenu.depth === 3}
            onCreateMenu={handleAddMenu}
            onDeleteMenu={setOpen}
            onUpMenu={upMenu}
            onDownMenu={downMenu}
          />
          <div className={styles.treeArea}>
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
        </div>
        <div className={styles.rightPanel}>
          <MenuEditForm
            menu={menu}
            setMenu={setMenu}
            selectedMenu={selectedMenu}
          />
        </div>
      </div>

      <ConfirmModal
        title={MODAL_MESSAGES.deleteMenuWithChildren.title}
        isOpen={isOpen}
        onCloseAction={setClose}
        actionButtons={
          <ActionButtons
            buttons={[
              {
                label: '취소',
                onClick: setClose,
                variant: 'normal',
              },
              {
                label: '삭제',
                onClick: () => {},
                variant: 'primary',
                disabled: false,
              },
            ]}
          />
        }
      >
        {MODAL_MESSAGES.deleteMenuWithChildren.message}
      </ConfirmModal>
    </div>
  )
});

export default MenuEditArea;