import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux'
import { ToastContainer } from 'react-toastify'
import AppRouter from './navigation/app-router'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'

// Import Css Here
import './assets/scss/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'].join(
      ','
    )
  }
})

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <AppRouter />
          </Router>
          <ToastContainer
            position="top-right"
            autoClose="5000"
            theme="light"
            limit={5}
          />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App
