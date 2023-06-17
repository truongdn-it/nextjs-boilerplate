import { sendGet } from '@adapters/xhr'
import { API_ROUTES } from '@utils/constants/routes.config'

const doGetTask = () => {
  return sendGet({ url: API_ROUTES.GET_TASKS })
}

export { doGetTask }
