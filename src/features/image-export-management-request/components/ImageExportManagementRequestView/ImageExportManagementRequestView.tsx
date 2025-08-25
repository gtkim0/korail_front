'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {managementRequestColumns} from "@/features/image-export-management-request/columns/managementRequestColumns";
import {PageServerProps} from "@/types/common";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import ImageExportManagementRequestAddForm
  from "@/features/image-export-management-request/components/ImageExportManagementRequestAddForm/ImageExportManagementRequestAddForm";
import styles from './ImageExportManagementRequestView.module.scss'
import {useState} from "react";
import {toast} from "react-hot-toast";

export default function ImageExportManagementRequestView({initialFilter, initialData}: PageServerProps) {

  const [selectInfo, setSelectInfo] = useState(['asd', 'bb', 'cc'])

  return (
    <ListPage<any, any, any>
      toolbarRight={({open, item}) => {
        const handleClick = () => {
          if (!item) {
            toast.error('반출할 항목을 선택해주세요.')
            return;
          }
          setSelectInfo(item);
          open();
        }
        return (
          <button
            className={styles.exportBtn}
            onClick={handleClick}
          >
            반출요청
          </button>
        )
      }}
      pkColumn={''}
      pageType={PageType.ImageExportManagementRequest}
      filterSchemaKey={PageType.ImageExportManagementRequest}
      columns={withRowSelection(managementRequestColumns)}
      initialFilter={initialFilter}
      initialSortKey={''}
      initialData={initialData}
      ModalBody={ImageExportManagementRequestAddForm}
      modalBodyProps={{
        selectInfo
      }}
      fetchData={() => {
        return []
      }}
    />
  )
}