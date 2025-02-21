import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{BrowserRouter} from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'


//looks for root div and injects code inside of it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   
  </StrictMode>,
)
