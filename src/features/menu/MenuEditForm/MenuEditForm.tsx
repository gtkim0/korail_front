'use client';
import {useForm} from '@tanstack/react-form';
import {InputField} from "@/shared/components/Input/InputField";
import {useEffect, useMemo} from "react";
import {SettingMenu} from "@/types/menu";

interface Props {
  selectedMenu: SettingMenu;
  setMenu: (menus: SettingMenu[]) => void;
  menu: SettingMenu[];
}

export default function MenuEditForm({selectedMenu, setMenu, menu}: Props) {
  const parentName = useMemo(() => {
    if (!selectedMenu || selectedMenu.depth === 1) return '';
    const parent =
      (selectedMenu.upMenuId
        ? menu.find(m => m.menuId === selectedMenu.upMenuId)
        : menu.find(m => m.cid === selectedMenu.upCid)) || null;
    return parent?.menuNm ?? '';
  }, [menu, selectedMenu]);

  const form = useForm({
    defaultValues: {
      menuId: selectedMenu?.menuId || '',
      upMenuNmReadonly: parentName || '',      // 화면표시용, 서버전송 X
      menuNm: selectedMenu?.menuNm || '',
      menuExplnCn: selectedMenu?.menuExplnCn || '',
      insdPrgrmIdntfNm: selectedMenu?.insdPrgrmIdntfNm || ''
    },
    onSubmit: async ({value}) => {
      console.log(value);
    },
  });

  const update =
    <K extends keyof SettingMenu>(key: K) =>
      (value: SettingMenu[K]) => {
        const updated = menu.map(item =>
          item.cid === selectedMenu.cid ? {...item, [key]: value} : item
        );
        setMenu(updated);
      };

  const updateIdField = (newId: string) => {
    const oldId = selectedMenu.menuId;
    const updated = menu.map(item => {
      if (item.cid === selectedMenu.cid) {
        return {...item, menuId: newId};
      }
      if (oldId && item.upMenuId === oldId) {
        return {...item, upMenuId: newId};
      }
      return item;
    });
    setMenu(updated);
  };

  const updateMenuNm = update('menuNm');
  const updateMenuExplnCn = update('menuExplnCn');
  const updateProgramId = update('insdPrgrmIdntfNm');

  useEffect(() => {
    if (!selectedMenu) return;
    form.setFieldValue('menuId', selectedMenu.menuId || '');
    form.setFieldValue('upMenuNmReadonly', parentName || '');
    form.setFieldValue('menuNm', selectedMenu.menuNm || '');
    form.setFieldValue('menuExplnCn', selectedMenu.menuExplnCn || '');
    form.setFieldValue('insdPrgrmIdntfNm', selectedMenu.insdPrgrmIdntfNm || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu, parentName]);

  const root = selectedMenu.depth === 0;
  const first = selectedMenu.depth === 1;
  const third = selectedMenu.depth === 3;

  const isExistId = !!selectedMenu.menuId;

  return (
    <form
      style={{display: 'flex', flexDirection: 'column', gap: '3.6rem', alignSelf: 'stretch'}}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {form.Field({
        name: 'menuId',
        children: (field) => (
          <InputField
            field={field}
            label={'메뉴 ID'}
            required
            disabled={isExistId}
            updateMenuField={updateIdField}
          />
        ),
      })}

      {(!first && !root) && form.Field({
        name: 'upMenuNmReadonly',
        children: (field) => (
          <InputField
            field={field}
            label={'상위 메뉴명'}
            disabled
          />
        ),
      })}

      {form.Field({
        name: 'menuNm',
        children: (field) => (
          <InputField
            field={field}
            label={'현재 메뉴명'}
            required
            updateMenuField={updateMenuNm}
          />
        ),
      })}

      {third && form.Field({
        name: 'menuExplnCn',
        children: (field) => (
          <InputField
            field={field}
            label={'메뉴 도움말'}
            help={'메뉴 마우스 오버시 풍선도움말을 제공합니다.'}
            updateMenuField={updateMenuExplnCn}
          />
        ),
      })}

      {third && form.Field({
        name: 'insdPrgrmIdntfNm',
        children: (field) => (
          <InputField
            field={field}
            label={'프로그램 ID'}
            help={'실제 소스코드 ID와 연결됩니다.'}
            updateMenuField={updateProgramId}
          />
        ),
      })}
    </form>
  );
}