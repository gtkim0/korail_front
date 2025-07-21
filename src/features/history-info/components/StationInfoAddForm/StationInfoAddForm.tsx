'use client'
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import {useForm, useStore} from "@tanstack/react-form";
import { z } from "zod";
import { InputField } from "@/shared/components/Input/InputField";
import {StationInfoAddFormProps} from "@/features/history-info/components/StationInfoView/StationInfoView";
import {FormAddFormRef} from "@/types/common";

const ResetSchema = z.object({
  title: z.string().min(3, '비밀번호는 최소 10자리여야 합니다.'),
  content: z.string().min(3, '비밀번호는 최소 10자리여야 합니다.'),
  userId: z.string().min(3, '비밀번호는 최소 10자리여야 합니다.'),
  status: z.string().min(3, '비밀번호는 최소 10자리여야 합니다.'),
  image_url: z.string().min(3, '비밀번호는 최소 10자리여야 합니다.'),
});

const StationInfoAddForm = forwardRef<FormAddFormRef, StationInfoAddFormProps>(({ editData, onCanSubmitChange }, ref) => {

  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      userId: '',
      status: '',
      image_url: '',
    },
    onSubmit: async ({ value }) => {
      return value;
    },
    validators: {
      onSubmit: ResetSchema,
      onChange: ResetSchema,
    }
  });

  const canSubmit = useStore(form.store, (state)=> state.canSubmit);

  useImperativeHandle(ref, () => ({
    submit: async () => {

      const title = form.getFieldValue('title');
      const content = form.getFieldValue('content');
      const userId = form.getFieldValue('userId');
      const status = form.getFieldValue('status');
      const image_url = form.getFieldValue('image_url');
      const result = ResetSchema.safeParse({title, content, userId, status, image_url});
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
      <div style={{ display: 'flex', gap: '3.6rem' }}>
        <div style={{ flex: 1 }}>
          {form.Field({
            name: 'title',
            children: (field) => (
              <InputField placeholder="제목" required field={field} label="제목" />
            )
          })}
        </div>
        <div style={{ flex: 1 }}>
          {form.Field({
            name: 'content',
            children: (field) => (
              <InputField placeholder="내용" required field={field} label="내용" />
            )
          })}
        </div>
      </div>

      {form.Field({
        name: 'userId',
        children: (field) => (
          <InputField placeholder="유저아이디" required field={field} label="유저아이디" />
        )
      })}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem' }}>
        {form.Field({
          name: 'status',
          children: (field) => (
            <InputField placeholder="상태" required field={field} label="상태" />
          )
        })}
      </div>

      {form.Field({
        name: 'image_url',
        children: (field) => (
          <InputField placeholder="이미지명" required field={field} label="이미지명" />
        )
      })}
    </form>
  );
});

export default StationInfoAddForm;