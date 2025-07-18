import { useEffect, ComponentType } from 'react';
import { UseFormReturn, useStore } from '@tanstack/react-form';

export function withFormCanSubmitSync<P extends {
  form: UseFormReturn<any, any, any>;
  onCanSubmitChange?: (v: boolean) => void;
}>(WrappedComponent: ComponentType<P>) {

  return function WrappedWithSync(props: P) {

    console.log(props);

    const canSubmit = useStore(props.form.store, (state) => state.canSubmit ?? false);


    useEffect(() => {
      props.onCanSubmitChange?.(canSubmit);
    }, [canSubmit]);

    return <WrappedComponent {...props} />;
  };
}