
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { faShoppingCart, faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { Link, useRouteMatch, Route, withRouter } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function CartSummary(props) {

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
      })
      .catch((error) => console.log(error));
  }, [props.token]);
  let cartsummary = function () {
    props.dispatch({
      type: "CHECKOUT_STAGE",
      counter:1
    })
    props.history.push("/checkout/address")

  }

  return (
    <div className="container">
      <h4
        style={{
          margin: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          paddingBottom: "10px",
          padding: "10px",
        }}
      >
        Your Cart Details <FontAwesomeIcon icon={faShoppingCart} />
      </h4>
      <div className="col-md-12 customcardsec">
        <div className="row">
          {cartDetails?.length > 0 ? (
            <>

              {cartDetails.length > 0 &&
                cartDetails.map((cart, index) => {
                  return (
                    <div className="card cardcustom" key={index} style={{ padding: "10px 40px 10px 40px" }}>
                      <img className="card-img-top " src={cart.image} style={{
                        width: "124px",
                        height: "116px",
                        margin: "auto",
                        padding: "10px"
                      }} alt="Card image cap" />

                      <h5 style={{ fontSize: "14px" }} className="card-title"><strong>{cart.name}</strong></h5>
                      <h6 className="card-title"><FontAwesomeIcon icon={faRupeeSign} />{cart.price}</h6>

                    </div>
                  )
                }
                )}</>
          ) : (
            <div className="alert alert-warning container" role="alert">
              <h4 className="alert-heading" style={{ textAlign: "center" }}>
                CART IS EMPTY!    Please login....
            </h4>

            </div>
          )}



        </div>
        <div className="placeorderbtn">
          <button class="btn btn-primary" onClick={cartsummary} type="submit">Place Order</button>
        </div>
      </div>
    </div>
  );


}


CartSummary = withRouter(CartSummary)

export default connect(function (state, props) {
  return {
    token: state?.user?.token,
    cart: state?.cart?.data,
    updatecart: state?.updatecart,
    counter: state?.counter
  };
})(CartSummary);