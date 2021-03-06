import { THEME_SET_THEME } from "../actions/types"

const initialState = localStorage.getItem('theme')

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_SET_THEME:
      return action.payload
    default:
      return state
  }
}

export default themeReducer
