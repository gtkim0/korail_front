import {forwardRef} from "react";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {
  paymentColumns
} from "@/features/image-export-management-request/columns/managementRequestColumns";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {permissionGroupSchema} from "@/features/permission-group/schema/permissionGroupSchema";
import {
  PermissionGroupFormType
} from "@/features/permission-group/components/PermissionGroupAddForm/PermissionGroupAddForm";
import CustomPagination from "@/shared/components/table/CustomPagination";
import Divider from "@/shared/components/Divider";
import {InputField} from "@/shared/components/Input/InputField";
import styles from './ImageExportManagementRequestAddForm.module.scss';
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {useTableSelection} from "@/shared/hooks/useTableSelection";

const ImageExportManagementRequestAddForm =
  forwardRef(({selectInfo}, ref) => {

    const {rowSelection, onRowSelectionChange} = useTableSelection<T>([], ids => {
      // const delCheckItem = ids.map((i) => dataSource?.list[Number(i)][pkColumn])
      // setDelItems(delCheckItem)
    });

    const form = useCommonForm<PermissionGroupFormType>(
      ref,
      permissionGroupSchema,
      {}
    )

    console.log(selectInfo);

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.payment}>
            <span>
              결제자 지정
            </span>
            <div className={styles.payment_table_wrapper}>
              <div className={styles.button_wrapper}>
                <button className={styles.delete}>결제자 삭제</button>
                <button className={styles.add}>결제자 추가</button>
              </div>
              <div>
                <Table
                  maxWidth={'52rem'}
                  minWidth={0}
                  rowSelection={rowSelection}
                  // columns={withRowSelection(paymentColumns)}
                  columns={withRowSelection(paymentColumns)}
                  data={[
                    {
                      order: '1',
                      1: 'as'
                    }
                  ]}
                />
              </div>
            </div>
          </div>


          <div
            style={{
              display: 'flex',
              padding: '1.6rem',
              flexDirection: 'column',
            }}
          >
            {form.Field({
              name: 'desc',
              children: (field) => (
                <InputField placeholder="내용을 입력하세요." required field={field} label="반출사유" height="3.6rem"/>
              ),
            })}
          </div>

        </div>

        <div
          style={{
            background: '#f1f1f2',
            borderTop: '1px solid #ebebeb',
            display: 'flex',
            padding: '1.6rem',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.8rem'
            }}
          >
            <span
              style={{
                color: '#2a2a2b',
                fontWeight: 600,
                fontSize: '1.4rem'
              }}
            >
              반출 항목
            </span>
            <Divider/>
            <span
              style={{
                color: '#363637',
                fontSize: '1.4rem',
                fontWeight: 600
              }}
            >
              총&nbsp;
              <span
                style={{
                  color: '#0061b8'
                }}
              >
                240
              </span>
              건
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Table
              maxWidth={'52rem'}
              minWidth={0}
              columns={[
                {
                  accessorKey: '1',
                  header: '번호'
                }
              ]}
              data={[
                {
                  "1": '100'
                }
              ]}
            />
            <CustomPagination currentPage={1} totalPages={10} onChange={() => {
            }}/>
          </div>
        </div>
      </div>
    )
  })

export default ImageExportManagementRequestAddForm;