'use client';
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import Image from "next/image";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import DropDown from "@/shared/components/dropDown/DropDown";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";

export default function SignUp () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection:'column',
        width:'100%',
        height:'100vh'
      }}
    >
      <div
        style={{
          flex: 1,
          padding:'6.4rem 0',
          flexDirection:'column',
          display:'flex',
          alignItems:'center'
        }}
      >
        <div
          style={{
            display:'flex',
            paddingBottom:'2rem',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            gap:'1.2rem',
            alignSelf:'stretch',
            borderBottom:'1px solid #D5D5D6'
          }}
        >
          <span style={{fontSize:'1.3rem', fontWeight: 700}}>코레일 철도 혼잡도 관리시스템</span>
          <div
            style={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              gap:'1.2rem',
              alignSelf:'stretch'
            }}
          >
            <div style={{width:'16.6rem', height:'4rem', aspectRatio: '83/20',position:'relative'}}>
              <Image src={'/portal_logo.svg'} alt={'logo'} fill/>
            </div>
            <span
              style={{
                fontSize:'3.2rem',
                fontWeight: 700,
                color:'#363637'
              }}
            >
              회원가입
            </span>
          </div>
        </div>

        {/*form 영역*/}
        <div
          style={{
            display:'flex',
            width:'76rem',
            padding: '4.4rem 3.2rem 0 3.2rem',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'flex-start',
            gap:'5.6rem'
          }}
        >
          <div
            style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'flex-start',
              gap:'3.2rem',
              alignSelf:'stretch'
            }}
          >
            <div
              style={{
                display:'flex',
                flexDirection:'column',
                gap:'1.2rem',
                alignSelf:'stretch'
              }}
            >
              <FormFieldWrapper label={'아이디(이메일)'} required>
                <div
                  style={{
                    display:'flex',
                    gap:'.8rem',
                    alignSelf:'stretch',
                    alignItems:'center'
                  }}
                >
                  <input
                    placeholder={'이메일 주소를 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                  <span
                    style={{
                      lineHeight:'25.5px',
                      fontWeight: 500,
                      letterSpacing: 0,
                      fontSize:'1.5rem'
                    }}
                  >
                    @
                  </span>
                  <div
                    style={{
                      width:'100%',
                      border:'1px solid #d5d5d6',
                      borderRadius:'8px',
                      display:'flex',
                      alignItems:'center',
                      padding:'0 1.2rem',
                      height:'100%'
                    }}
                  >
                    <DropDown
                      options={
                        [{key:'1',label:'korail.com'}]
                      }
                      onSelect={()=> {}}
                    />
                  </div>
                  
                  <button
                    style={{
                      whiteSpace:'nowrap',
                      height:'4rem',
                      // minWidth:'7.8rem',
                      padding:'0 1.2rem',
                      justifyContent: 'center',
                      alignItems:'center',
                      borderRadius:'6px',
                      background:'#D5D5D6'
                    }}
                  >
                    인증번호 전송
                  </button>
                </div>
              </FormFieldWrapper>


              <div
                style={{
                  display:'flex',
                  flexDirection:'column',
                  gap:'.6rem',
                  alignSelf:'stretch'
                }}
              >
                <div
                  style={{display:'flex',gap:'.8rem', alignItems:'center'}}
                >
                  <input
                    disabled
                    style={{
                      flex: 1,
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6',
                      background: '#EBEBEB'
                    }}
                  />
                  <button
                    style={{
                      whiteSpace:'nowrap',
                      height:'4rem',
                      padding:'0 1.2rem',
                      justifyContent: 'center',
                      alignItems:'center',
                      borderRadius:'6px',
                      background:'#D5D5D6'
                    }}
                  >
                    인증번호 확인
                  </button>
                </div>
                <span
                  style={{
                    color: '#6B6B6E',
                    fontSize:'1.2rem',
                  }}
                >
                  이메일 확인 후 내용이 가입된 인증번호를 입력해 주세요.
                </span>
              </div>
            </div>

            {/* password form */}
            <div
              style={{
                display:'flex',
                gap:'5.6rem',
                alignSelf:'stretch'
              }}
            >
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'비밀번호 입력'}
                  help={'영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상'}
                  helpPosition={'bottom'}
                >
                  <input
                    placeholder={'이메일 주소를 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'비밀번호 확인'}
                >
                  <input
                    placeholder={'비밀번호를 한번 더 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
            </div>
            <div
              style={{
                display:'flex',
                gap:'5.6rem',
                alignSelf:'stretch'
              }}
            >
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'이름'}
                >
                  <input
                    placeholder={'이름을 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'소속'}
                  help={'예 ) 역운영처, 광역운영처, 차량계획처, 수송운영처 ...'}
                  helpPosition={'bottom'}
                >
                  <input
                    placeholder={'소속을 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
            </div>
            <div
              style={{
                display:'flex',
                gap:'5.6rem',
                alignSelf:'stretch'
              }}
            >
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'직급'}
                  help={'예 ) 사원, 대리, 과장, 차장, 부장 ...'}
                  helpPosition={'bottom'}
                >
                  <input
                    placeholder={'직급을 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
              <div style={{flex:1}}>
                <FormFieldWrapper
                  required
                  label={'휴대폰'}
                  help={'예 ) - 없이 이어서 숫자 입력 '}
                  helpPosition={'bottom'}
                >
                  <input
                    placeholder={'휴대폰 번호를 입력해 주세요.'}
                    style={{
                      width:'100%',
                      minWidth:'4rem',
                      height:'4.4rem',
                      display:'flex',
                      padding:'0 1.2rem',
                      alignItems:'center',
                      borderRadius:'8px',
                      border:'1px solid #D5D5D6'
                    }}
                  />
                </FormFieldWrapper>
              </div>
            </div>

            <FormFieldWrapper label={'관심노선'}>
              <SearchModalTrigger
                columns={[]}
                value={''}
                onSelect={()=> {}}
                endPoint={'/'}
              />
            </FormFieldWrapper>

            <FormFieldWrapper label={'관심역사'}>
              <SearchModalTrigger
                columns={[]}
                value={''}
                onSelect={()=> {}}
                endPoint={'/'}
              />
            </FormFieldWrapper>

          </div>

          <div
            style={{
              display:'flex',
              justifyContent:'center',
              alignItems:'flex-start',
              gap:'1.2rem',
              alignSelf:'stretch'
            }}
          >
            <button
              style={{
                width:'16rem',
                display:'flex',
                height:'4.4rem',
                minWidth:'9rem',
                padding: '0 1.6rem',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'8px',
              }}
            >
              취소
            </button>
            <button
              style={{
                width:'16rem',
                display:'flex',
                height:'4.4rem',
                minWidth:'9rem',
                padding: '0 1.6rem',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'8px',
                background:'#D5D5D6'
              }}
            >
              확인
            </button>
          </div>

        </div>
      </div>
      <PortalFooter />
    </div>
  )
}