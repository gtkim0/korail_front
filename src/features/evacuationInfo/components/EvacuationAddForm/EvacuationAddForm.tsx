import {z} from "zod";
import {forwardRef, useEffect, useImperativeHandle} from "react";
import {useForm, useStore} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import DropDown from "@/shared/components/dropDown/DropDown";
import {EvacuationInfoAddFormProps} from "@/features/evacuationInfo/components/EvacuationInfoView/EvacuationInfoView";

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

const EvacuationAddForm = forwardRef<EvacuationAddFormRef, EvacuationInfoAddFormProps>((
  {
    editData,
    onCanSubmitChange
  }, ref
) => {

  const form = useForm({
    defaultValues: {
      routeName: '',
      stationNum: '',
      stationName: '',
      guideMap: '',
      manual: '',
    },
    onSubmit: async ({value}) => {
      return value;
    },
    validators: {
      onSubmit: ResetSchema,
      onChange: ResetSchema,
    }
  });

  const canSubmit = useStore(form.store, (state) => state.canSubmit);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const routeName = form.getFieldValue('routeName');
      const stationNum = form.getFieldValue('stationNum');
      const stationName = form.getFieldValue('stationName');
      const guideMap = form.getFieldValue('guideMap');
      const manual = form.getFieldValue('manual');
      const result = ResetSchema.safeParse({routeName, stationNum, stationName, guideMap, manual});
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
      {form.Field({
        name: 'routeName',
        children: (field) => (
          <FormFieldWrapper label={'노선명'}>
            <SearchModalTrigger
              height={'4.4rem'}
              value={''}
              onSelect={() => {}}
              endPoint={''}
              columns={[]}
              isOpen={false}
              onOpen={() => {}}
              onClose={() => {}}
            />
          </FormFieldWrapper>
        )
      })}
      {form.Field({
        name: 'stationNum',
        children: (field) => (
          <InputField placeholder="역사번호" required field={field} label="역사번호"/>
        )
      })}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
        {form.Field({
          name: 'stationName',
          children: (field) => (
            <InputField placeholder="역사명" required field={field} label="역사명"/>
          )
        })}
        {form.Field({
          name: 'guideMap',
          children: (field) => (
            <FormFieldWrapper label={'대피안내도'}>
              <SearchModalTrigger
                height={'4.4rem'}
                value={''}
                onSelect={() => {}}
                endPoint={''}
                columns={[]}
                isOpen={false}
                onOpen={() => {}}
                onClose={() => {}}
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
                height: '4.4rem'
              }}
            >
              <DropDown
                options={[{key: '1', label: '1'}]}
                onSelect={() => {}}
              />
            </div>
          </FormFieldWrapper>
        )
      })}
    </form>
  )
})

export default EvacuationAddForm;