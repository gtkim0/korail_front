import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {ROUTE_TYPE_OPTIONS} from "@/shared/contants/selectOptions/routeTypeOptions";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {ProgrammingInfoAddFormType} from "@/features/programming-info/columns/ProgramminInfoColumns";
import {carriageInfoSchema} from "@/features/carriageInfo/schema/carriageInfoSchema";
import {CarriageInfoColumnsType} from "@/types/carriage-info";
import {InputField} from "@/shared/components/Input/InputField";
import Form from "next/form";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import CustomDatePicker from "@/shared/components/DatePicker/CustomDatePicker";

export type CarriageInfoFormType = Omit<CarriageInfoColumnsType, 'id' | 'date'>

const CarriageInfoAddForm =
  forwardRef<FormAddFormRef, any>(({editData, onCanSubmitChange}, ref) => {

    const [searchModalState, setSearchModalState] = useState<string | null>(null)

    const form = useCommonForm<CarriageInfoFormType>(
      ref,
      editData,
      onCanSubmitChange,
      carriageInfoSchema,
      {
        trainNum: '',
        trainType: '',
        passengerNum: '',
        floorArea: '',
        cctv1: '',
        cctv2: '',
        introductionDate: ''
      }
    )

    return (
      <ModalAddFormLayout>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem', rowGap: '3.6rem'}}>
          {
            form.Field({
              name: 'trainNum',
              children: (field) => (
                <InputField
                  height={'3.6rem'}
                  name={field.name}
                  placeholder={'차량번호'}
                  required={true}
                  field={field}
                  label={'차량번호'}
                />
              ),
            })
          }
          {
            form.Field({
              name: 'trainType',
              children: (field) => (
                <FormFieldWrapper required label={'차량종류'}>
                  <FilterSelect
                    enabledAll={false}
                    options={[]}
                    value={field.getValue()}
                    onChange={(v) => field.handleChange(v)}
                  />
                </FormFieldWrapper>
              ),
            })
          }
          {
            form.Field({
              name: 'passengerNum',
              children: (field) => (
                <InputField
                  height={'3.6rem'}
                  name={field.name}
                  placeholder={'승차인원'}
                  required={true}
                  field={field}
                  label={'승차인원'}
                />
              ),
            })
          }
          {
            form.Field({
              name: 'floorArea',
              children: (field) => (
                <InputField
                  height={'3.6rem'}
                  name={field.name}
                  placeholder={'바닥면적(m2)'}
                  required={true}
                  field={field}
                  label={'바닥면적(m2)'}
                />
              ),
            })
          }
        </div>
        {
          form.Field({
            name: 'cctv1',
            children: (field) => (
              <FormFieldWrapper required label={'CCTV1'}>
                <SearchModalTrigger
                  value={field.state.value}
                  onSelect={(t) => {
                    console.log(t);
                  }}
                  endPoint={'/'}
                  columns={[]}
                  isOpen={field.name === searchModalState}
                  onOpen={() => setSearchModalState(field.name)}
                  onClose={() => setSearchModalState(null)}
                />
              </FormFieldWrapper>
            ),
          })
        }
        {
          form.Field({
            name: 'cctv2',
            children: (field) => (
              <FormFieldWrapper required label={'CCTV1'}>
                <SearchModalTrigger
                  value={field.state.value}
                  onSelect={(t) => {
                    console.log(t);
                  }}
                  endPoint={'/'}
                  columns={[]}
                  isOpen={field.name === searchModalState}
                  onOpen={() => setSearchModalState(field.name)}
                  onClose={() => setSearchModalState(null)}
                />
              </FormFieldWrapper>
            ),
          })
        }
        {
          form.Field({
            name: 'introductionDate',
            children: (field) => (
              <FormFieldWrapper required label={'도입일자'}>
                <CustomDatePicker date={new Date()} onChange={() => {
                }}/>
              </FormFieldWrapper>
            ),
          })
        }

      </ModalAddFormLayout>
    )
  })

export default CarriageInfoAddForm;