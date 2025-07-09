import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/features/menu/columns/menuColumns";

export type CongestionStep = {
  code: string;
  step: string;
  max: string;
  color: string;
  alarm: string;
  guide: string;
  message: string;
  date: string;
}

export const dummyCongestionData = [
  {
    code: 'C00',
    step: '1',
    max: '255',
    color: '#4ce537',
    alarm: '무',
    guide: '유',
    message: '무',
    date: '2025-06-25'
  },
  {
    code: 'C00',
    step: '1',
    max: '255',
    color: '#ecf307',
    alarm: '무',
    guide: '유',
    message: '무',
    date: '2025-06-25'
  },
  {
    code: 'C00',
    step: '1',
    max: '255',
    color: '#f307c5',
    alarm: '무',
    guide: '유',
    message: '무',
    date: '2025-06-25'
  }
]

export const congestionStepColumns: ColumnDef<CongestionStep>[] = [
  {
    accessorKey: 'code',
    header: '번호(코드)',
  },
  {
    accessorKey: 'step',
    header: '단계명',
  },
  {
    accessorKey: 'max',
    header: '임계치',
  },
  {
    accessorKey: 'color',
    header: '색상',
    cell: info => {
      const value = info.getValue<boolean>();
      console.log(value);
      return (
        <div style={{display:'flex',gap:'.6rem', alignItems:'center'}}>
          <span style={{background:`${value}`, width:'2rem',height:'2rem', display:'inline-flex', borderRadius:'4px'}}>&nbsp;</span>
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: 'alarm',
    header: '알람발생',
  },
  {
    accessorKey: 'guide',
    header: '안내방송',
  },
  {
    accessorKey: 'message',
    header: '문자전송',
  },
  {
    accessorKey: 'date',
    header: '데이터기준일자',
  },
];