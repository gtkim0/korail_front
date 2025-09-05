import {useForm, useStore} from '@tanstack/react-form';
import {useEffect, useImperativeHandle, useState} from 'react';

export function useCommonForm<T extends object>(
  ref: any,
  editData?: T | null,
  onCanSubmitChange?: (v: boolean) => void,
  schema?: any,
  initialValues?: Partial<T>
) {
  // @ts-ignore
  const form = useForm<T>({
    defaultValues: {
      ...(initialValues ?? {}),
      ...(editData ?? {} as T),
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

  // const canSubmit = isValid && isTouched;

  const canSubmit = useStore(form.store, s => s.canSubmit)

  // const canSubmit = useStore(form.store, (state) => state.canSubmit);

  const values = useStore(form.store, (state) => state.values)

  useImperativeHandle(ref, () => ({
    submit: async () => {

      if (!schema) return values;

      const result = schema.safeParse(values);
      if (!result.success) return null;

      return result.data;
    },
  }));

  useEffect(() => {
    if (onCanSubmitChange && typeof onCanSubmitChange === 'function')
      onCanSubmitChange?.(canSubmit);
  }, [canSubmit, onCanSubmitChange]);

  useEffect(() => {
    if (editData) {
      const next = typeof structuredClone === 'function'
        ? structuredClone(editData)
        : JSON.parse(JSON.stringify(editData));
      form.reset(next);
    }
  }, [editData]);

  return form;
}