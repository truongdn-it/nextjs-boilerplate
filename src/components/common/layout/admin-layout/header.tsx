import { memo, type FC } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/stores';
import { useGlobalStore } from '@/stores/global';
import {
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { theme as antTheme, Dropdown, Layout, Tooltip } from 'antd';
import EnUsSvg from 'public/images/admin/header/en_US.svg';
import VietNamFlag from 'public/images/admin/header/vietnam-flag.svg';

import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const logged = useUserStore((state) => state.logged);
  const locale = useUserStore((state) => state.locale);
  const device = useUserStore((state) => state.device);
  const setLocale = useUserStore((state) => state.setLocale);

  const theme = useGlobalStore((state) => state.theme);
  const setTheme = useGlobalStore((state) => state.setTheme);
  const token = antTheme.useToken();

  const selectLocale = ({ key }: { key: any }) => {
    setLocale(key);
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    setTheme(newTheme);
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <Image
            alt="Logo"
            width={512}
            height={512}
            src="/icon.png"
            draggable={false}
          />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Tooltip
            title={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
          >
            <span onClick={onChangeTheme}>
              {theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            </span>
          </Tooltip>
          <HeaderNoticeComponent />
          <Dropdown
            menu={{
              onClick: (info) => selectLocale(info),
              items: [
                {
                  key: 'vi_VN',
                  icon: (
                    <Image
                      src={VietNamFlag.src}
                      id="language-change"
                      alt=""
                      width={18}
                      height={12}
                    />
                  ),
                  disabled: locale === 'vi_VN',
                  label: 'Tiếng Việt',
                },
                {
                  key: 'en_US',
                  icon: (
                    <Image
                      src={EnUsSvg.src}
                      id="language-change"
                      alt=""
                      width={18}
                      height={12}
                    />
                  ),
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <GlobalOutlined />
          </Dropdown>

          {logged ? (
            // <Dropdown
            //   menu={{
            //     items: [
            //       {
            //         key: '1',
            //         icon: <UserOutlined />,
            //         label: (
            //           <span onClick={() => navigate('/dashboard')}>
            //             <LocaleFormatter id="header.avator.account" />
            //           </span>
            //         ),
            //       },
            //       {
            //         key: '2',
            //         icon: <LogoutOutlined />,
            //         label: (
            //           <span onClick={() => onActionClick('logout')}>
            //             <LocaleFormatter id="header.avator.logout" />
            //           </span>
            //         ),
            //       },
            //     ],
            //   }}
            // >
            //   <span className="user-action">
            //     <img src={Avator} className="user-avator" alt="avator" />
            //   </span>
            // </Dropdown>
            <div />
          ) : (
            <span style={{ cursor: 'pointer' }}>Login</span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default memo(HeaderComponent);
