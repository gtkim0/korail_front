'use client'
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {menuColumns} from "@/features/menu/columns/menuColumns";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import MenuEditArea from "@/features/menu/MenuEditArea/MenuEditArea";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {withRowSelection} from "@/shared/components/table/withRowSelection";

export interface MenuAddFormProps extends BaseModalFormProps<any> {
}

export default function MenuView({initialFilter, initialData}: PageServerProps) {

  const api = useClientApi();

  return (
    <ListPage<any, MenuAddFormProps, any>
      pageType={PageType.Menu}
      filterSchemaKey={PageType.Menu}
      columns={withRowSelection(menuColumns)}
      initialSortKey={'id'}
      fetchData={async () => {
        const res = await api.get('/api/menus/get-list')
        console.log(res);
        return []
      }}
      initialFilter={initialFilter}
      initialData={initialData}
      ModalBody={MenuEditArea}
      modalBodyProps={{}}
      onSubmitEdit={async (value) => {
        console.log(value);
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