'use client';
import {PageType} from "@/shared/enum/PageType";
import {ProgrammingInfoColumns} from "@/features/programming-info/columns/ProgramminInfoColumns";
import ListPage from "@/shared/components/listPage/ListPage";
import ProgrammingInfoAddForm from "@/features/programming-info/components/ProgrammingInfoAddForm/ProgrammingInfoAddForm";
import {useState} from "react";
import {programmingApi} from "@/features/programming-info/api/client/programmingApi";
import {format} from "date-fns";

export default function ProgrammingInfoView() {

  const [ initialFilter, setInitialFilter ] = useState({
    category: ['1','2','3','4'],
    type: '',
    range1: {
      startDate: new Date(),
      endDate: new Date()
    }
  })

  return (
    <ListPage
      pageType={PageType.ProgrammingInfo}
      filterSchemaKey={PageType.ProgrammingInfo}
      columns={ProgrammingInfoColumns}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={ async ({ sortKey, sortOrder, filter, page,size }) => {
        const newFilter = {
          ...filter,
          category: filter.category.toString(),
          startDate: format(filter.range1.startDate,'yyyy-MM-dd'),
          endDate: format(filter.range1.endDate,'yyyy-MM-dd'),
        }
        const params = {
          sort: sortKey,
          order: sortOrder,
          page,
          size,
          ...newFilter
        }
        return programmingApi.get(`/api/menus`, params);
      }}
      ModalBody={ProgrammingInfoAddForm}
      onSubmitEdit={ async (formData) => {
        console.log(formData)
        // await fetch()
        // toast.success('')
      }}
      onSubmitAdd={ async (formData) => {
        console.log(formData)
      }}
      onDelete={async (ids) => {
        console.log(ids);
        // await fetch()
      }}
    />
  )
}