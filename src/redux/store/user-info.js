import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  email: null,
  avatar: null,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  isDisabled: false,
  isVerified: false,
  isVerifiedToTeach: true,
  createdAt: null,
  isAdmin: null,
  teacherInfo: {
    // teacher info field
  },
  doesGoogleGrantAccess: false,
  isLoggedinWithSocialAccount: false
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload
    },
    setVerification(state, action) {
      state.isVerified = action.payload
    },
    setUserInfo(state, action) {
      state.isAuthenticated = true
      state.email = action.payload.email
      state.avatar = action.payload.avatar
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.dateOfBirth = action.payload.dateOfBirth
      state.isDisabled = action.payload.isDisabled
      state.isVerified = action.payload.isVerified
      state.isVerifiedToTeach = action.payload.isVerifiedToTeach
      state.createdAt = action.payload.createdAt
      state.isAdmin = action.payload.isAdmin
      state.mobilePhone = action.payload.mobilePhone
      state.nationality = action.payload.nationality
      state.identityNumber = action.payload.identityNumber
      state.grade = action.payload.grade
      state.doesGoogleGrantAccess = action.payload.doesGoogleGrantAccess
      state.isLoggedinWithSocialAccount =
        action.payload.isLoggedinWithSocialAccount
    },
    addTeacherInfo(state, action) {
      // update teacher info to info if need
    },
    updateUserInfo(state, action) {
      state = { ...state, ...action.payload }
    },
    logOutUser(state) {
      state.isAuthenticated = false
      state = initialState
    },
    setGoogleGrantAccess(state, action) {
      state.doesGoogleGrantAccess = action.payload
    }
  }
})

export const userActions = userInfoSlice.actions
export default userInfoSlice.reducer
