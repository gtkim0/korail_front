import {useForm} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";

type Props = {
  selectedItem: {
    stepName: '',
    max: '',
    color: '',
    alarm: '',
    guide: '',
    message: ''
  }
}

export default function CongestionAddForm({selectedItem}: Props) {

  const form = useForm({
    defaultValues: {
      stepName: selectedItem?.stepName || '',
      max: selectedItem?.max || '',
      color: selectedItem?.color || '',
      alarm: selectedItem?.alarm || '',
      guide: selectedItem?.guide || '',
      message: selectedItem?.message || '',
    },
    onSubmit: async ({value}) => {
      // 결국 여기서는 api 콜이네.
    },
  });

  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.6rem'
      }}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {form.Field({
        name: 'stepName',
        children: (field) => (
          <InputField placeholder={'단계명을 입력해주세요.'} required={true} field={field} label={'단계명'}/>
        ),
      })}
      {form.Field({
        name: 'max',
        children: (field) => (
          <InputField placeholder={'숫자로 입력해주세요.'} required={true} field={field} label={'임계치'}/>
        ),
      })}
      {form.Field({
        name: 'color',
        children: (field) => (
          <FormFieldWrapper
            label={'색상'}
          >
            <ColorPicker color={'#FF0000'} onChangeAction={()=> {}}/>
          </FormFieldWrapper>
        ),
      })}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        {form.Field({
          name: 'color',
          children: (field) => (
            // <InputField placeholder={'FF0000'} required={true} field={field} label={'색상'} />
            <FormFieldWrapper
              label={'알림발생'}
              required={true}
            >
              <ToggleSwitch label={'off'} checked={true} onChange={() => {
              }}/>
            </FormFieldWrapper>
          ),
        })}
        {form.Field({
          name: 'color',
          children: (field) => (
            // <InputField placeholder={'FF0000'} required={true} field={field} label={'색상'} />
            <FormFieldWrapper
              label={'안내방송'}
              required={true}
            >
              <ToggleSwitch label={'off'} checked={true} onChange={() => {
              }}/>
            </FormFieldWrapper>
          ),
        })}
        {form.Field({
          name: 'color',
          children: (field) => (
            // <InputField placeholder={'FF0000'} required={true} field={field} label={'색상'} />
            <FormFieldWrapper
              label={'문자전송'}
              required={true}
            >
              <ToggleSwitch label={'off'} checked={true} onChange={() => {
              }}/>
            </FormFieldWrapper>
          ),
        })}
      </div>
    </form>
  )
}