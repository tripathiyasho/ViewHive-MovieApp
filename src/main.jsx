import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/Store.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <HashRouter > 
      <App />
      </HashRouter>
    </Provider>
  
)