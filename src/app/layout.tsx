import type {Metadata} from "next";
import {Toaster} from 'react-hot-toast';
import "@/shared/styles/media.scss";
import "react-datepicker/dist/react-datepicker.css";
import "@/shared/styles/datePicker-over.module.scss"
import RQProviders from "@/shared/provider/RQProvider";
import localFont from "next/font/local";
import SplashWrapper from "@/shared/components/splashWrapper/SplashWrapper";
import {ReactNode} from "react";
import "./globals.scss";
import ZustandHydrator from "@/shared/provider/ZustandHydrator";

const pretendard = localFont({
    src: '../../public/fonts/pretendard/PretendardVariable.woff2',
    display: 'swap',
    variable: '--font-pretendard'
})

export const metadata: Metadata = {
    title: "철도 혼잡도 관리시스템",
    description: "철도 혼잡도 관리시스템",
};

const getCommonCode = async () => {
    try {
        const res = await fetch(`http://localhost:8080/menus`);
        return res.json();
    } catch (e) {
        console.error("fetch err")
    }
}

export default async function RootLayout({children}: Readonly<{ children: ReactNode }>) {

  // let code = null;
  //
  // try {
  //   code = await getCommonCode();
  // } catch (err) {
  //   console.error(err);
  // }

  return (
    <html lang="en">
    <body className={`${pretendard.variable} antialiased`}>
    <RQProviders>
      {/*<ZustandHydrator initial={code}>*/}
      <ZustandHydrator initial={[]}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {fontSize: '14px', zIndex: 100000},
          }}
        />
        <SplashWrapper>
          {children}
        </SplashWrapper>
      </ZustandHydrator>
    </RQProviders>
    </body>
    </html>
  );
}
