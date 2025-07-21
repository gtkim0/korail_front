import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  EmergencyManualAddFormProps
} from "@/features/emergency-manual/components/EmergencyManualView/EmergencyManualView";
import {useForm, useStore} from "@tanstack/react-form";

const EmergencyManualAddForm =
  forwardRef<FormAddFormRef, EmergencyManualAddFormProps>(({editData, onCanSubmitChange}, ref) => {

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

      </form>
    )

  })

export default EmergencyManualAddForm;