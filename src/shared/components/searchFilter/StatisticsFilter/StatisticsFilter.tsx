import {filterSchemas} from "@/shared/contants/filterSchemas";
import {DynamicFilterRenderer} from "@/shared/components/searchFilter/DynamicFilterRenderer/DynamicFilterRenderer";
import {PageType} from "@/shared/enum/PageType";

interface Props {
  value: any;
  onChange: (v: any) => void;
  onSubmit: any;
  onAdd: any;
  type: PageType;
  enabledAdd: any;
  CustomFilterSubRender?: any;
  customFilterSubProps?: any;
}

export default function StatisticsFilter({
                                           type,
                                           value,
                                           onChange,
                                           onSubmit,
                                           onAdd,
                                           enabledAdd,
                                           CustomFilterSubRender,
                                           customFilterSubProps
                                         }: Props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
      <DynamicFilterRenderer
        schema={filterSchemas[type]}
        value={value}
        onChange={onChange}
        modalEndPoint={'/'}
      />
      {CustomFilterSubRender?.(customFilterSubProps)}
    </div>
  )
}
