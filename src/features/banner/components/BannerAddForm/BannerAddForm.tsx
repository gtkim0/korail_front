import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from '@tanstack/react-form';
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";

export type BannerAddFormRef = {
  submit: () => void;
};

const BannerAddForm = forwardRef<BannerAddFormRef>((_, ref) => {

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  flex: 1,
                  border: '1px solid #D5D5D6',
                  borderRadius: '4px',
                  background: '#fff',
                  padding: '0 1.2rem',
                  height: '3.6rem',
                  fontSize: '1.5rem',
                  color: '#77777A',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {field.state.value || '이미지 파일을 첨부해 주세요.'}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  height: '3.2rem',
                  padding: '0 1rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minWidth: '6.4rem',
                  borderRadius: '4px',
                  border: '1px solid #5EB2FE',
                  background: '#E2F0FE',
                  color: '#00417A',
                  fontSize: '1.4rem'
                }}
              >
                파일선택
              </button>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </FormFieldWrapper>
        )
      })}
    </form>
  );
});

export default BannerAddForm;

BannerAddForm.displayName = 'BannerAddForm'