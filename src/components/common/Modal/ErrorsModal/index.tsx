import React, { memo } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';
import { useErrorsStore } from 'src/stores/common/errors';

import styles from './styles.module.scss';

const { Text } = Typography;

function ErrorsModal() {
  const errors = useErrorsStore((state) => state.errors);
  const setErrors = useErrorsStore((state) => state.setErrors);

  const handleClose = () => {
    setErrors(null);
  };
  return (
    <Modal
      title={
        <Row gutter={[10, 10]} align="middle">
          <Col>
            <CloseCircleFilled className={styles.errorIcon} />
          </Col>
          <Col>
            <span className={styles.errorTitle}>Error</span>
          </Col>
        </Row>
      }
      open={errors && true}
      centered
      footer={null}
      destroyOnClose
      closable={false}
      maskClosable={false}
    >
      <Row gutter={[30, 30]} justify="center">
        <Col span={24} className={styles.errorContent}>
          <Text>{errors}</Text>
        </Col>
        <Col>
          <Button type="primary" onClick={handleClose}>
            OK
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

export default memo(ErrorsModal);
