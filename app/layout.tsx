/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { Metadata } from 'next';
import './globals.css';
import pretendardRegular from './_constants/font';
import QueryProvider from './_providers/QueryProvider';
import { AuthProvider } from './_providers/AuthProvider';
import { UserInfoProvider } from './_providers/UserInfoProvider';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <QueryProvider>
        <AuthProvider>
          <UserInfoProvider>
            <body
              className={`${pretendardRegular.className} mx-auto min-h-screen w-full bg-gray text-black`}
            >
              {children}
            </body>
          </UserInfoProvider>
        </AuthProvider>
      </QueryProvider>
    </html>
  );
}
