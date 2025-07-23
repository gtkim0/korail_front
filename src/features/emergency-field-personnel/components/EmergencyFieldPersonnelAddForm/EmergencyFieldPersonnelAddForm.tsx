import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {forwardRef, useState, ChangeEvent, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  EmergencyFieldPersonnelAddFormProps
} from "@/features/emergency-field-personnel/components/EmergencyFieldPersonnelView/EmergencyFieldPersonnelView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {z} from "zod";
import {emergencyFieldPersonnelSchema} from "@/features/emergency-field-personnel/schema/emergencyFieldPersonnelSchema";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import CustomDatePicker from "@/shared/components/DatePicker/CustomDatePicker";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {InputField} from "@/shared/components/Input/InputField";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";

const EmergencyFieldPersonnelAddForm =
  forwardRef<FormAddFormRef, EmergencyFieldPersonnelAddFormProps>(({editData, onCanSubmitChange}, ref) => {
    const [ searchModalState, setSearchModalState ] = useState<string | null>(null)

    const form = useCommonForm<z.infer<typeof emergencyFieldPersonnelSchema>>(
      ref,
      editData,
      onCanSubmitChange,
      emergencyFieldPersonnelSchema,
      {
        workingDate: '',
        dayAndNight: '',
        shiftTm: '',
        routeNm: '',
        stationNm: '',
        worker: '',
        position: '',
        emergencyPhone: ''
      }
    )

    return (
      <ModalAddFormLayout>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {form.Field({
            name: 'workingDate',
            children: (field) => {
              return (
                <FormFieldWrapper label={'근무일자'} required>
                  <CustomDatePicker
                    date={new Date()}
                    onChange={() => {}}
                  />
                </FormFieldWrapper>
              );
            },
          })}
          {form.Field({
            name: 'dayAndNight',
            children: (field) => {
              return (
                <FormFieldWrapper label={'주/야'} required>
                  <FilterSelect
                    options={SELECT_OPTIONS.SHIFT_TYPE_OPTIONS}
                    value={'1'}
                    onChange={() => {
                    }}
                  />
                </FormFieldWrapper>
              );
            },
          })}
        </div>
        {
          form.Field({
            name: 'shiftTm',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'교대시간'}
                  placeholder={'교대시간을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'routeNm',
            children: (field) => {
              return (
                <FormFieldWrapper label={'노선명'} required>
                  <SearchModalTrigger
                    value={''}
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
            name: 'stationNm',
            children: (field) => {
              return (
                <FormFieldWrapper label={'역사명'} required>
                  <SearchModalTrigger
                    value={field.getValue()}
                    onSelect={(select)=> {
                      console.log(select)
                    }}
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
            name: 'worker',
            children: (field) => {
              return (
                <FormFieldWrapper label={'근무자'} required>
                  <SearchModalTrigger
                    value={''}
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {form.Field({
            name: 'position',
            children: (field) => {
              return (
                <FormFieldWrapper label={'직책'} required>
                  <FilterSelect
                    options={SELECT_OPTIONS.POSITION_OPTIONS}
                    value={''}
                    onChange={()=>{}}
                  />
                </FormFieldWrapper>
              );
            },
          })}
            {form.Field({
                name: 'emergencyPhone',
                children: (field) => {
                    const rawValue = field.getValue();

                    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                        const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
                        field.handleChange(onlyDigits);
                    };
                    return (
                      <InputField
                        height={'3.6rem'}
                        field={field}
                        label="비상 연락망"
                        required
                        type="text"
                        value={formatPhoneNumber(rawValue)}
                        onChange={handleChange}
                        placeholder="휴대폰 번호를 입력해 주세요."
                        help="예 ) - 없이 이어서 숫자 입력"
                        helpPosition="bottom"
                      />
                    );
                },
            })}
        </div>
      </ModalAddFormLayout>
    )
  }) as any

export default EmergencyFieldPersonnelAddForm;