import {useForm, useStore} from '@tanstack/react-form';
import {useEffect, useImperativeHandle, useState} from 'react';

export function useCommonForm<T extends object>(
  ref: any,
  editData: T | null,
  onCanSubmitChange?: (v: boolean) => void,
  schema?: any,
  initialValues?: Partial<T>
) {

  // @ts-ignore
  const form = useForm<T>({
    defaultValues: {
      ...(initialValues ?? {}),
    } as T,
    onSubmit: ({value}) => value,
    validateOnMount: true,
    validators: schema
      ? {
        onSubmit: schema,
        // onChange: schema,
      }
      : undefined,
  });

  const isValid = useStore(form.store, s => s.isValid);
  const isTouched = useStore(form.store, s => s.isTouched);

  const canSubmit = isValid && isTouched;
  // const canSubmit = useStore(form.store, (state) => state.canSubmit);

  const values = useStore(form.store, (state) => state.values)

  useImperativeHandle(ref, () => ({
    submit: async () => {

      if (!schema) return values;

      const result = schema.safeParse(values);
      console.log(result);
      if (!result.success) return null;

      return result.data;
    },
  }));

  useEffect(() => {
    onCanSubmitChange?.(canSubmit);
  }, [canSubmit, onCanSubmitChange]);

  useEffect(() => {
    if (editData) {
      form.reset(editData);
    }
  }, [editData]);

  return form;
}