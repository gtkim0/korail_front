import {forwardRef, useImperativeHandle} from "react";
import {useForm} from "@tanstack/react-form";
import styles from './RouteMapAddForm.module.scss'
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {InputField} from "@/shared/components/Input/InputField";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";
import {FileInput} from "@/shared/components/fileInput/FileInput";
import RouteAddArea from "@/features/routeMap/components/RouteAddArea/RouteAddArea";

export type RouteMapAddFormRef = {
  submit: () => void;
}

export const RouteMapAddForm = forwardRef<RouteMapAddFormRef>((_, ref) => {

  const form = useForm({
    defaultValues: {
      lineNumber: '',
      lineName: '',
      lineColor: '',
      icon: '',
      startingPoint: '',
      openingDate: ''
    },
    onSubmit: async ({value}) => {
      console.log('🟢 제출된 데이터:', value);
    },
  });


  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(); // 또는 form.submit()
    },
  }));

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form>
        <div className={styles.basicArea}>
        <span className={styles.title}>
          노선 기본 정보
        </span>
          <div className={styles.formArea}>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'lineNumber',
                    children: (field) => (
                      <InputField type={'number'} placeholder={'숫자로 입력해주세요.'} required={true} field={field} label={'노선번호'}/>
                    ),
                  })
                }
              </div>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'lineName',
                    children: (field) => (
                      <InputField placeholder={'숫자로 입력해주세요.'} required={true} field={field} label={'노선명'}/>
                    ),
                  })
                }
              </div>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'lineColor',
                    children: (field) => (
                      <FormFieldWrapper required label={'색상'}>
                        <ColorPicker color={'#FF0000'} onChangeAction={() => {
                        }}/>
                      </FormFieldWrapper>
                    ),
                  })
                }
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'icon',
                    children: (field) => (
                      <FormFieldWrapper label={'아이콘'} required>
                        <FileInput placeHolder={'아이콘'} value={''} onChange={() => {
                        }}/>
                        <span className={styles.iconHelp}>형식: SVG (권장), PNG (최대 5mb 이하)</span>
                      </FormFieldWrapper>
                    ),
                  })
                }
              </div>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'startingPoint',
                    children: (field) => (
                      <InputField placeholder={'기점'} required={true} field={field} label={'기점'}/>
                    ),
                  })
                }
              </div>
              <div className={styles.formCol}>
                {
                  form.Field({
                    name: 'openingDate',
                    children: (field) => (
                      <InputField placeholder={'개통일자'} required={true} field={field} label={'개통일자'}/>
                    ),
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </form>

      <RouteAddArea />
    </div>
  )
})