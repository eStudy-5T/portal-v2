import { configureStore } from '@reduxjs/toolkit'

import userInfoReducer from './store/user-info'
import getUserInfoReducer from './store/get-user-info'
import dashboardDrawerReducer from './store/dashboard-drawer'

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    getUserInfo: getUserInfoReducer,
    dashboardDrawer: dashboardDrawerReducer
  }
})

export default store
