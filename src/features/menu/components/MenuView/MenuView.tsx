'use client'
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {menuColumns} from "@/features/menu/columns/menuColumns";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import MenuEditArea from "@/features/menu/MenuEditArea/MenuEditArea";

export interface MenuAddFormProps extends BaseModalFormProps<any> {
}

export default function MenuView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<any, MenuAddFormProps, any>
      pageType={PageType.Menu}
      filterSchemaKey={PageType.Menu}
      columns={menuColumns}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      initialFilter={initialFilter}
      initialData={initialData}
      ModalBody={MenuEditArea}
      modalBodyProps={{}}
      onSubmitEdit={async () => {
        return true;
      }}
      onSubmitAdd={async (value) => {
        console.log(value);
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
    />
  )
}