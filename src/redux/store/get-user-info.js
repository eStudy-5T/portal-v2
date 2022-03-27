import { createSlice } from '@reduxjs/toolkit'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'

const initialState = {
  currentLevel: 0,
  role: null,
  isSkipped: false,
  basicInfo: {
    dateOfBirth: null,
    nationality: null,
    grade: null
  },
  subjects: [],
  description: null,
  identifyInfo: {
    profilePicture: null,
    IDNumber: null,
    phoneNumber: null
  }
}

const getUserInfoSlice = createSlice({
  name: 'getUserInfo',
  initialState,
  reducers: {
    goNext: (state, action) => {
      state.currentLevel++
    },
    goBack: (state, action) => {
      state.currentLevel--
    },
    setRole: (state, action) => {
      const role = get(action, 'payload.role')
      if (role) {
        state.role = role
      }
    },
    setIsSkip: (state, action) => {
      const isSkipped = get(action, 'payload.isSkipped', false)
      if (isBoolean(isSkipped)) {
        state.isSkipped = isSkipped
      }
    },
    setBasicInfo: (state, action) => {
      const basicInfo = get(action, 'payload.basicInfo', {})
      if (!isEmpty(basicInfo)) {
        state.basicInfo = basicInfo
      }
    },
    setMajorities: (state, action) => {
      const majorities = get(action, 'payload.majorities', [])
      if (!isEmpty(majorities)) {
        state.majorities = majorities
      }
    },
    setIdentifyInfo: (state, action) => {
      const identifyInfo = get(action, 'payload.identifyInfo', {})
      if (!isEmpty(identifyInfo)) {
        state.identifyInfo = identifyInfo
      }
    },
    setDescription: (state, action) => {
      const description = get(action, 'payload.description')
      if (isString(description)) {
        state.description = description
      }
    },
    getUserInfo: (state) => {
      return state
    },
    clearUserInfo: (state) => {
      state = initialState
    }
  }
})

export const getUserInfoActions = getUserInfoSlice.actions
export default getUserInfoSlice.reducer
