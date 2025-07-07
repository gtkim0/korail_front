import styles from './PortalFooter.module.css';
import Image from "next/image";

export default function PortalFooter() {

  //@TODO 정보 DB 에서 가져오는걸로
  const dummy = {
    top: {
      phone: {
        label: '대표전화',
        value: '1234-5678'
      },
      name: {
        label: '대표자',
        value: '한문희'
      },
      businessRegistration : {
        label: '사업자등록',
        value: '314-82-10024'
      },
    },
    bottom: {

      address : {
        label: '주소',
        value: '대전광역시 동구 중앙로 240'
      },
      customServicePhone : {
        label: '고객센터',
        value: '1588-7788'
      },
      fax : {
        label: '팩스',
        value: '02-361-8385'
      },
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div
          style={{
            display:'flex',
            padding: '0 4rem',
            flexDirection:'column',
            alignItems:'flex-start',
            gap:'2.4rem',
            alignSelf: 'stretch'
          }}
        >
          <div className={styles.footerLogoArea}>
            <div style={{position:'relative', width:'20rem', height:'4.8rem'}}>
              <Image src={'/portal_logo.svg'} alt={'logo'} fill/>
            </div>
            <div className={styles.footerLogoAreaRight}>
              <div
                style={{
                  display:'flex',
                  width:'20rem',
                  height:'4.8rem',
                  padding: '0 2rem',
                  alignItems:'center',
                  gap:'.6rem',
                  background: 'rgba(255, 255, 255, 0.00)'
                }}
              >
                <span
                  style={{
                    color: '#363637',
                    display:'inline-flex',
                    fontSize:'1.5rem',
                    fontWeight: 500,
                    lineHeight: '150%',
                    letterSpacing: '0',
                    flex: 1
                  }}
                >
                계열사
                </span>
                <Image src={'/arrow-down.svg'} alt={'logo'} width={20} height={20} />
              </div>
              <div
                style={{
                  display:'flex',
                  width:'20rem',
                  height:'4.8rem',
                  padding: '0 2rem',
                  alignItems:'center',
                  gap:'.6rem',
                  background: 'rgba(255, 255, 255, 0.00)'
                }}
              >
                <span
                  style={{
                    color: '#363637',
                    display:'inline-flex',
                    fontSize:'1.5rem',
                    fontWeight: 500,
                    lineHeight: '150%',
                    letterSpacing: '0',
                    flex: 1
                  }}
                >
                관련사이트
                </span>
                <Image src={'/arrow-down.svg'} alt={'logo'} width={20} height={20} />
              </div>
            </div>
          </div>

          <div
            style={{
              display:'flex',
              flexDirection:'column',
              gap: '1rem',
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                color:'#2A2A2B',
                fontSize:'1.5rem',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '0',
              }}
            >
              (04383) 서울특별시 용산구 이태원로 22
            </span>

            <div
              style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'flex-start',
                gap: '.6rem'
              }}
            >
              <div style={{display:'flex', gap:'1.6rem'}}>
              {
                Object.entries(dummy.top).map(([key, value]) => {
                  return (
                    <span key={key} style={{display:'flex',gap:'.4rem', fontSize:'1.5rem'}}>
                      { value ? `${value.label} : ${value.value}` : ''}
                    </span>
                  )
                })
              }
              </div>
              <div style={{display:'flex', gap:'1.6rem'}}>
                {
                  Object.entries(dummy.bottom).map(([key, value]) => {
                    return (
                      <span key={key} style={{display:'flex',gap:'.4rem', fontSize:'1.5rem'}}>
                      { value ? `${value.label} : ${value.value}` : ''}
                    </span>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div
            style={{
              display:'flex',
              padding: '1rem 0',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              alignSelf: 'stretch',
              borderTop: '1px solid #EBEBEB',
              gap:'.6rem'
            }}
          >
            <div
              style={{
                fontSize:'1.3rem',
                color: '#2A2A2B',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '0',
                cursor:'pointer'
              }}
            >
              이용안내
            </div>
            <div
              style={{
                fontSize:'1.3rem',
                color: '#0097C1',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '0',
                cursor:'pointer'
              }}
            >
              개인정보처리방침
            </div>
            <div
              style={{
                fontSize:'1.3rem',
                color: '#2A2A2B',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '0',
                cursor:'pointer'
              }}
            >
              저작권정책
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}