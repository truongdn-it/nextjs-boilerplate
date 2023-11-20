import HttpClient from '@services/http';
import { API_ROUTES } from '@utils/constants/common.constant';

const Http = new HttpClient();

const doGetTask = () => {
  return Http.sendGet({
    url: API_ROUTES.GET_TASKS,
  });
};

export { doGetTask };
