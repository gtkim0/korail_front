'use client';
import {forwardRef} from "react";
import {PermissionUserColumnType} from "@/types/permission-user";
import {FormAddFormRef} from "@/types/common";
import {PermissionUserAddFormProps} from "@/features/permission-user/components/PermissionUserView/PermissionUserView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {permissionUserSchema} from "@/features/permission-user/schema/permissionUserSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";

export type PermissionUserFormType = Omit<PermissionUserColumnType, 'id' | 'date'>;

const PermissionUserAddForm =
  forwardRef<FormAddFormRef, PermissionUserAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<PermissionUserFormType>(
      ref,
      editData,
      onCanSubmitChange,
      permissionUserSchema,
      {}
    )

    return (
      <ModalAddFormLayout
        style={{padding: 0}}
      >
        <></>
      </ModalAddFormLayout>
    )
  })

export default PermissionUserAddForm;