'use client'

import styles from './PortalFooter.module.scss';
import Image from "next/image";
import Link from "next/link";
import ArrowDown from '@/shared/assets/images/arrow-down.svg';
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {useResponsive} from "@/shared/hooks/useResponsive";

const g = [
  {label: '코레일관광개발(주)', link: 'https://www.korailtravel.com'},
  {label: '코레일네트윅스(주)', link: 'https://www.korailnetworks.com'},
  {label: '코레일로지스(주)', link: 'https://www.koraillogis.com'},
  {label: '코레일유통(주)', link: 'https://www.korailretail.com'},
  {label: '코레일테크(주)', link: 'https://www.korailtech.com/main/mainPage.do'},
];
const site = [
  {label: '이사회 커뮤니티', link: 'https://info.korail.com/staff/isaLoginView.do'},
  {label: '믈류정보서비스', link: 'https://logis.korail.go.kr/index.do'},
  {label: '철도박물관', link: 'https://www.railroadmuseum.co.kr'},
  {label: '인재개발원', link: 'https://hrd.korail.com/common/greeting.do'},
  {label: '전자조달시스템', link: 'https://ebid.korail.com'},
  {label: '희망철도재단', link: 'https://hopekorail.or.kr/main/main.html'},
  {label: 'ALIO', link: 'https://www.alio.go.kr'},
  {label: '정부24', link: 'https://plus.gov.kr'},
  {label: '안전신문고', link: 'https://www.safetyreport.go.kr'},
];

export default function PortalFooter() {
  const dummy = {
    top: {
      phone: {label: '상호', value: '한국철도공사'},
      name: {label: '대표자', value: '한문희'},
      businessRegistration: {label: '사업자등록', value: '314-82-10024'},
      as: {label: '통신판매업신고', value: '대전 동구-0233호'}
    },
    bottom: {
      customServicePhone: {label: '고객센터', value: '1588-7788(이용료 : 발신자부담)'},
      address: {label: '대표전화', value: '042-472-5000'},
      fax: {label: '팩스', value: '02-361-8385'},
    }
  };

  const guideInfo = [
    {label: '개인정보처리방침', link: ''},
    {label: '이메일무단수집거부', link: ''},
    {label: '저작권정책', link: ''}
  ];

  const guRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState<string | null>(null);
  const {isMobile} = useResponsive();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        (openState === 'gu' && guRef.current && !guRef.current.contains(e.target as Node)) ||
        (openState === 'site' && siteRef.current && !siteRef.current.contains(e.target as Node))
      ) {
        setOpenState(null);
      }
    };

    if (openState) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openState]);

  return (
    <footer className={styles.footer}>
      {
        isMobile &&
          <div>

          </div>
      }
      <div className={styles.footerWrapper}>
        <div className={styles.footerContentContainer}>
          <div className={styles.footerLogoArea}>
            <div style={{position: 'relative', width: '20rem', height: '4.8rem'}}>
              <Image src={'/portal_logo.svg'} alt={'logo'} fill/>
            </div>
            {
              !isMobile &&
                <div className={styles.footerLogoAreaRight}>
                    <div ref={guRef} style={{position: 'relative'}}>
                        <div
                            onClick={() => setOpenState(openState === 'gu' ? null : 'gu')}
                            className={clsx(styles.selectBox, openState === 'gu' && styles.select)}
                        >
                            <span>계열사</span>
                            <Image className={openState === 'gu' ? styles.open : ''} src={ArrowDown} alt="arrow"/>
                        </div>
                      {
                        openState === 'gu' && (
                          <AnimatePresence>
                            <motion.div
                              key="dropdown"
                              className={styles.dropdown_content}
                              initial={{opacity: 0, y: 0}}
                              animate={{opacity: 1, y: -5}}
                              transition={{duration: 0.3}}
                            >
                              {g.map(option => (
                                <div className={styles.dropdown_item} key={option.label}>
                                  <Link
                                    href={option.link}
                                    target={"_blank"}
                                  >
                                    {option.label}
                                  </Link>
                                </div>
                              ))}
                            </motion.div>
                          </AnimatePresence>
                        )
                      }
                    </div>

                    <div ref={siteRef} style={{position: 'relative'}}>
                        <div
                            onClick={() => setOpenState(openState === 'site' ? null : 'site')}
                            className={clsx(styles.selectBox, openState === 'site' && styles.select)}
                        >
                            <span>관련사이트</span>
                            <Image className={openState === 'site' ? styles.open : ''} src={ArrowDown} alt="arrow"/>
                        </div>
                      {
                        openState === 'site' && (
                          <AnimatePresence>
                            <motion.div
                              key="dropdown"
                              className={styles.dropdown_content}
                              initial={{opacity: 0, y: 0}}
                              animate={{opacity: 1, y: -5}}
                              transition={{duration: 0.3}}
                            >
                              {site.map(option => (
                                <div className={styles.dropdown_item} key={option.label}>
                                  <Link
                                    href={option.link}
                                    target={"_blank"}
                                  >
                                    {option.label}
                                  </Link>
                                </div>
                              ))}
                            </motion.div>
                          </AnimatePresence>
                        )
                      }
                    </div>
                </div>
            }
          </div>

          <div className={styles.infoSection}>
            <span className={styles.address}>대전광역시 동구 중앙로 240</span>

            <div className={styles.infoWrapper}>
              <div className={styles.infoRow}>
                {Object.entries(dummy.top).map(([key, value], idx, arr) => (
                  <div key={key} className={styles.infoItem}>
                    <span className={styles.infoText}>
                      <span>{value.label}</span> {value.value}
                    </span>
                    {idx !== arr.length - 1 && <div className={styles.separator}/>}
                  </div>
                ))}
              </div>

              <div className={styles.infoRow}>
                {Object.entries(dummy.bottom).map(([key, value], idx, arr) => (
                  <div key={key} className={styles.infoItem}>
                    <span className={styles.infoText}>
                      <span>{value.label}</span> {value.value}
                    </span>
                    {idx !== arr.length - 1 && <div className={styles.separator}/>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={clsx(styles.guideWrapper, isMobile && styles.column)}>
            {/*<div className={styles.guideItemWrapper}>*/}
            {/*  {guideInfo.map(i => (*/}
            {/*    <Link href={i.link} className={styles.guideItem} key={i.label}>*/}
            {/*      {i.label}*/}
            {/*    </Link>*/}
            {/*  ))}*/}
            {/*</div>*/}
            <span className={styles.copyright}>
              COPYRIGHT ⓒ KOREA RAILROAD. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}