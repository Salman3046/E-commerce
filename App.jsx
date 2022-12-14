import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Connection from './Connection'
import store from "./Store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'
import { UserAuthContextProvider } from './FrontendScreen/Auth/Context/UserAuthContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // this code is used for font style of mui components
  const theme = createTheme({
    typography: {
      fontFamily: [
        'poppins'
      ].join(','),
    },
  });

  return (
    <>
      <UserAuthContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Provider store={store}>
              <Connection />
            </Provider>
          </BrowserRouter>
        </ThemeProvider>
      </UserAuthContextProvider>
      <ToastContainer
            position="top-right"
            theme="colored"
            limit={2}
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
  )
}

export default App
