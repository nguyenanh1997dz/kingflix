import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'aos'
import 'aos/dist/aos.css'
import { store } from "./Redux/store";
import {Provider} from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </Provider>
)
