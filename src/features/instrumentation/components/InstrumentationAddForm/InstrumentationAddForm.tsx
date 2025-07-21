'use client';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  InstrumentationAddFormProps
} from "@/features/instrumentation/components/InstrumentationView/InstrumentationView";
import {useForm, useStore} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import DropDown from "@/shared/components/dropDown/DropDown";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";

const InstrumentationAddForm =
  forwardRef<FormAddFormRef, InstrumentationAddFormProps>(({editData, onCanSubmitChange}, ref) => {

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
                  label={'관리번호'}
                  placeholder={'관리번호를 입력해 주세요.'}
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
                <InputField
                  field={field}
                  label={'IP'}
                  placeholder={'IP를 입력해 주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'stationName',
            children: (field) => {
              return (
                <FormFieldWrapper label={'편성번호'} required>
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
            name: 'trainNum',
            children: (field) => {
              return (
                <FormFieldWrapper label={'차량번호'} required>
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
                  label={'데이터보관기간(일)'}
                  placeholder={'데이터보관기간을 입력해주세요.'}
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
                <FormFieldWrapper required label={'운영상태'}>
                  <FilterSelect 
                    options={[
                      {
                        key:'1',
                        label:'운영중'
                      },
                      {
                        key:'2',
                        label:'수리중'
                      },
                      {
                        key:'3',
                        label:'통신불가'
                      }
                    ]} 
                    value={{}} 
                    onChange={()=> {}} 
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
      </form>
    )
  })

export default InstrumentationAddForm;