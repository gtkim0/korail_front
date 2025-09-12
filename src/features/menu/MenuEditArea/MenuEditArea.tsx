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
import {toast} from "react-hot-toast";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {SettingMenu} from "@/types/menu";
import {useRouter} from "next/navigation";

export type MenuEditAreaRef = {
  submit: () => void;
};

type IProps = {
  onCloseModal: () => void;
}

type ServerMenuDto = {
  menuId: string | null;
  upMenuId: string | null;
  lnkgUrlAddrCn?: string | null;
  menuSortSn: number;
  menuNm: string;
  depth: number;
  menuExplnCn?: string | null;
  insdPrgrmIdntfNm?: string | null;
  cid?: string;
  upCid?: string | null;
  isNew?: boolean;
};

const normalize = (v?: string | null) => (v && v.trim() !== '' ? v : null);

function serializeForSave(menus: SettingMenu[], includeCid = true): ServerMenuDto[] {
  const filtered = menus.filter(m => !['DASHBOARD', 'ROOT', 'ROOT_TREE'].includes(m.menuId));

  const ordered = [...filtered].sort(
    (a, b) => a.depth - b.depth ||
      (a.upMenuId ?? '').localeCompare(b.upMenuId ?? '') ||
      a.menuSortSn - b.menuSortSn
  );

  return ordered.map(m => ({
    menuId: normalize(m.menuId),
    upMenuId: normalize(m.upMenuId),
    lnkgUrlAddrCn: m.lnkgUrlAddrCn ?? null,
    menuSortSn: m.menuSortSn,
    menuNm: m.menuNm,
    depth: m.depth,
    menuExplnCn: m.menuExplnCn ?? null,
    insdPrgrmIdntfNm: m.insdPrgrmIdntfNm ?? null,
    // ...(includeCid ? {cid: m.cid, upCid: m.upCid ?? null,
    // isNew: !normalize(m.menuId)} : {}),
  }));
}

const MenuEditArea = forwardRef<MenuEditAreaRef, IProps>((props, ref) => {

  const {onCloseModal} = props;

  const {
    menu, setMenu, selectedMenu, setSelectMenu, addMenu, delMenu, upMenu, downMenu
  } = useGlobalStore(state => state);

  const router = useRouter();

  const api = useClientApi();

  const {isOpen, open: setOpen, close: setClose} = useModal();

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const payload = serializeForSave(menu, false);

        const res = await api.post('/api/menus/update', payload);

        if (res.resultCode !== '0000') {
          toast.error('저장에 실패하였습니다.');
          return;
        }

        const latest = await api.get('/api/menus/get-list');
        if (latest?.result) {
          setMenu(latest.result.list);
          onCloseModal();
          router.refresh();
        } else if (Array.isArray(latest)) setMenu(latest);

        toast.success('저장에 성공하였습니다.');
      } catch (e) {
        console.error(e);
        toast.error('저장 중 오류가 발생했습니다.');
      }
    }
  }));

  const {open} = useExpand({
    storageKey: 'menuState',
    defaultExpandAll: false,
    id: selectedMenu.cid || selectedMenu.menuId
  });
  const [addedMenuId, setAddedMenuId] = useState<string | null>(null);

  const handleAddMenu = () => {
    if (selectedMenu.depth === 3) {
      toast.error('메뉴는 3뎁스 까지만 생성 가능합니다.')
      return;
    }
    open();
    setAddedMenuId(selectedMenu.cid || selectedMenu.menuId);
    addMenu();
  }

  const isDashboard = selectedMenu.menuId === 'DASHBOARD'

  const addRootMenus = [
    {
      depth: 0,
      menuId: 'ROOT',
      menuNm: '메뉴',
      upMenuId: 'ROOT_TREE',
      menuSortSn: 1,
    },
    ...menu
  ]

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <div className={styles.leftPanel}>
          <MenuHeader
            disableCreate={selectedMenu.depth === 3 || isDashboard}
            onCreateMenu={handleAddMenu}
            onDeleteMenu={setOpen}
            onUpMenu={upMenu}
            onDownMenu={downMenu}
          />
          <div className={styles.treeArea}>
            <MenuTree
              storageKey={'menuState'}
              parentId={'ROOT_TREE'}
              data={addRootMenus}
              defaultExpandAll={false}
              selectedMenu={selectedMenu}
              onSelect={setSelectMenu}
              addedMenuId={addedMenuId}
            />
          </div>
        </div>
        <div className={styles.rightPanel}>
          {
            (selectedMenu.hasOwnProperty('menuId')) ?
              <MenuEditForm
                menu={menu}
                setMenu={setMenu}
                selectedMenu={selectedMenu}
              />
              :
              <>
                메뉴를 선택해주세요.
              </>
          }
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
                onClick: () => {
                },
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