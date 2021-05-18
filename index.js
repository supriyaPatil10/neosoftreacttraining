import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import "jquery/dist/jquery.slim.min"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import dmart from "./reduxstore/store"
import FullPageLoader from './FullPageLoader';

import { Provider } from 'react-redux'
import axios from 'axios';
import { config } from '@fortawesome/fontawesome-svg-core';




// axios.interceptors.request.use((config)=>{

//   alert("axios interceptors")
//   var token=localStorage.token
// if(token){
//   config.headers["authtoken"]=token
// }
// return config
// },(error)=>{

//   alert("error1")
//   Promise.reject(error)
// })

// axios.interceptors.response.use((response)=>{

//   return response
// },(error)=>{
//   alert("error2")
//   Promise.reject(error)
// })




ReactDOM.render(
  <React.StrictMode>
    <Provider store={dmart}>
    <App />
   

    {/* <Loader
        type="ThreeDots" color="#00BFFF" height={80} width={80}
        timeout={3000} //3 secs
      /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
