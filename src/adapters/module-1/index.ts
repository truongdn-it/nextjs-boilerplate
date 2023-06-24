import { sendGet } from '@configs/xhr';
import { API_ROUTES } from '@utils/constants/routes.constant';

const doGetTask = () => {
  return sendGet({ url: API_ROUTES.GET_TASKS });
};

export { doGetTask };
