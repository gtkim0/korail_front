'use client';
import {forwardRef, useEffect, useState, useImperativeHandle} from "react";
import {FormAddFormRef} from "@/types/common";
import {SpecialPeriodAddFormProps} from "@/features/special-period/components/SpecialPeriodView/SpecialPeriodView";
import {useForm, useStore} from "@tanstack/react-form";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {InputField} from "@/shared/components/Input/InputField";
import DatePickerRange from "@/shared/components/DatePicker/DatePickerRange";
import Form from "next/form";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";

const SpecialPeriodAddForm =
  forwardRef<FormAddFormRef, SpecialPeriodAddFormProps>(({editData, onCanSubmitChange}, ref) => {

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
            name: 'routeName',
            children: (field) => {
              return (
                <FormFieldWrapper label={'노선명'} required>
                  <SearchModalTrigger
                    value={{}}
                    onSelect={()=> {}}
                    endPoint={'/'}
                    columns={[]}
                    isOpen={field.name === searchModalState}
                    onOpen={()=> setSearchModalState(field.name)}
                    onClose={()=> setSearchModalState(null)}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'stationName',
            children: (field) => {
              return (
                <FormFieldWrapper label={'역사명'} required>
                  <SearchModalTrigger
                    value={{}}
                    onSelect={()=> {}}
                    endPoint={'/'}
                    columns={[]}
                    isOpen={field.name === searchModalState}
                    onOpen={()=> setSearchModalState(field.name)}
                    onClose={()=> setSearchModalState(null)}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'subject',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'제목'}
                  placeholder={'제목을 입력해 주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }

        {
          form.Field({
            name: 'subject',
            children: (field) => {
              return (
                <FormFieldWrapper label={'사용 유무'} required>
                  <ToggleSwitch
                    checked={true}
                    onChange={()=> {}}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'subject',
            children: (field) => {
              return (
                <FormFieldWrapper label={'기간'} required>
                  <DatePickerRange
                    startDate={new Date()}
                    endDate={new Date()}
                    onChange={({ startDate, endDate}) => {}}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
      </form>
    )
  })

export default SpecialPeriodAddForm