import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux'
import { ToastContainer } from 'react-toastify'
import AppRouter from './navigation/app-router'

// Import Css Here
import './assets/scss/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose="5000"
        theme="light"
        limit={5}
      />
    </Provider>
  )
}

export default App
