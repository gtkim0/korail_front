'use client'
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import {StationInfoAddFormProps} from "@/features/history-info/components/StationInfoView/StationInfoView";

export type HistoryInfoAddFormRef = {
  submit: () => Promise<any>;
};

const ResetSchema = z.object({
  stationNum: z.string(),
  stationName: z.string(),
  routeNumber: z.string(),
  routeName: z.string(),
  stationTransfer: z.string(),
  transferRouteNumber: z.string(),
  transferRouteName: z.string(),
});

const StationInfoAddForm = forwardRef<HistoryInfoAddFormRef, StationInfoAddFormProps>(({ editData, onCanSubmitChange }, ref) => {
  const form = useForm({
    defaultValues: {
      stationNum: '',
      stationName: '',
      routeNumber: '',
      routeName: '',
      stationTransfer: '',
      transferRouteNumber: '',
      transferRouteName: ''
    },
    onSubmit: async ({ value }) => {
      console.log('제출된 데이터:', value);
      return value;
    },
    validators: {
      onSubmit: ResetSchema,
      onChange: ResetSchema,
    }
  });

  // 외부에서 submit() 호출할 수 있도록
  useImperativeHandle(ref, () => ({
    submit: () => form.handleSubmit(),
  }));

  // editData 있으면 초기값 세팅
  useEffect(() => {
    if (editData) {
      form.reset(editData);
    }
  }, []);

  return (
    <form style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '3.6rem',
      padding: '1.6rem'
    }}>
      <div style={{ display: 'flex', gap: '3.6rem' }}>
        <div style={{ flex: 1 }}>
          {form.Field({
            name: 'stationNum',
            children: (field) => (
              <InputField placeholder="역번호" required field={field} label="역번호" />
            )
          })}
        </div>
        <div style={{ flex: 1 }}>
          {form.Field({
            name: 'stationName',
            children: (field) => (
              <InputField placeholder="역사명" required field={field} label="역사명" />
            )
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem' }}>
        {form.Field({
          name: 'routeName',
          children: (field) => (
            <InputField placeholder="노선명" required field={field} label="노선명" />
          )
        })}
      </div>

      {form.Field({
        name: 'stationTransfer',
        children: (field) => (
          <FormFieldWrapper label="환승번호" required>
            <FilterRadioGroup
              name=""
              options={[
                { key: '1', label: '일반역' },
                { key: '2', label: '환승역' }
              ]}
              selected={field.state.value}
              onChange={(val) => field.handleChange(val)}
            />
          </FormFieldWrapper>
        )
      })}
    </form>
  );
});

export default StationInfoAddForm;