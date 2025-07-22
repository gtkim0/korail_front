import {useForm, useStore} from '@tanstack/react-form';
import {useEffect, useImperativeHandle} from 'react';

export function useCommonForm<T extends object>(
  ref: any,
  editData: T | null,
  onCanSubmitChange?: (v: boolean) => void,
  schema?: any,
  initialValues?: Partial<T>
) {

  const form = useForm<T>({
    defaultValues: {
      ...(initialValues ?? {}),
    } as T,
    onSubmit: ({value}) => value,
    validators: schema
      ? {
        onSubmit: schema,
        onChange: schema,
      }
      : undefined,
  });

  const canSubmit = useStore(form.store, (state) => state.canSubmit);
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
  }, [canSubmit]);

  useEffect(() => {
    if (editData) {
      form.reset(editData);
    }
  }, [editData]);

  return form;
}