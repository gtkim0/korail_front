'use client';
import { useForm } from '@tanstack/react-form';
import { InputField } from "@/shared/components/Input/InputField";
import { useEffect } from "react";
import {BaseMenu} from "@/types/menu";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";

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

  return (
    <form
      style={{
        display:'flex',
        flexDirection:'column',
        gap:'3.6rem',
        flex: 1,
        alignSelf:'stretch'
      }}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {form.Field({
        name: 'pid',
        children: (field) => (
         <InputField disabled={true} required={true} field={field} label={'상위 메뉴명'} />
        ),
      })}

      {form.Field({
        name: 'name',
        children: (field) => (
          <InputField updateMenuField={updateMenuField} required={true} label={'현재 메뉴명'} field={field} />
        ),
      })}

      {form.Field({
        name: 'description',
        children: (field) => (
          <InputField updateMenuField={updateDesField} label={'메뉴 도움말'} help={'메뉴 마우스 오버시 풍선도움말을 제공합니다.'} field={field} />
        ),
      })}

      {form.Field({
        name: 'description',
        children: (field) => (
          <InputField updateMenuField={updateDesField} useCheckbox defaultChecked={false} required={true} label={'경로 사용'} help={'메뉴 마우스 오버시 풍선도움말을 제공합니다.'} field={field} />
        ),
      })}

    </form>
  );
}