'use client';
import {PageType} from "@/shared/enum/PageType";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {clientDelete, clientPost} from "@/shared/api/clientFetcher";
import ListPage from "@/shared/components/listPage/ListPage";
import {evacuationInfoColumns, EvacuationInfoColumnsType} from "@/features/evacuationInfo/columns/evacuationInfoColumn";
import {BaseModalFormProps} from "@/types/common";
import {evacuationApi} from "@/features/evacuationInfo/api/evacuationApi";
import EvacuationAddForm from "@/features/evacuationInfo/components/EvacuationAddForm/EvacuationAddForm";
import useModal from "@/shared/hooks/useModal";
import { Document, Page, pdfjs } from 'react-pdf';
import {useState} from "react";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

export interface EvacuationInfoAddFormProps extends BaseModalFormProps<Omit<EvacuationInfoColumnsType, 'id'>> {
  // optional: readonly?: boolean;
}

interface Props {
  initialFilter: Record<string, any>;
  initialData: EvacuationInfoColumnsType[];
  initialSortKey?: string;
}

export default function EvacuationInfoView({initialFilter, initialData}: Props) {

  const {isOpen, open, close} = useModal();

  const [numPages, setNumPages] = useState<number>();
  const onDocumentLoadSuccess = ({numPages}: { numPages: number}) => {
    setNumPages(numPages)
  }

  return (
    <>
      <ListPage<EvacuationInfoColumnsType, EvacuationInfoAddFormProps>
        pageType={PageType.EvacuationInfo}
        filterSchemaKey={PageType.EvacuationInfo}
        columns={withRowSelection(evacuationInfoColumns)}
        initialFilter={initialFilter}
        initialSortKey={'id'}
        fetchData={async ({sortKey, sortOrder, filter, page, size}) => {
          const params = {
            sort: sortKey,
            order: sortOrder,
            page,
            size,
            ...filter,
          };
          const res = await evacuationApi.list(params);
          return Array.isArray(res) ? res : [];
        }}

        ModalBody={EvacuationAddForm}
        modalBodyProps={{}}
        onSubmitEdit={async (formData: Partial<EvacuationInfoColumnsType>) => {
          const res = await evacuationApi.put(formData);
          // if(res) return true;
          return true;
        }}
        onSubmitAdd={async (formData) => {
          const res = await clientPost('/apis/board', formData);
          return true;
        }}
        onDelete={async (ids) => {
          const res = await clientDelete(ids);
          // await fetch()
        }}
        initialData={initialData}
      />
      {/*<BaseModal maxWidth={'xl'} isOpen={true} onCloseAction={close}>*/}
      {/*  <div style={{height:'80vh', overflowY:'auto'}}>*/}
      {/*  <Document file={'/test.pdf'} onLoadSuccess={onDocumentLoadSuccess}>*/}
      {/*    {Array.from(new Array(numPages), (_, index) => (*/}
      {/*      <Page key={index + 1} pageNumber={index + 1} />*/}
      {/*    ))}*/}
      {/*  </Document>*/}
      {/*  </div>*/}
      {/*</BaseModal>*/}
    </>
  )
}