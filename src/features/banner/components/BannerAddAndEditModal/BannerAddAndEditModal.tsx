import BannerAddForm, {BannerAddFormRef} from "@/features/banner/components/BannerAddForm/BannerAddForm";
import {RefObject} from "react";

interface Props {
  editAreaRef: RefObject<BannerAddFormRef | null>;
}

export const BannerAddAndEditModal = ({editAreaRef}: Props) => {

  return (
    <div
      style={{
        display:'flex',
        padding:'1.6rem',
        flex: 1,
        alignSelf:'stretch'
      }}
    >
      <BannerAddForm ref={editAreaRef} />
    </div>
  )
}
