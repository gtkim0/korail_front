import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  EmergencyGuideInfoAddFormProps
} from "@/features/emergency-guide-info/components/EmergencyGuideInfoView/EmergencyGuideInfoView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {z} from "zod";
import {emergencyGuideInfoSchema} from "@/features/emergency-guide-info/schema/emergencyGuideInfoSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import InputTextArea from "@/shared/components/Input/InputTextArea";

const EmergencyGuideInfoAddForm =
  forwardRef<FormAddFormRef, EmergencyGuideInfoAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<z.infer<typeof emergencyGuideInfoSchema>>(
      ref,
      editData,
      onCanSubmitChange,
      emergencyGuideInfoSchema,
      {
        zone: '',
        title: '',
        content: '',
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'zone',
            children: (field) => {
              return (
                <FormFieldWrapper label={'구분'}>
                  <FilterSelect
                    options={SELECT_OPTIONS.ZONE_OPTIONS}
                    value={field.state.value}
                    onChange={(key)=> field.handleChange(key)}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'title',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'제목'}
                  placeholder={'제목을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'content',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'내용'}>
                  <InputTextArea
                    rows={10}
                    name={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e)=> {
                      field?.handleChange(e.target.value)
                    }}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
      </ModalAddFormLayout>
    )
})

export default EmergencyGuideInfoAddForm;