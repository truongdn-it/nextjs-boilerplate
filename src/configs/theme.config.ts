import { Open_Sans } from 'next/font/google';
import type { ThemeConfig } from 'antd';

const openSans = Open_Sans({
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

const THEME_CONFIG: ThemeConfig = {
  token: {
    fontFamily: `${openSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  },
};

export { THEME_CONFIG };
