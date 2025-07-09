import styles from './CongestionAddAndEditModal.module.css'
import CongestionAddForm from "@/features/congestionStep/components/CongestionAddForm/CongestionAddForm";

interface Props {
  selectedItem: any;
}

export default function CongestionAddAndEditModal ({selectedItem}: Props) {
  return (
    <div
      style={{
        display:'flex',
        padding:'1.6rem',
        flex: 1,
        alignSelf:'stretch'
      }}
    >
      <CongestionAddForm selectedItem={selectedItem}/>
    </div>
  )
}