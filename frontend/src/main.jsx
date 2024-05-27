import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Adding Chakra */}
    <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AuthContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>,
)
