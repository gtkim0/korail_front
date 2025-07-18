import { useEffect } from 'react';
import { UseFormReturn } from '@tanstack/react-form';

export function useSyncCanSubmit(
  form: UseFormReturn<any, any, any>,
  onCanSubmitChange: (v: boolean) => void
) {
  useEffect(() => {
    const unsub = form.subscribe(
      (state) => {
        onCanSubmitChange(state.canSubmit ?? false);
      },
      { selector: (state) => state.canSubmit }
    );
    return () => unsub();
  }, [form, onCanSubmitChange]);
}