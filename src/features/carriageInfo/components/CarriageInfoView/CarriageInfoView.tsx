'use client';
import {
  CarriageInfoColumns,
} from "@/features/carriageInfo/columns/CarriageInfoColumns";
import {PageType} from "@/shared/enum/PageType";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {CarriageInfoColumnsType} from "@/types/carriage-info";
import CarriageInfoAddForm from "@/features/carriageInfo/components/CarriageInfoAddForm/CarriageInfoAddForm";

export interface CarriageInfoAddFormProps extends BaseModalFormProps<CarriageInfoColumnsType> {
}

export default function CarriageInfoView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<CarriageInfoColumnsType, CarriageInfoAddFormProps>
      pageType={PageType.CarriageInfo}
      filterSchemaKey={PageType.CarriageInfo}
      columns={withRowSelection(CarriageInfoColumns)}
      initialFilter={initialFilter}
      initialData={initialData}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={CarriageInfoAddForm}
      modalBodyProps={{}}
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