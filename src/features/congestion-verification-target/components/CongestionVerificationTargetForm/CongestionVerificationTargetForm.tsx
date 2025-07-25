'use client';
import {forwardRef} from "react";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {FormAddFormRef} from "@/types/common";
import {
  congestionVerificationTargetSchema
} from "@/features/congestion-verification-target/schema/congestionVerificationTargetSchema";
import {
  CongestionVerificationTargetAddFormProps
} from "@/features/congestion-verification-target/components/CongestionVerificationTargetView/CongestionVerificationTargetView";
import Image from "next/image";
import {InputField} from "@/shared/components/Input/InputField";

export type CongestionVerificationTargetFormType = {
  imageUrl: string,
  measureCount: string,
  verificationCount: string
}

const CongestionVerificationTargetAddForm =
  forwardRef<FormAddFormRef, CongestionVerificationTargetAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<CongestionVerificationTargetFormType>(
      ref,
      editData,
      onCanSubmitChange,
      congestionVerificationTargetSchema,
      {
        imageUrl: '',
        measureCount: '',
        verificationCount: ''
      }
    )

    return (
      <div
        style={{
          display:'flex',
          padding:'1.6rem',
          flexDirection:'column'
        }}
      >
        <div
          style={{
            display:'flex',
            paddingBottom:'8px',
            gap:'2.4rem',
            alignSelf:'stretch'
          }}
        >
          <div
            style={{
              flex: 1,
              alignItems:'center',
              display:'flex',
              gap:'2px'
            }}
          >
            <Image src={'/train_fill.svg'} alt={''} width={20} height={20}/>
            <span
              style={{
                fontSize:'1.5rem',
                fontWeight:700,
                color:'#2a2a2b',
                flex:1,
              }}
            >
              경인선-K1-역곡-소사-10003
            </span>
          </div>
          <div
            style={{
              display:'flex',
              gap:'6px',
              fontSize:'1.3rem'
            }}
          >
            <span>측정일시</span>
            <span>2025-12-13 13:34:30</span>
          </div>
        </div>

        <div
          style={{
            width:'900px',
            height:'500px',
            position:'relative'
          }}
        >
          <Image
            src={'/splash.png'}
            alt=""
            width={900}
            height={500}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            priority
          />
        </div>


        <div
          style={{
            display:'flex',
            paddingTop:'3.2rem',
            flexDirection:'column',
            gap:'1rem',
            alignSelf:'stretch'
          }}
        >
          <span>검증결과</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
            {
              form.Field({
                name: 'measureCount',
                children: (field) => {
                  return (
                    <InputField
                      disabled
                      field={field}
                      label={'측정결과(인원수)'}
                      placeholder={''}
                      required
                      height={'3.6rem'}
                    />
                  )
                }
              })
            }
            {
              form.Field({
                name: 'verificationCount',
                children: (field) => {
                  return (
                    <InputField
                      field={field}
                      label={'검증결과(인원수)'}
                      placeholder={''}
                      required
                      height={'3.6rem'}
                    />
                  )
                }
              })
            }
          </div>
        </div>


      </div>
    )
  })

export default CongestionVerificationTargetAddForm;