import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSidebarOpen: true
}

const dashboardDrawerSlice = createSlice({
  name: 'dashboardDrawer',
  initialState,
  reducers: {
    openDrawer(state, action) {
      state.isSidebarOpen = true
    },
    closeDrawer(state) {
      state.isSidebarOpen = false
    }
  }
})

export const dashboardDrawerActions = dashboardDrawerSlice.actions
export default dashboardDrawerSlice.reducer
