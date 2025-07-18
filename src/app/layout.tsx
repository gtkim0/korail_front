import type {Metadata} from "next";
import {Toaster} from 'react-hot-toast';
import "./globals.scss";
import "@/shared/styles/media.scss";
import RQProviders from "@/shared/provider/RQProvider";
import localFont from "next/font/local";
import SplashWrapper from "@/shared/components/splashWrapper/SplashWrapper";
import {ReactNode} from "react";

const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard'
})

export const metadata: Metadata = {
  title: "철도 혼잡도 관리시스템",
  description: "철도 혼잡도 관리시스템",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {

  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
      <RQProviders>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {fontSize: '14px', zIndex: 100000},
          }}
        />
        <SplashWrapper>
          {children}
        </SplashWrapper>
      </RQProviders>
      </body>
    </html>
  );
}
