import type { FC } from 'react';
import { memo, useState } from 'react';
import { BellOutlined, LoadingOutlined } from '@ant-design/icons';
import { Badge, Empty, Popover, Spin, Tooltip } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const HeaderNoticeComponent: FC = () => {
  const [visible, setVisible] = useState(false);

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon} spinning={false}>
        <Empty />
      </Spin>
    </div>
  );

  return (
    <Popover
      content={tabs}
      overlayClassName="bg-2"
      placement="bottomRight"
      trigger={['click']}
      open={visible}
      onOpenChange={(v) => setVisible(v)}
      overlayStyle={{
        width: 336,
      }}
    >
      <Tooltip title={'Notifications'}>
        <Badge count={10} overflowCount={999}>
          <span className="notice" id="notice-center">
            <BellOutlined className="anticon" />
          </span>
        </Badge>
      </Tooltip>
    </Popover>
  );
};

export default memo(HeaderNoticeComponent);
