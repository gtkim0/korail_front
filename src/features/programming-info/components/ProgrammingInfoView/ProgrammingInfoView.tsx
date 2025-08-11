'use client';
import {
  ProgrammingInfoColumns,
  ProgrammingInfoColumnsType
} from "@/features/programming-info/columns/ProgramminInfoColumns";
import ListPage from "@/shared/components/listPage/ListPage";
import {programmingApi} from "@/features/programming-info/api/client/programmingApi";
import {format} from "date-fns";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {PageType} from "@/shared/enum/PageType";
import ProgrammingInfoAddForm
  from "@/features/programming-info/components/ProgrammingInfoAddForm/ProgrammingInfoAddForm";
import {withRowSelection} from "@/shared/components/table/withRowSelection";

export interface ProgrammingInfoAddFormProps extends BaseModalFormProps<ProgrammingInfoColumnsType> {
  routeInfo: any[];
}

interface Props extends PageServerProps {
  routeInfo: any[]
}

export default function ProgrammingInfoView({initialFilter, initialData, routeInfo}: Props) {
  return (
    <ListPage<ProgrammingInfoColumnsType, ProgrammingInfoAddFormProps, Record<string, any>>
      modalMaxWidth={'lg'}
      pageType={PageType.ProgrammingInfo}
      filterSchemaKey={PageType.ProgrammingInfo}
      columns={withRowSelection(ProgrammingInfoColumns)}
      initialFilter={initialFilter}
      initialData={initialData}
      initialSortKey={'id'}
      fetchData={async ({sortKey, sortOrder, filter, page, size}) => {
        const newFilter = {
          ...filter,
          category: filter.category.toString(),
          startDate: format(filter.range1.startDate, 'yyyy-MM-dd'),
          endDate: format(filter.range1.endDate, 'yyyy-MM-dd'),
        }
        const params = {
          sort: sortKey,
          order: sortOrder,
          page,
          size,
          ...newFilter
        }
        const res = await programmingApi.get('/api/menus', params);
        return Array.isArray(res) ? res : []
      }}
      ModalBody={ProgrammingInfoAddForm}
      modalBodyProps={{
        routeInfo
      }}
      onSubmitEdit={async (formData) => {
        // await fetch()
        // toast.success('')
        return true;
      }}
      onSubmitAdd={async (formData) => {
        return true;
      }}
      onDelete={async (ids) => {
        // await fetch()
      }}
    />
  )
}