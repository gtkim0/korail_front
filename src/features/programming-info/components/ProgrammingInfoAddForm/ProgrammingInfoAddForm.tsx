import {forwardRef, useEffect} from "react";
import {InputField} from "@/shared/components/Input/InputField";
import {FormAddFormRef} from "@/types/common";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import TransferList from "@/shared/components/transferList/TransferList/TransferList";
import TransferListHeaderTitle from "@/shared/components/transferList/TransferListHeader/TransferListHeader";
import TransferListWrapper from "@/shared/components/transferList/TransferListWrapper/TransferListWrapper";
import {trainColumns} from "@/shared/columns/trainColumns";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {ROUTE_TYPE_OPTIONS} from "@/shared/contants/selectOptions/routeTypeOptions";
import styles from './ProgrammingInfoAddForm.module.scss'
import {programmingInfoSchema} from "@/features/programming-info/schema/programmingInfoSchema";
import {
  ProgrammingInfoAddFormType,
} from "@/features/programming-info/columns/ProgramminInfoColumns";

interface Props {
  editData?: any;
  onCanSubmitChange?: () => void;
  routeInfo: any[];
}

const ProgrammingInfoAddForm =
  forwardRef<FormAddFormRef, Props>(({editData, onCanSubmitChange, routeInfo}, ref) => {

    const form = useCommonForm<ProgrammingInfoAddFormType>(
      ref,
      editData,
      onCanSubmitChange,
      programmingInfoSchema,
      {
        routeType: ROUTE_TYPE_OPTIONS[0].key,
        routeNum: '',
        orgNum: '',
        routeName: '',
        trainCnt: ''
      }
    )

    useEffect(() => {
      const findItem = routeInfo.find(i => i.key === form.getFieldValue('routeNum'));
      if (findItem) {
        form.setFieldValue('routeName', findItem.key);
      }
    }, [form.getFieldValue('routeNum')])

    return (
      <ModalAddFormLayout style={{padding: 0}}>
        <div className={styles.formWrapper}>
          <span className={styles.title}>
            편성 기본 정보
          </span>
          <div className={styles.gridWrapper}>
            {
              form.Field({
                name: 'routeType',
                children: (field) => (
                  <FormFieldWrapper
                    label={'구분'}
                  >
                    <FilterSelect
                      enabledAll={false}
                      options={ROUTE_TYPE_OPTIONS}
                      value={field.getValue()}
                      onChange={(v) => field.handleChange(v)}
                    />
                  </FormFieldWrapper>
                ),
              })
            }

            {
              form.Field({
                name: 'orgNum',
                children: (field) => (
                  <InputField
                    height={'3.6rem'}
                    name={field.name}
                    placeholder={'편성번호'}
                    required={true}
                    field={field}
                    label={'편성번호'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'trainCnt',
                children: (field) => (
                  <InputField
                    type={'number'}
                    height={'3.6rem'}
                    placeholder={'차량수'}
                    required={true}
                    field={field}
                    label={'차량수'}
                    name={field.name}
                  />
                ),
              })
            }

            {
              form.Field({
                name: 'routeName',
                children: (field) => (
                  <InputField
                    disabled
                    height={'3.6rem'}
                    name={field.name}
                    placeholder={'노선번호'}
                    required={true}
                    field={field}
                    label={'노선번호'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'routeNum',
                children: (field) => {

                  // const findItem = routeInfo.find(i => i.key === field.getValue());
                  //
                  // if (findItem) {
                  //   form.setFieldValue('routeName', findItem.key);
                  // }

                  return (
                    <FormFieldWrapper label={'노선명'}>
                      <FilterSelect
                        enabledAll={false}
                        options={routeInfo}
                        value={field.getValue()}
                        onChange={(v) => field.handleChange(v)}
                      />
                    </FormFieldWrapper>
                  )
                },
              })
            }
          </div>
        </div>

        <TransferListWrapper title={'차량 구성(차량 등록)'}>
          <TransferListHeaderTitle title={'차량 구성'}/>
          <TransferList<{ [key in typeof trainColumns[number]['key']]: string | boolean | unknown }>
            columns={trainColumns}
            initialItems={[]}
            selectedItems={[]}
          />
        </TransferListWrapper>
      </ModalAddFormLayout>
    )
  })

export default ProgrammingInfoAddForm;