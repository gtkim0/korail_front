import {ComponentType, ReactNode} from "react";
import {filterSchemas} from "@/shared/contants/filterSchemas";
import {DynamicFilterRenderer} from "@/shared/components/searchFilter/DynamicFilterRenderer/DynamicFilterRenderer";
import {PageType} from "@/shared/enum/PageType";
import {FilterProps} from "@/shared/components/listPage/ListPage";

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


// <div
//   style={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '1.2rem',
//     alignSelf: 'stretch'
//   }}
// >
//   <div
//     style={{
//       display: 'flex',
//       padding: '1.6rem',
//       alignItems: 'center',
//       gap: '3.6rem',
//       alignSelf: 'stretch',
//       borderTop: '1px solid #d5d5d6',
//       background: '#f1f1f2'
//     }}
//   >
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '3.6rem',
//         flex: 1
//       }}
//     >
//       <DynamicFilterRenderer
//         schema={filterSchemas[type]}
//         value={value}
//         onChange={onChange}
//         modalEndPoint={'/'}
//       />
//     </div>
//   </div>
//   {
//     render
//   }
// </div>