
import { Link, withRouter } from "react-router-dom"
import { useState } from "react/cjs/react.development";
import { connect } from "react-redux";
import { faShoppingCart, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"

const shoppingcartIcon = <FontAwesomeIcon icon={faShoppingCart} />
const searchIcon = <FontAwesomeIcon icon={faSearch} />

function Navbar(props) {


  //var [search, setSearch]= useState('')
  var count = 0;
  let search = function (event) {
    event.preventDefault()

    var url = "/search?searchtext=" + document.getElementById('txtsearch').value;
    props.history.push(url)
    // console.log("search happen",event)
    // count++
    // alert(count)
  }
  let onLogin = () => {
    // props.loginstatus(true)
  }

  var logout = (event) => {
    event.preventDefault()
    props.dispatch({
      type: "LOGOUT"
    })
    props.history.push("/")
  }

  useEffect(() => {
    var token = localStorage.token
    var baseurl = process.env.REACT_APP_BASE_URL;
    var apiurl = baseurl + '/api/cakecart'
    axios({
      method: 'post',

      // url: 'https://apibyashu.herokuapp.com/api/cakecart',
      url: apiurl,
      headers: {
        authtoken: token
      }
    }).then((response) => {

      props.dispatch({
        type: "CART",
        payload: response.data.data
      })

      props.dispatch({
        type: "UPDATE_CART",
        payload: true
      })

    }, (error) => {
      console.log("error from get user details api", error)
    })
  }, [props?.updatecart])
  // let onLogout=()=>{
  //     props.loginstatus(false)
  // }
  // console.log("loginstatus" , props.loginstatus );
  let orderDetails = function () {
    console.log("place order function")
    props.dispatch({
      type: "ORDER_DETAILS"

    })
    props.history.push("/myorderdetails")
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/"><a class="navbar-brand" >MycakeShop</a></Link>
        {/* {props.user &&<label> Hello {props.user}</label>} */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">

            <li class="nav-item">
              {props.user && <label >
                Welcome {props.user}!
      </label>}
              {/* {props.user &&<a class="nav-link disabled" >
      Welcome {props.user}
      </a>} */}
            </li>
            <li> <button class="btn btn-primary my-2 my-sm-0" onClick={orderDetails} >
              My Orders <FontAwesomeIcon icon={faShoppingBag} /> </button></li>
          </ul>
          <div class="navseacrh">
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="txtsearch" />
              <button onClick={search} class="btn btn-outline-success my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faSearch} /></button>

              {props.loginstatus ?
                <div>
                  <Link to="/cart"><button class="btn btn-warning my-2 my-sm-0" type="submit">
                    <FontAwesomeIcon icon={faShoppingCart} /> <b>{props.cart?.length}</b></button></Link>

                  {/* <Link to="/shoppingcart"><button  class="btn btn-warning my-2 my-sm-0" type="submit">
      <FontAwesomeIcon icon={faShoppingCart} /></button></Link> */}

                  <button className="btn btn-danger " onClick={logout}>logout</button>
                </div> : <div>

                  <Link to="/login"><button className="btn btn-primary " onClick={onLogin}>login</button></Link>
                </div>}
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

Navbar = withRouter(Navbar)
//map state to props=state ko component ki property k sath map krna
export default connect(function (state, props) {
  console.log("state prop", state)
  return {
    user: state && state?.user?.name,

    cart: state?.cart,
    updatecart: state?.updatecart,
    loginstatus: state && state["isloggin"]
  }
})
  (Navbar)