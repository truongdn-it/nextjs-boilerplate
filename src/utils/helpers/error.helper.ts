import { NotificationInstance } from 'antd/es/notification/interface';
import { AxiosError } from 'axios';

const errorHandler = (error: unknown, notification: NotificationInstance) => {
  const descMsg =
    error instanceof AxiosError
      ? error?.response?.data?.error
      : 'Some thing went wrong!';

  const errMsg =
    error instanceof AxiosError
      ? error?.response?.statusText
      : 'Some thing went wrong!';
  notification.error({
    message: errMsg,
    description: descMsg,
  });

  return false;
};

export { errorHandler };
