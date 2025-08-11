import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {BatchCycleAddFormProps} from "@/features/batch-cycle/components/BatchCycleView/BatchCycleView";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import styles from './BatchCycleAddForm.module.scss'
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import RcTimePicker from "@/shared/components/timePicker/TimePicker";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {batchCycleSchema} from "@/features/batch-cycle/schema/BatchCycleSchema";

export type BatchCycleFormType = {
  tableName: string;
  desc: string;
  type: string;
  cycleVal: string;
  cycleUnit: string;
  recount: string;
  time: string,
  repeatType: string;
  spaceMinute: string;
}

const BatchCycleAddForm =
  forwardRef<FormAddFormRef, BatchCycleAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<BatchCycleFormType>(
      ref,
      editData,
      onCanSubmitChange,
      batchCycleSchema,
      {
        tableName: '',
        desc: '',
        type: '1',
        cycleVal: '',
        cycleUnit: '',
        recount: '',
        time: '',
        repeatType: '1',
        spaceMinute: ''
      }
    )

    return (
      <ModalAddFormLayout>
        {form.Field({
          name: 'tableName',
          children: (field) => (
            <InputField placeholder="테이블 명." required field={field} label="테이블명" height="3.6rem"/>
          ),
        })}

        {form.Field({
          name: 'desc',
          children: (field) => (
            <InputField placeholder="설명" required field={field} label="설명" height="3.6rem"/>
          ),
        })}

        {form.Field({
          name: 'type',
          children: (field) => {
            const selectedType = field.state.value;
            return (
              <>
                <FormFieldWrapper required label="방식">
                  <FilterRadioGroup
                    name={field.name}
                    selected={selectedType}
                    options={[
                      {key: '1', label: '일정간격'},
                      {key: '2', label: '특정시간'}
                    ]}
                    onChange={field.handleChange}
                  />
                </FormFieldWrapper>

                {selectedType === '1' ? (
                  <div className={styles.flexCol}>
                    <div className={styles.flexRow}>
                      <div className={styles.flexItem}>
                        {form.Field({
                          name: 'cycleVal',
                          children: (field) => (
                            <InputField placeholder="숫자 입력" required field={field} label="주기" height="3.6rem"/>
                          ),
                        })}
                      </div>
                      <div className={styles.flexItem}>
                        {form.Field({
                          name: 'cycleUnit',
                          children: (field) => (
                            <FormFieldWrapper label="구분" required>
                              <FilterSelect
                                options={[{key: '1', label: 'A'}]}
                                value={field.state.value}
                                onChange={field.handleChange}
                              />
                            </FormFieldWrapper>
                          ),
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.flexCol}>
                    {form.Field({
                      name: 'time',
                      children: (field) => (
                        <FormFieldWrapper label="시간선택">
                          <RcTimePicker
                            value={{hour: '10', minute: '30', second: '00', ampm: 'AM'}}
                            onChange={() => {
                            }}
                            useAmPm
                          />
                        </FormFieldWrapper>
                      )
                    })}

                    {form.Field({
                      name: 'repeatType',
                      children: (field) => {
                        const selectedRepeat = field.state.value;
                        return (
                          <div className={styles.flexCol}>
                            <FormFieldWrapper required label="반복">
                              <FilterRadioGroup
                                name={field.name}
                                selected={selectedRepeat}
                                options={[
                                  {key: '1', label: '매일'},
                                  {key: '2', label: '매주'}
                                ]}
                                onChange={field.handleChange}
                              />
                            </FormFieldWrapper>
                            {selectedRepeat === '2' && (
                              <div className={styles.weeklyBox}>
                                <div className={styles.weeklyRow}>
                                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                                    <div key={day} className={styles.weeklyItem}>
                                      <input type="checkbox"/>
                                      <label>{day}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                )}

                <div className={styles.flexRow}>
                  <div className={styles.flexItem}>
                    {form.Field({
                      name: 'recount',
                      children: (field) => (
                        <InputField placeholder="숫자 입력" required field={field} label="재시도 횟수" height="3.6rem"/>
                      ),
                    })}
                  </div>
                  <div className={styles.flexItem}>
                    {form.Field({
                      name: 'spaceMinute',
                      children: (field) => (
                        <InputField placeholder="숫자 입력" required field={field} label="간격(분)" height="3.6rem"/>
                      ),
                    })}
                  </div>
                </div>
              </>
            );
          }
        })}
      </ModalAddFormLayout>
    )
  })

export default BatchCycleAddForm;