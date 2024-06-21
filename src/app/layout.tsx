import WebVitals from '@/components/features/web-vitals';
import { META_DATA_DEFAULT } from '@/utils/constants/seo';
import { cn } from '@/utils/helpers/common';

import '@styles/globals.css';

import dynamic from 'next/dynamic';
import { Inter as FontSans } from 'next/font/google';
import Header from '@/components/common/header';
import NextTopLoader from 'nextjs-toploader';

import NextuiProviders from './nextui-provider';
import SolanaWalletProvider from './solana-wallets-provider';

const SonnerToaster = dynamic(() => import('@/components/common/toast/sonner'));

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const metadata = META_DATA_DEFAULT;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased bg-gray-100',
          fontSans.variable,
        )}
      >
        <WebVitals />
        <NextTopLoader />
        <NextuiProviders>
          <SolanaWalletProvider>
            <Header />
            {children}
          </SolanaWalletProvider>
        </NextuiProviders>
        <SonnerToaster />
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default RootLayout;

export { metadata };
