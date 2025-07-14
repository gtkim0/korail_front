'use client';
import {useRouter} from 'next/navigation';
import {toast} from 'react-hot-toast'
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import styles from './login.module.scss';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useForm} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import {useRef} from "react";

const imageList = [
  '/portal_logo.svg',
  '/banner/banner_1.png',
  '/banner/banner_2.png',
  '/banner/banner_3.png',
  '/banner/banner_4.png',
  '/banner/banner_5.jpg',
]

export default function LoginPage() {

  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },

    onSubmit: async ({value}) => {

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value), // form -> value로 변경
        });

        if (!res.ok) {
          const error = await res.text();
          toast.error(`로그인 실패: ${error}`);
          return;
        }

        router.replace('/');
      } catch (err) {
        toast.error('서버 오류: 로그인 요청 실패');
        console.error(err);
      }
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.logo_container}>
            <ImageWrapper width={200} height={48} src={'/portal_logo.svg'}/>
            <span>철도 혼잡도 관시시스템 로그인</span>
          </div>

          <div style={{display: 'flex', gap: '5.6rem', flexDirection: 'column'}}>
            <div className={styles.content_form}>
              <div className={styles.form}>
                {
                  form.Field({
                    name: 'username',
                    validators: {
                      // onChange: ({value}) => {
                      //   if (!value) return '이메일을 입력해 주세요.';
                      //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      //     return '올바른 이메일 형식이 아닙니다.';
                      //   }
                      // },
                    },
                    children: (field) => (
                      <InputField name={'username'} placeholder={'이메일 주소를 입력해 주세요.'} required field={field}
                                  label={'회원아이디'}/>
                    ),
                  })
                }
              </div>

              <div className={styles.form}>
                {
                  form.Field({
                    name: 'password',
                    children: (field) => (
                      <InputField type={'password'} placeholder={'비밀번호를 입력해 주세요.'} required={true} field={field}
                                  label={'비밀번호'}/>
                    ),
                  })
                }
              </div>
            </div>

            <div className={styles.submitForm}>
              <button onClick={form.handleSubmit} className={styles.submitBtn}>로그인</button>
              <div className={styles.authForm}>
                <button>회원가입</button>
                <span style={{width: '1px', height: '1rem', background: '#D5D5D6'}}>&nbsp;</span>
                <button>회원정보 찾기</button>
              </div>
            </div>
          </div>

          <div className={styles.swiperArea}>
            <div onClick={() => swiperRef.current?.slidePrev()} className={styles.arrowBtnWrapper}>
              <Image src={'/arrow-left.svg'} alt={'icon'} width={16} height={16}/>
            </div>
            <div className={styles.swiperContent}>
              <Swiper
                spaceBetween={16}
                modules={[Autoplay]}
                effect={'fade'}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false
                }}
                style={{ width: '100%' }}
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => swiperRef.current = swiper}
                className="mySwiper"
                breakpoints={{
                  640: {slidesPerView: 1},
                  800: {slidesPerView: 2},
                  1024: {slidesPerView: 3},
                  1250: {slidesPerView: 4}
                }}
              >
                {
                  imageList.map(i=> (
                    <SwiperSlide key={i}>
                      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height:'8rem',margin: 'auto',border:'1px solid #EBEBEB',borderRadius:'6px'}}>
                        <Image
                          src={i}
                          alt="portal logo"
                          width={0}
                          height={0}
                          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 30vw"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
            <div onClick={() => swiperRef.current?.slideNext()} className={styles.arrowBtnWrapper}>
              <Image src={'/arrow-right.svg'} alt={'icon'} width={16} height={16}/>
            </div>
          </div>
        </div>
      </div>
      <PortalFooter/>
    </div>
  );
}