import logo from './logo.svg';
import './App.css';
import Home from "./Home"
import Navbar from "./Navbar"
import Signup from "./Signup"
import Login from "./Login"
import { useState, useEffect } from 'react';
import Search from "./Search"
import CakeDetails from "./CakeDetails"
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom"
import axios from 'axios';
import { connect } from "react-redux";
import Cart from "./Cart"
import Checkout from "./Checkout"
import Shoppingcart from './Shoppingcart';
import FullPageLoader from './FullPageLoader';
import MyOrderDetails from './MyOrderDetails';
import React, { Suspense } from "react"

function App(props) {


  var SuspendedAdmin = React.lazy(() => import('./Admin'))


  console.log("localStorage ", localStorage, props)

  if (localStorage.token && !props.user) {
    var token = localStorage.token
    var baseurl = process.env.REACT_APP_BASE_URL;
    let apiurl = baseurl + "/api/getuserdetails"

    //let apiurl = "https://apibyashu.herokuapp.com/api/getuserdetails"
    axios({
      url: apiurl,
      method: "get",
      headers: { authtoken: token }
    }).then((response) => {

      console.log("getuserdetails api Response ", response.data)
      props.dispatch({
        type: "SETUSER",
        payload: response.data.data
      })

      props.dispatch({
        type: "CART",
        payload: response.data.data,

      });
    }, (error) => {
      console.log("getuserdetails api Error", error)
      // setError("Invalid Login")
    }, [props.token])
  }

  return (
    <div >
      {/* <FullPageLoader/> */}
      <Router>
        {/* <Navbar user={user} loginstatus={loginstatus}></Navbar> */}
        <Navbar />

        <div >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact  ><Login ></Login></Route>
            <Route path="/signup" exact component={Signup} />
            <Route path="/admin" exact >
              <Suspense fallback={<div>Loading...</div>}>
                <SuspendedAdmin />
              </Suspense>

            </Route>
            <Route path="/search" exact component={Search} />
            {/* { props.user ? */}
            <Route path="/cart" exact component={Cart} />
            <Route path="/myorderdetails" exact component={MyOrderDetails} />
            {/* <Route path="/shoppingcart" exact component={Shoppingcart} /> */}
            <Route path="/checkout" component={Checkout} />
            {/* : ''
       } */}
            <Route path="/cake/:cakeid" exact component={CakeDetails} />
            <Route path="/*" />
            <Redirect to="/"></Redirect>
          </Switch>
        </div>
      </Router>

    </div>



  );
}

//export default connect()(App)
export default connect(function (state, props) {
  return {
    user: state?.user,
    token: state?.token,
    cart: state?.cart
  };
})(App);