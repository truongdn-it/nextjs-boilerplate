import { memo } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores';
import { Menu } from 'antd';

const MenuComponent = (props: any) => {
  const {
    menuList,
    openKey,
    onChangeOpenKey,
    selectedKey,
    onChangeSelectedKey,
  } = props;
  const device = useUserStore((state) => state.device);
  const setCollapse = useUserStore((state) => state.setCollapse);
  const router = useRouter();

  const getTitle = (menu: any) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span className="anticon">{menu.icon}</span>
        <span>{menu.label}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    router.push(path);

    if (device !== 'DESKTOP') {
      setCollapse(true);
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map((menu: any) => {
        return menu.children
          ? {
              key: menu.path,
              label: getTitle(menu),
              children: menu.children.map((child: any) => ({
                key: child.path,
                label: child.label,
              })),
            }
          : {
              key: menu.path,
              label: getTitle(menu),
            };
      })}
    ></Menu>
  );
};

export default memo(MenuComponent);
