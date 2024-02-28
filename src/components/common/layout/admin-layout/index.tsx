import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores';
import { MENU } from '@/utils/constants';
import { getFirstPathCode, getInfoDevice } from '@/utils/helpers';
import { Layout as AntdLayout, Drawer, theme } from 'antd';

import HeaderComponent from './header';
import MenuComponent from './menu';
import TagsView from './tabs';

const { Content, Sider } = AntdLayout;
const WIDTH = 992;

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const token = theme.useToken();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(pathname);
  const { device, setCollapse, collapsed, setDevice, setMenuList } =
    useUserStore((state) => state);

  const isMobile = device === 'MOBILE';

  useEffect(() => {
    const code = getFirstPathCode(pathname);
    setOpenkey(code);
    setSelectedKey(pathname);
  }, [pathname]);

  const initMenuListAll = (menu: any[]) => {
    const MenuListAll: any[] = [];

    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach((mu: any) => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  useEffect(() => {
    setMenuList(initMenuListAll(MENU));
  }, [setMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getInfoDevice();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      setDevice(device);
      setCollapse(needCollapse);
    };
  }, [setCollapse, setDevice]);

  useEffect(() => {
    setDevice(getInfoDevice().device);
    const rect = document.body.getBoundingClientRect();
    const needCollapse = rect.width < WIDTH;
    setCollapse(needCollapse);
  }, [setCollapse, setDevice]);

  return (
    <AntdLayout className="layout-page">
      <HeaderComponent
        collapsed={collapsed}
        toggle={() => setCollapse(!collapsed)}
      />
      <AntdLayout>
        <Sider
          className="layout-page-sider"
          trigger={null}
          collapsible
          style={{ backgroundColor: token.token.colorBgContainer }}
          collapsedWidth={isMobile ? 0 : 80}
          collapsed={collapsed}
          breakpoint="md"
        >
          <MenuComponent
            menuList={MENU}
            openKey={openKey}
            onChangeOpenKey={(k: string) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k: string) => setSelectedKey(k)}
          />
        </Sider>
        <Drawer
          width={200}
          placement="left"
          styles={{ body: { padding: 0, height: '100%' } }}
          closable={false}
          onClose={() => setCollapse(!collapsed)}
          open={!collapsed}
          rootClassName="layout-page-drawer"
        >
          <MenuComponent
            menuList={MENU}
            openKey={openKey}
            onChangeOpenKey={(k: string) => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={(k: string) => setSelectedKey(k)}
          />
        </Drawer>
        <Content className="layout-page-content">
          <TagsView />
          <div>{children}</div>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
}

export default AdminLayout;
