import { sendGet } from '@adapters/xhr'
import { API_ROUTES } from '@utils/constants'

const doGetTask = () => {
  return sendGet({ uri: API_ROUTES.GET_TASKS })
}

export { doGetTask }
