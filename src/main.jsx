import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'react-quill/dist/quill.bubble.css';
import { BrowserRouter } from 'react-router-dom'
import Context from './Context/Context.jsx';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tagsinput/react-tagsinput.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
    </BrowserRouter>
  </StrictMode>,
)
