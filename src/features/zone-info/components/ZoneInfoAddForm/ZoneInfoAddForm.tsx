import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {ZoneInfoAddFormProps} from "@/features/zone-info/components/ZoneInfoView/ZoneInfoView";
import {useForm, useStore} from "@tanstack/react-form";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {InputField} from "@/shared/components/Input/InputField";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import FilterSwitch from "@/shared/components/searchFilter/Filters/FilterSwitch/FilterSwitch";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";

const ZoneInfoAddForm =
  forwardRef<FormAddFormRef, ZoneInfoAddFormProps>(({editData, onCanSubmitChange}, ref) => {

  const [ searchModalState, setSearchModalState ] = useState(null)

  const form = useForm({
    defaultValues: {

    },
    onSubmit: ({value}) => {
      return value
    }
  })

  const canSubmit = useStore(form.store, (state)=> state.canSubmit);

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem' }}>
        {
          form.Field({
            name: 'zoneNumber',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'역사번호'}
                  placeholder={'역사번호를 입력해 주세요.'}
                  required
                  disabled
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'zoneName',
            children: (field) => {
              return (
                <FormFieldWrapper
                  label={'역사이름'}
                  required
                >
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
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem' }}>
        {
          form.Field({
            name: 'stationNumber',
            children: (field) => {
              return (
                <FormFieldWrapper label={'구역종류'}>
                  <FilterSelect
                    options={[
                      {
                        key:'1',
                        label:'계단'
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
        {
          form.Field({
            name: 'stationNumber',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'구역명'}
                  placeholder={'역사이름을 입력해 주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem' }}>

        {
          form.Field({
            name: 'cctvId',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'CCTVID'}
                  placeholder={'cctv-id 를 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'stationNumber',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'방송구역'}>
                  <ToggleSwitch
                    checked={true}
                    onChange={()=> {}}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
      </div>
    </form>
  )
})

export default ZoneInfoAddForm;