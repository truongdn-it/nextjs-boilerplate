import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores';
import { useAdminStore } from '@/stores/admin';
import { WEB_ROUTES } from '@/utils/constants';
import { Tabs } from 'antd';

const TagsView: FC = () => {
  const { tags, activeTagId, removeTag, setActiveTag, addTag } = useAdminStore(
    (state) => state,
  );
  const { menuList } = useUserStore((state) => state);
  const router = useRouter();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find((tag) => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
      router.push(tag.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    let lastIndex = 0;
    let newActiveTagId = activeTagId;
    tags.forEach((tag, i) => {
      if (tag.path === targetKey) {
        lastIndex = i - 1;
      }
    });
    const tagList = tags.filter((tag) => tag.path !== targetKey);

    if (tagList.length && newActiveTagId === targetKey) {
      if (lastIndex >= 0) {
        newActiveTagId = tagList[lastIndex].path;
      } else {
        newActiveTagId = tagList[0].path;
      }
    }

    router.push(newActiveTagId);
    removeTag(targetKey);
  };

  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find((item) => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === router.pathname;
        }
      });

      if (tag) {
        setActiveTag(tag.path);
      }
    },
    [router.pathname, setActiveTag, tags],
  );

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find((m) => m.path === router.pathname);

      if (menu) {
        addTag({
          ...menu,
          closable: menu.path !== WEB_ROUTES.DASHBOARD,
        });
      }
    }
  }, [addTag, menuList, router.pathname]);

  return (
    <div id="pageTabs" style={{ padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) =>
          action === 'remove' && onClose(targetKey as string)
        }
        items={tags.map((tag) => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label,
          };
        })}
      />
    </div>
  );
};

export default TagsView;
