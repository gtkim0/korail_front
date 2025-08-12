interface Props {
  data: { [key: string]: { header: string, data: any } }[]
}

// example
// [
//   {
//     data1: {
//       header: '',
//       data: ''
//     },
//     data2: {
//       header: '',
//       data: ''
//     }
//   }
// ]

export function generateColumn({data}: Props) {

  if (!data || data.length === 0) return [];

  return Object.entries(data[0]).map(([key, val]) => {
    return {
      accessorKey: key,
      header: val.header
    }
  })
}