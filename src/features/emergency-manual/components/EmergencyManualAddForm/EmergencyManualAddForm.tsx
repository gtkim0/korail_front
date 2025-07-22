import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  EmergencyManualAddFormProps
} from "@/features/emergency-manual/components/EmergencyManualView/EmergencyManualView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {z} from 'zod';
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import {FileInput} from "@/shared/components/fileInput/FileInput";
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";
import Image from "next/image";
import {emergencyManualSchema} from "@/features/emergency-manual/schema/emergencyManualSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";

const EmergencyManualAddForm =
  forwardRef<FormAddFormRef, EmergencyManualAddFormProps>(({editData, onCanSubmitChange}, ref) => {
    const form = useCommonForm<z.infer<typeof emergencyManualSchema>>(
      ref,
      editData,
      onCanSubmitChange,
      emergencyManualSchema,
      {
        manualId: '',
        situationClass: '',
        manualSubject: '',
        writer: '',
        appliedArea: '',
        phone: '',
        useYn: false,
        file: null
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'manualId',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'메뉴얼 ID'}
                  placeholder={'메뉴얼 ID 를 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'situationClass',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'상황구분'}
                  placeholder={'ex) 혼잡,민원,고장...'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'manualSubject',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'메뉴얼 제목'}
                  placeholder={'ex) 혼잡도 역사 대응 방안'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'writer',
              children: (field) => {
                return (
                  <InputField
                    field={field}
                    label={'작성자'}
                    placeholder={'작성자를 입력해주세요.'}
                    required
                    height={'3.6rem'}
                  />
                )
              }
            })
          }
          {
            form.Field({
              name: 'appliedArea',
              children: (field) => {
                return (
                  <InputField
                    field={field}
                    label={'적용범위'}
                    placeholder={'적용범위를 입력해주세요.'}
                    required
                    height={'3.6rem'}
                  />
                )
              }
            })
          }
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {form.Field({
            name: 'phone',
            children: (field) => {
              const rawValue = field.getValue();

              const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 11);
                field.handleChange(onlyDigits);
              };

              return (
                <InputField
                  height={'3.6rem'}
                  field={field}
                  label="휴대폰"
                  required
                  type="text"
                  value={formatPhoneNumber(rawValue)}
                  onChange={handleChange}
                  placeholder="휴대폰 번호를 입력해 주세요."
                  help="예 ) - 없이 이어서 숫자 입력"
                  helpPosition="bottom"
                />
              );
            },
          })}
          {
            form.Field({
              name: 'useYn',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'사용여부'}>
                    <ToggleSwitch
                      checked={field.getValue()}
                      onChange={() => {
                      }}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
        </div>

        {
          form.Field({
            name: 'file',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'비상대피도'}>
                  <FileInput
                    value={field.getValue()?.name || ''}
                    onChange={(file) => {
                      field.handleChange(file);
                    }}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {form.getFieldValue('file') && (
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Image
              src={URL.createObjectURL(form.getFieldValue('file'))}
              alt="썸네일 미리보기"
              width={200}
              height={200}
              style={{objectFit: 'contain', border: '1px solid #ccc', borderRadius: '8px'}}
            />
          </div>
        )}
      </ModalAddFormLayout>
    )

  })

export default EmergencyManualAddForm;