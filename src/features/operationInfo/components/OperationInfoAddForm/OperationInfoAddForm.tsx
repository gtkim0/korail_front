import {InputField} from "@/shared/components/Input/InputField";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {commonSearchColumns} from "@/shared/contants/commonSearchColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import "react-datepicker/dist/react-datepicker.css";
import RcTimePicker from "@/shared/components/timePicker/TimePicker";
import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {OperationInfoAddFormProps} from "@/features/operationInfo/components/OperationInfoView/OperationInfoView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {permissionGroupSchema} from "@/features/permission-group/schema/permissionGroupSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {OperationInfoColumnType} from "@/types/operationInfo";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import {OPERATION_TYPE_OPTIONS} from "@/shared/contants/selectOptions/operationTypeOptions";
import {DAY_CLASSIFICATION_OPTIONS} from "@/shared/contants/selectOptions/dayClassificationOptions";
import {ROUTE_TYPE_OPTIONS} from "@/shared/contants/selectOptions/routeTypeOptions";

export type OperationInfoFormType = Omit<OperationInfoColumnType, 'id' | 'date'>;

const OperationInfoAddForm =
  forwardRef<FormAddFormRef, OperationInfoAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const [searchModalState, setSearchModalState] = useState<string | null>(null)

    const form = useCommonForm<OperationInfoFormType>(
      ref,
      editData,
      onCanSubmitChange,
      permissionGroupSchema,
      {
        type: ROUTE_TYPE_OPTIONS[0].key,
        trainNum: '',
        routeId: '',
        routeNm: '',
        startStationId: '',
        startStationNm: '',
        endStationId: '',
        endStationNm: '',
        operationType: '',
        dayClassification: '',
        operationStation: '',
        startTm: '',
        endTm: ''
      }
    )

    return (
      <ModalAddFormLayout>
        <div style={{display: 'flex', flex: 1, gap: '3.6rem'}}>
          <div style={{flex: 1}}>
            {form.Field({
              name: 'type',
              children: (field) => (
                <FormFieldWrapper label={'구분'} required>
                  <FilterSelect
                    enabledAll={false}
                    options={SELECT_OPTIONS.ROUTE_TYPE_OPTIONS}
                    value={field.getValue()}
                    onChange={(value) => {
                      field.handleChange(value)
                    }}
                  />
                </FormFieldWrapper>
              ),
            })}
          </div>

          <div style={{flex: 1}}>
            {form.Field({
              name: 'trainNum',
              children: (field) => (
                <InputField height={'3.6rem'} placeholder={'열차번호'} required field={field} label={'열차번호'}/>
              ),
            })}
          </div>
        </div>

        {form.Field({
          name: 'routeNm',
          children: (field) => (
            <FormFieldWrapper required label={'노선명'}>
              <SearchModalTrigger
                placeholder={'노선명 검색'}
                value={''}
                onSelect={(v) => {
                }}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
                isOpen={field.name === searchModalState}
                onOpen={() => setSearchModalState(field.name)}
                onClose={() => setSearchModalState(null)}
              />
            </FormFieldWrapper>
          ),
        })}

        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: '3.6rem'
          }}
        >
          <div style={{flex: 1}}>
            {form.Field({
              name: 'startStationNm',
              children: (field) => (
                <FormFieldWrapper required label={'기점'}>
                  <SearchModalTrigger
                    placeholder={'기점 검색'}
                    value={''}
                    onSelect={(v) => {
                    }}
                    endPoint={'/'}
                    columns={withRowSelection(commonSearchColumns.route) as any}
                    isOpen={field.name === searchModalState}
                    onOpen={() => setSearchModalState(field.name)}
                    onClose={() => setSearchModalState(null)}
                  />
                </FormFieldWrapper>
              )
            })}

          </div>

          <div style={{flex: 1}}>
            {form.Field({
              name: 'endStationNm',
              children: (field) => (
                <FormFieldWrapper required label={'종점'}>
                  <SearchModalTrigger
                    placeholder={'종점 검색'}
                    value={''}
                    onSelect={(v) => {
                    }}
                    endPoint={'/'}
                    columns={withRowSelection(commonSearchColumns.route) as any}
                    isOpen={field.name === searchModalState}
                    onOpen={() => setSearchModalState(field.name)}
                    onClose={() => setSearchModalState(null)}
                  />
                </FormFieldWrapper>
              )
            })}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: '3.6rem'
          }}
        >
          <div style={{flex: 1}}>
            {form.Field({
              name: 'operationType',
              children: (field) => (
                <FormFieldWrapper label={'운행유형'} required>
                  <FilterSelect
                    enabledAll={false}
                    options={OPERATION_TYPE_OPTIONS}
                    value={''}
                    onChange={(value) => {
                    }}
                  />
                </FormFieldWrapper>
              )
            })}
          </div>
          <div style={{flex: 1}}>
            {form.Field({
              name: 'dayClassification',
              children: (field) => (
                <FormFieldWrapper label={'요일구분'} required>
                  <FilterSelect
                    enabledAll={false}
                    options={DAY_CLASSIFICATION_OPTIONS}
                    value={''}
                    onChange={(value) => {
                    }}
                  />
                </FormFieldWrapper>
              )
            })}
          </div>
        </div>

        {form.Field({
          name: 'operationStation',
          children: (field) => (
            <FormFieldWrapper required label={'운행구간 정거장'}>
              <SearchModalTrigger
                placeholder={'정거장 검색'}
                value={''}
                onSelect={(v) => {
                }}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
                isOpen={field.name === searchModalState}
                onOpen={() => setSearchModalState(field.name)}
                onClose={() => setSearchModalState(null)}
              />
            </FormFieldWrapper>
          ),
        })}

        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: '3.6rem'
          }}
        >
          <div style={{flex: 1}}>
            {form.Field({
              name: 'startTm',
              children: (field) => (
                <FormFieldWrapper required label={'정거장 (도착시각)'}>
                  <RcTimePicker
                    value={{hour: '10', minute: '30', second: '00', ampm: 'AM'}}
                    onChange={() => {
                    }}
                    useAmPm={true}
                  />
                </FormFieldWrapper>
              ),
            })}
          </div>
          <div style={{flex: 1}}>
            {form.Field({
              name: 'endTm',
              children: (field) => (
                <FormFieldWrapper required label={'정거장 (도착시간-출발시각)'}>
                  <RcTimePicker
                    value={{hour: '10', minute: '30', second: '00', ampm: 'AM'}}
                    onChange={() => {
                    }}
                    useAmPm={true}
                  />
                </FormFieldWrapper>
              ),
            })}
          </div>
        </div>
      </ModalAddFormLayout>
    )
  })

export default OperationInfoAddForm;

