import React, { memo } from 'react';
import { useErrorsStore } from '@/components/common/modal/errors-modal/errors-modal.store';
import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Col, Modal, Row, Typography } from 'antd';

import styles from './errors-modal.module.scss';

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
            <span className={styles.errorTitle}>{errors?.message}</span>
          </Col>
        </Row>
      }
      open={!!errors && true}
      centered
      footer={null}
      destroyOnClose
      closable={false}
      maskClosable={false}
    >
      <Row gutter={[30, 30]} justify="center">
        <Col span={24} className={styles.errorContent}>
          <Text>{errors?.description}</Text>
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
