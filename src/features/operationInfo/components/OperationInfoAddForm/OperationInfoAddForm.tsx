import {InputField} from "@/shared/components/Input/InputField";
import {useForm} from "@tanstack/react-form";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {commonSearchColumns} from "@/shared/contants/commonSearchColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";

export default function OperationInfoAddForm() {

  const form = useForm({
    defaultValues: {
      name: '',
      image: '',
      url: '',
      startDate: '',
      endDate: '',
      useYn: ''
    },
    onSubmit: async ({value}) => {
      console.log('🟢 제출된 데이터:', value);
    },
  });

  return (
    <div style={{padding: '1.6rem'}}>
      <form style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '3.6rem'}}>
        <div style={{display: 'flex', flex: 1, gap:'3.6rem'}}>
          <div style={{flex: 1}}>
            {form.Field({
              name: 'name',
              children: (field) => (
                <FormFieldWrapper label={'구분'} required>
                  <FilterSelect
                    options={[
                      {key: '1', label: 'A'}
                    ]}
                    value={''}
                    onChange={(value) => {
                    }}
                  />
                </FormFieldWrapper>
              ),
            })}
          </div>

          <div style={{flex: 1}}>
            {form.Field({
              name: 'name',
              children: (field) => (
                <InputField placeholder={'열차번호'} required field={field} label={'열차번호'} />
              ),
            })}
          </div>
        </div>

        {form.Field({
          name: 'name',
          children: (field) => (
            <SearchModalTrigger
              placeholder={'노선명 검색'}
              value={''}
              onSelect={(v) => {}}
              endPoint={'/'}
              // columns={commonSearchColumns.route}
              columns={withRowSelection(commonSearchColumns.route) as any}
            />
          ),
        })}
      </form>
    </div>
  )
}