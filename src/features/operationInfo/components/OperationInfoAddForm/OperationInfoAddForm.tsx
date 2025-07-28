import {InputField} from "@/shared/components/Input/InputField";
import {useForm} from "@tanstack/react-form";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {commonSearchColumns} from "@/shared/contants/commonSearchColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import "react-datepicker/dist/react-datepicker.css";
import RcTimePicker from "@/shared/components/timePicker/TimePicker";

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
      console.log('제출된 데이터:', value);
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
                <InputField height={'3.6rem'} placeholder={'열차번호'} required field={field} label={'열차번호'} />
              ),
            })}
          </div>
        </div>

        {form.Field({
          name: 'name',
          children: (field) => (
            <FormFieldWrapper required label={'노선명'}>
              <SearchModalTrigger
                placeholder={'노선명 검색'}
                value={''}
                onSelect={(v) => {}}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
              />
            </FormFieldWrapper>
          ),
        })}

        <div
          style={{
            display:'flex',
            flex: 1,
            gap:'3.6rem'
          }}
        >
          <div style={{ flex: 1}}>
            <FormFieldWrapper required label={'기점'}>
              <SearchModalTrigger
                placeholder={'기점 검색'}
                value={''}
                onSelect={(v) => {}}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
              />
            </FormFieldWrapper>
          </div>

          <div style={{ flex: 1}}>
            <FormFieldWrapper required label={'종점'}>
              <SearchModalTrigger
                placeholder={'종점 검색'}
                value={''}
                onSelect={(v) => {}}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
              />
            </FormFieldWrapper>
          </div>
        </div>

        <div
          style={{
            display:'flex',
            flex: 1,
            gap:'3.6rem'
          }}
        >
          <div style={{ flex: 1}}>
            <FormFieldWrapper label={'운행유형'} required>
              <FilterSelect
                options={[{key: '1', label: 'A'}]}
                value={''}
                onChange={(value) => {}}
              />
            </FormFieldWrapper>
          </div>

          <div style={{ flex: 1}}>
            <FormFieldWrapper label={'요일구분'} required>
              <FilterSelect
                options={[{key: '1', label: 'A'}]}
                value={''}
                onChange={(value) => {}}
              />
            </FormFieldWrapper>
          </div>
        </div>

        {form.Field({
          name: 'name',
          children: (field) => (
            <FormFieldWrapper required label={'운행구간 정거장'}>
              <SearchModalTrigger
                placeholder={'정거장 검색'}
                value={''}
                onSelect={(v) => {}}
                endPoint={'/'}
                columns={withRowSelection(commonSearchColumns.route) as any}
              />
            </FormFieldWrapper>
          ),
        })}

        <div
          style={{
            display:'flex',
            flex: 1,
            gap:'3.6rem'
          }}
        >
          <div style={{flex:1}}>
            {form.Field({
              name: 'name',
              children: (field) => (
                <FormFieldWrapper required label={'정거장 (도착시간-출발시각'}>
                    <RcTimePicker
                      // label={'시간 선택'}
                      value={{ hour: '10', minute: '30', ampm: 'AM' }}
                      onChange={()=> {}}
                      useAmPm={true}
                    />
                </FormFieldWrapper>
              ),
            })}
          </div>
          <div style={{flex:1}}>
            {form.Field({
              name: 'name',
              children: (field) => (
                <FormFieldWrapper required label={'정거장 (도착시간-출발시각'}>
                  <RcTimePicker
                    // label={'시간 선택'}
                    value={{ hour: '10', minute: '30', ampm: 'AM' }}
                    onChange={()=> {}}
                    useAmPm={true}
                  />
                </FormFieldWrapper>
              ),
            })}
          </div>
        </div>
      </form>
    </div>
  )
}
