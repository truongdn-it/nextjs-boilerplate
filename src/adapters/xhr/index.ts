import axios from 'axios'
import { stringify } from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL

const sendGet = async ({ uri, params }: IXhr) => {
  const stringParams = stringify(params, { arrayFormat: 'repeat' })

  try {
    const response = await axios({
      url: `${uri}?${stringParams}`,
      method: 'GET',
    })
    return response
  } catch (err: unknown) {
    throw err
  }
}

const sendPost = async ({ uri, params, signal, config }: IXhr) => {
  try {
    const response = await axios({
      url: uri,
      method: 'POST',
      data: params,
      signal,
      ...config,
    })
    return response
  } catch (err: unknown) {
    throw err
  }
}

const sendPut = async ({ uri, params }: IXhr) => {
  try {
    const response = await axios({
      url: uri,
      method: 'PUT',
      data: params,
    })
    return response
  } catch (err: unknown) {
    throw err
  }
}

const sendDelete = async ({ uri, params }: IXhr) => {
  try {
    const response = await axios({
      url: uri,
      method: 'DELETE',
      data: params,
    })
    return response
  } catch (err: unknown) {
    throw err
  }
}

export { sendGet, sendPost, sendPut, sendDelete }
