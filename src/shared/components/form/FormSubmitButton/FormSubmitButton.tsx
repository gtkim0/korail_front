'use client';

import { clsx } from 'clsx';
import styles from './FormSubmitButton.module.scss';

interface FormSubmitButtonProps {
  form: any;
  children: React.ReactNode;
  className?: string;
}

type FormFieldMeta = {
  errors?: { message: string }[];
};

type SubscribeSelectorState = {
  canSubmit: boolean;
  isTouched: boolean;
  fieldMeta: Record<string, FormFieldMeta>;
};

export default function FormSubmitButton({form, children, className}: FormSubmitButtonProps) {
  return (
    <form.Subscribe<SubscribeSelectorState>
      selector={(state: SubscribeSelectorState) => ({
        canSubmit: state.canSubmit,
        isTouched: state.isTouched,
        fieldMeta: state.fieldMeta,
      })}
    >
      {({ canSubmit, isTouched, fieldMeta }: any) => {
        const hasErrors = Object.values(fieldMeta).some((meta: any) =>
          meta.errors?.length && meta.errors.length > 0
        );

        const enabled = isTouched && canSubmit && !hasErrors;

        return (
          <button
            type="submit"
            className={clsx(
              styles.submitButton,
              enabled ? styles.btnActive : styles.inactive,
              className
            )}
            disabled={!enabled}
          >
            {children}
          </button>
        );
      }}
    </form.Subscribe>
  );
}