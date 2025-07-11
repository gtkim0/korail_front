import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import { useForm } from '@tanstack/react-form';
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {FileInput} from "@/shared/components/fileInput/FileInput";

export type BannerAddFormRef = {
  submit: () => void;
};

const BannerAddForm = forwardRef<BannerAddFormRef>((_, ref) => {

  const [ file, setFile ] = useState<File | null>(null);
  const form = useForm({
    defaultValues: {
      name: '',
      image: '',
      url: '',
      startDate: '',
      endDate: '',
      useYn: ''
    },
    onSubmit: async ({ value }) => {
      console.log('🟢 제출된 데이터:', value);
    },
  });


  const handleFileChange = (file: File | null) => {
    console.log(file);
    if (file) {
      setFile(file);
      form.setFieldValue('image', file.name);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(); // 또는 form.submit()
    },
  }));

  return (
    <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3.6rem' }}>
      {form.Field({
        name: 'name',
        children: (field) => (
          <InputField placeholder={'배너명을 입력해주세요.'} required={true} field={field} label={'배너명'} />
        ),
      })}
      {form.Field({
        name: 'image',
        children: (field) => (
          <FormFieldWrapper label={'이미지명'}>
            <FileInput value={file?.name || ''} onChange={handleFileChange} />
          </FormFieldWrapper>
        )
      })}
    </form>
  );
});

export default BannerAddForm;

BannerAddForm.displayName = 'BannerAddForm'