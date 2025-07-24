'use client';
import {forwardRef} from "react";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {
  NotificationLogFormType
} from "@/features/notification-log/components/NotificationLogAddForm/NotificationLogAddForm";
import {FormAddFormRef} from "@/types/common";
import {
  CongestionVerificationCompleteAddFormProps
} from "@/features/congestion-verification-complete/components/CongestionVerificationTargetView/CongestionVerificationCompleteView";
import {
  congestionVerificationCompleteSchema
} from "@/features/congestion-verification-complete/schema/congestionVerificationCompleteSchema";

const CongestionVerificationCompleteAddForm =
  forwardRef<FormAddFormRef, CongestionVerificationCompleteAddFormProps>(({editData, onCanSubmitChange}, ref) => {

  const form = useCommonForm<NotificationLogFormType>(
    ref,
    editData,
    onCanSubmitChange,
    congestionVerificationCompleteSchema,
    {
      reservationNm: '',
      sendTm: '',
      channelNm: '',
      notificationGrp: '',
      notificationText: '',
      notificationContent: ''
    }
  )

  return (
    <ModalAddFormLayout>
      <></>
    </ModalAddFormLayout>
  )
})

export default CongestionVerificationCompleteAddForm;