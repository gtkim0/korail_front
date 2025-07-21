'use client';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  SaveConditionImageAddFormProps
} from "@/features/save-condition/components/SaveConditionImageView/SaveConditionImageView";
import {useForm, useStore} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";

const SaveConditionImageAddForm =
  forwardRef<FormAddFormRef, SaveConditionImageAddFormProps>(({ editData, onCanSubmitChange}, ref) => {

    const [ searchModalState, setSearchModalState ] = useState(null)

    const form = useForm({
      defaultValues: {},
      onSubmit: ({value}) => value
    })

    const canSubmit = useStore(form.store, (state) => state.canSubmit);

    useImperativeHandle(ref, () => ({
      submit: async () => {

        const title = form.getFieldValue('title');
        const content = form.getFieldValue('content');
        const userId = form.getFieldValue('userId');
        const status = form.getFieldValue('status');
        const image_url = form.getFieldValue('image_url');
        const result = ResetSchema.safeParse({title, content, userId, status, image_url});
        if (!result.success) {
          return null;
        }
        return result.data;
      }
    }));

    useEffect(() => {
      onCanSubmitChange?.(canSubmit);
    }, [canSubmit]);

    useEffect(() => {
      if (editData) {
        form.reset(editData);
      }
    }, []);

  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.6rem',
        padding: '1.6rem'
      }}
    >
      {
        form.Field({
          name: 'subject',
          children: (field) => {
            return (
              <InputField
                field={field}
                label={'용도'}
                placeholder={'ex) 혼잡도 검증용'}
                required
                height={'3.6rem'}
              />
            )
          }
        })
      }
    </form>
  )
})

export default SaveConditionImageAddForm;