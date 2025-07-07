'use client';
import { useForm } from '@tanstack/react-form';
import { InputField } from "@/shared/components/Input/InputField";
import { useEffect } from "react";
import {BaseMenu} from "@/types/menu";

interface Props {
  selectedMenu: BaseMenu;
  setMenu: (menus: BaseMenu[])=> void;
  menu: BaseMenu[];
}

export default function MenuEditForm({selectedMenu, setMenu, menu}: Props) {
  // TODO 전역으로 메뉴 가지고있을거니까 ,상위 메뉴 ID 로 상위 메뉴명 찾아내기
  const form = useForm({
    defaultValues: {
      pid: selectedMenu?.pid || '',
      name: selectedMenu?.name || '',
      description: selectedMenu?.description || '',
    },
    onSubmit: async ({ value }) => {
      // 결국 여기서는 api 콜이네.
    },
  });

  const updateMenuField = (value: string) => {
    const updatedMenu = menu.map((item) =>
      item.id === selectedMenu.id ? { ...item, name: value } : item
    );
    setMenu(updatedMenu);
  };

  const updateDesField = (value: string) => {
    const updatedMenu = menu.map((item) =>
      item.id === selectedMenu.id ? { ...item, description: value } : item
    );
    setMenu(updatedMenu);
  };

  useEffect(() => {
    if (selectedMenu) {
      form.setFieldValue('pid', selectedMenu.pid || '');
      form.setFieldValue('name', selectedMenu.name || '');
      form.setFieldValue('description', selectedMenu.description || '');
    }
  }, [selectedMenu]);

  console.log(menu);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {form.Field({
        name: 'pid',
        children: (field) => (
          <InputField disabled={true} field={field} label="상위메뉴" help="대분류를 입력하세요."/>
        ),
      })}

      {form.Field({
        name: 'name',
        children: (field) => (
          <InputField updateMenuField={updateMenuField} field={field} label="메뉴 이름" help="중분류를 입력하세요." />
        ),
      })}

      {form.Field({
        name: 'description',
        children: (field) => (
          <InputField updateMenuField={updateDesField} field={field} label="메뉴 설명" help="메뉴 설명을 입력하세요." />
        ),
      })}

      <button type="submit" style={{ marginTop: '1rem' }}>
        저장
      </button>
    </form>
  );
}