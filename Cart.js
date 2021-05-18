import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { faShoppingCart, faTrash,faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import swal from 'sweetalert';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Cart(props) {
  ///addcaketocart
  //post
  //data: - cakeid,name,image,price,weight
  ///cakecart
  //{}
  const [cartDetails, setcartDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {

    var baseurl  = process.env.REACT_APP_BASE_URL;
    let detailsapiurl = baseurl+"/api/cakecart";


    // let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {},
      headers: {
        authtoken: props.token,
      },
    })
      .then((response) => {
        console.log("cart data", response.data);
        setcartDetails(response.data.data);
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        setTotalPrice(total);
        props.dispatch({
          type: "CART",
          payload: response.data,
          total: total
        })
      })
      .catch((error) => console.log(error));
  }, [props.token]);


  let RemoveFromCart = function (cakeid) {

    console.log("in remove cart", localStorage)
    console.log("in remove cart cakedetails >>are>>", cartDetails)
    console.log("in remove cart", cakeid)
    var email = cartDetails.email

    
    var baseurl  = process.env.REACT_APP_BASE_URL;
    let apiurl = baseurl+"/api/removecakefromcart"

    // let apiurl = "https://apibyashu.herokuapp.com/api/removecakefromcart"
    var token = localStorage.token
    axios({
      url: apiurl,
      method: "post",
      headers: { authtoken: token },
      data: { email, cakeid }
    }).then((response) => {
      console.log("remove from Cart => ", response.data)
      props.dispatch({
        type: "SHOP_REMOVE_PRODUCT",
        payload: response.data
      })
      if (response.data.message = "Removed  item from cart") {
       // alert("Item Removed from cart")
        swal({
          title: "Done!",
          text: "Item Removed from cart..",
          icon: "success",
          timer: 8000,
          button: true
        })
        window.location.reload('/cart');

        //props.history.push('/cart');
      } else {
        alert("error")
      }

    }, (error) => {
      console.log("api Error", error)
      // setError("Invalid Login")
    })

  }

  return (
    
    <div >
      <br/>
      <div className="customheading">
      <h3 >
        Your Cart <FontAwesomeIcon icon={faShoppingCart} />
      </h3>
      </div>
      <br/>
      <div className="row" style={{ padding: "80px" }}>
        {cartDetails?.length > 0 ? (
          <>
            <div className="col-sm-12 col-md-12 col-md-offset-1 container">
              <table className="table table-hover">
                <tbody>
                  <tr className="text-white bg-dark">
                    <td className="text-center">
                      <h4 className="media-heading">
                        Image
                  </h4>
                    </td>
                    <td className="text-center">
                      <h4 className="media-heading">
                        Name
                    </h4>
                    </td>
                    <td className="text-center">
                      <h4 className="media-heading">
                        Price
                    </h4>
                    </td>
                    <td className="text-center">
                      <h4 className="media-heading">
                        Weight
                    </h4>
                    </td>
                    <td className="text-center">
                      <h4 className="media-heading">
                        Remove
                    </h4>
                    </td>
                  </tr>
                  {cartDetails?.length > 0 &&
                    cartDetails.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center ">
                            <img
                              className="media-object"
                              src={cart?.image}
                              style={{ width: "72px", height: "72px" }}
                            />{" "}
                          </td>
                          <td className="text-center">
                            <div className="media-body">
                              <h4 className="media-heading">
                                <a>{cart?.name}</a>
                              </h4>
                            </div>
                          </td>
                          <td className="text-center">
                            <strong>${cart.price}</strong>
                          </td>
                          <td className="text-center">
                            <strong>{cart.weight}KG</strong>
                          </td>
                          <td className="text-center">
                            <button type="button" className="btn btn-danger" onClick={() => RemoveFromCart(cart.cakeid)}>
                              <span className="glyphicon glyphicon-remove"></span>{" "}
                              {/* Remove */}
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4 col-md-4" style={{ float: "right", margin: "auto" }}>
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Total Item <br /> {cartDetails?.length}
                </p>
                <p style={{ textAlign: "center" }}>
                  Total Price <br />$ {totalPrice}
                </p>
              </div>
              <br />
              <Link to="/checkout">
                <button
                  style={{ display: "flex", margin: "auto" }}
                  className="btn btn-success"
                >
                  Checkout
              </button></Link>
            </div>
          </>
        ) : (
          <div className="alert alert-warning container" role="alert">
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              CART IS EMPTY!
            </h4>
            <hr />
            <div style={{ textAlign: "center" }}>
            <FontAwesomeIcon icon={faBirthdayCake} style={{fontSize: "50px"}}/><br/>
            <br/> <h5 >
                To add some cake to cart 
                <br/>
                {!props?.token && " Please Login!"}
              </h5>

              
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(function (state, props) {
  return {
    token: state?.user?.token
  };
})(Cart);