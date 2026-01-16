import {BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import {Toaster} from './components/ui/toaster'
import store from './store/store.js'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>,
)
