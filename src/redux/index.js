import { configureStore } from '@reduxjs/toolkit'

import userInfoReducer from './store/user-info'
import getUserInfoReducer from './store/get-user-info'

const store = configureStore({
  reducer: { userInfo: userInfoReducer, getUserInfo: getUserInfoReducer }
})

export default store
