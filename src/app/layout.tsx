import WebVitals from '@/components/features/web-vitals';
import { META_DATA_DEFAULT } from '@/utils/constants/seo';
import { cn } from '@/utils/helpers';

import '@styles/globals.css';

import dynamic from 'next/dynamic';
import { Inter as FontSans } from 'next/font/google';

const NextTopLoader = dynamic(() => require('nextjs-toploader'));
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
          'min-h-screen bg-background font-sans antialiased bg-gray-100',
          fontSans.variable,
        )}
      >
        <WebVitals />
        <NextTopLoader />
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default RootLayout;

export { metadata };
