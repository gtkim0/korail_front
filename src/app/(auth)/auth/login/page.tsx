'use client';
import {useRouter} from 'next/navigation';
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import styles from './login.module.scss';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useForm} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import {Autoplay} from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import {useRef} from "react";
import {z} from 'zod';
import FormSubmitButton from "@/shared/components/form/FormSubmitButton/FormSubmitButton";
import {clientPost} from "@/shared/api/clientFetcher";

const imageList = [
  {
    url: '/portal_logo.svg',
    link: 'https://www.naver.com/'
  },
  {
    url: '/banner/banner_1.png',
    link: 'https://www.naver.com/'
  },
  {
    url: '/banner/banner_2.png',
    link: 'https://www.naver.com/'
  },
  {
    url: '/banner/banner_3.png',
    link: 'https://www.naver.com/'
  },
  {
    url: '/banner/banner_4.png',
    link: 'https://www.naver.com/'
  },
  {
    url: `/banner/banner_5.jpg`,
    link: 'https://www.naver.com/'
  },
]

const LoginSchema = z.object({
  username: z.string().min(3, '이메일을 입력해주세요.'),
  password: z
    .string()
    .min(10, '비밀번호는 최소 10자리여야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])/, '영문 + 숫자/특수문자 조합 필수'),
})

// cookie 에 있으면 이쪽페이지 못들어오게 수정


export default function LoginPage() {

  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: LoginSchema,
      onChange: LoginSchema
    },
    onSubmit: async ({value}) => {
      try {
        // const res = await fetch('/apis/auth/login', {
        //   method: 'POST',
        //   credentials: 'include',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(value),
        // });

        // if (!res.ok) {
        //   const error = await res.text();
        //   toast.error(`로그인 실패: ${error}`);
        //   return;
        // }

        await clientPost<Response>('/auth/login', {
          ...value
        })

        router.replace('/dashboard');
      } catch (err) {
        // toast.error('서버 오류: 로그인 요청 실패');
        console.error(err);
      }
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{flex: 1,position:'relative'}}>
          <Image
            src={'/login_bg.svg'}
            alt={''}
            width={960}
            height={818}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            priority
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <div className={styles.logo_container}>
              <ImageWrapper width={200} height={48} src={'/portal_logo.svg'}/>
              <span>철도 혼잡도 관시시스템 로그인</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className={styles.form}
            >
              <div className={styles.content_form}>
                <div className={styles.form}>
                  {
                    form.Field({
                      name: 'username',
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
                {/*<button className={styles.submitBtn}>로그인</button>*/}
                <FormSubmitButton form={form}>
                  로그인
                </FormSubmitButton>
                <div className={styles.authForm}>
                  <button type={'button'} onClick={() => router.push('/auth/signup')}>회원가입</button>
                  <span style={{width: '1px', height: '1rem', background: '#D5D5D6'}}>&nbsp;</span>
                  <button type={'button'} onClick={() => router.push('/auth/find')}>회원정보 찾기</button>
                </div>
              </div>
            </form>

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
                  style={{width: '100%'}}
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
                    imageList.map(i => (
                      <SwiperSlide key={i.url}>
                        <div
                          onClick={() => window.open(i.link)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            height: '8rem',
                            margin: 'auto',
                            border: '1px solid #EBEBEB',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Image
                            src={i.url}
                            alt="portal logo"
                            width={0}
                            height={0}
                            style={{width: '100%', height: 'auto', objectFit: 'contain'}}
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
      </div>
      <PortalFooter/>
    </div>
  );
}