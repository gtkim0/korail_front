import {z} from "zod";
import {forwardRef, useState} from "react";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import DropDown from "@/shared/components/dropDown/DropDown";
import {EvacuationInfoAddFormProps} from "@/features/evacuationInfo/components/EvacuationInfoView/EvacuationInfoView";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";

export type EvacuationAddFormRef = {
  submit: () => Promise<any>;
};

const ResetSchema = z.object({
  routeName: z.string().min(3, ''),
  stationNum: z.string().min(3, ''),
  stationName: z.string().min(3, ''),
  guideMap: z.string().min(3, ''),
  manual: z.string().min(3, ''),
});

const EvacuationAddForm =
  forwardRef<EvacuationAddFormRef, EvacuationInfoAddFormProps>(({editData, onCanSubmitChange}, ref) => {

  const [ searchModalState, setSearchModalState ] = useState(null)

  const form = useCommonForm<z.infer<typeof ResetSchema>>(
    ref,
    editData,
    onCanSubmitChange,
    ResetSchema,
    {
      manualId: '',
      situationClass: '',
      manualSubject: '',
      writer: '',
      appliedArea: '',
      phone: '',
      useYn: false,
      file: null
    }
  )

  return (
    <ModalAddFormLayout>
      {form.Field({
        name: 'routeName',
        children: (field) => (
          <FormFieldWrapper label={'노선명'}>
            <SearchModalTrigger
              height={'3.6rem'}
              value={''}
              onSelect={() => {}}
              endPoint={''}
              columns={[]}
              isOpen={field.name === searchModalState}
              onOpen={()=> setSearchModalState(field.name)}
              onClose={()=> setSearchModalState(null)}
            />
          </FormFieldWrapper>
        )
      })}
      {form.Field({
        name: 'stationNum',
        children: (field) => (
          <InputField height={'3.6rem'} placeholder="역사번호" required field={field} label="역사번호"/>
        )
      })}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
        {form.Field({
          name: 'stationName',
          children: (field) => (
            <InputField height={'3.6rem'} placeholder="역사명" required field={field} label="역사명"/>
          )
        })}
        {form.Field({
          name: 'guideMap',
          children: (field) => (
            <FormFieldWrapper label={'대피안내도'}>
              <SearchModalTrigger
                height={'3.6rem'}
                value={''}
                onSelect={() => {}}
                endPoint={''}
                columns={[]}
                isOpen={field.name === searchModalState}
                onOpen={()=> setSearchModalState(field.name)}
                onClose={()=> setSearchModalState(null)}
              />
            </FormFieldWrapper>
          )
        })}
      </div>

      {form.Field({
        name: 'manual',
        children: (field) => (
          <FormFieldWrapper label={'비상 대응 메뉴얼'}>
            <div
              style={{
                width: '100%',
                border: '1px solid #d5d5d6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1.2rem',
                height: '3.6rem'
              }}
            >
              <DropDown
                options={
                  [
                    {key: '1', label: '비상 대응 메뉴얼1'},
                    {key: '2', label: '비상 대응 메뉴얼2'},
                    {key: '3', label: '비상 대응 메뉴얼3'},
                  ]
                }
                onSelect={() => {
                  form.setFieldValue(field.name, field.getValue())
                }}
              />
            </div>
          </FormFieldWrapper>
        )
      })}
    </ModalAddFormLayout>
  )
})

export default EvacuationAddForm;