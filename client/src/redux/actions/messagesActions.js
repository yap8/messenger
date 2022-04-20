import { requestReset, setError, setMessage } from "./requestActions"
import { MESSAGES_FETCH_MESSAGES } from "./types"
import api from "../../api"

export const fetchMessages = (chatId) => async dispatch => {
  try {
    const { data } = await api.get(`/api/messages/${chatId}`)

    dispatch({
      type: MESSAGES_FETCH_MESSAGES,
      payload: data
    })
  } catch (error) {
    dispatch(setError(true))
    dispatch(setMessage(error.response.data))
  } finally {
    dispatch(requestReset())
  }
}
