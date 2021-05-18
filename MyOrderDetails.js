import { connect } from "react-redux";
import { Link, withRouter } from "react-router";
import { useState, useEffect } from 'react';
import './index.css';
import { faShoppingCart, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function MyOrderDetails(props) {
  //useEffect((console.log("props for cake_orders = ",props.cake_orders)), []);
  return (

    <div>
      <br />
      <div className="customorderheading">
        <h3>
          My Orders <FontAwesomeIcon icon={faShoppingBag} />
        </h3>
      </div>
      <br />
      <div className="row" style={{ padding: "10px" }}>
        {props.myOrder?.length > 0 ? (
          <div className="myordercustom">
            <div className="container">
              <table className="table table-hover">
                <thead className="bg-dark text-white">
                  <th className="text-center">Image</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Status</th>
                </thead>

                <tbody>
                  {props.myOrder.map((data, index) => {
                    return data.cakes.map((cake, index1) => {
                      return (
                        <tr key={Math.random().toString()} >
                          <td className="text-center">
                            <img
                              className="media-object"
                              src={cake?.image}
                              style={{ width: "50px", height: "50px" }}
                              alt="..."
                            />
                          </td>
                          <td className="text-center">
                            <p
                              className="media-heading"
                              style={{ wordBreak: "break-all" }}
                            >
                              <strong>{cake?.name}</strong>
                            </p>
                          </td>
                          <td className="text-center">
                            <strong>${cake.price}</strong>
                          </td>
                          <td className="text-center">
                            <strong>{cake.quantity}</strong>
                          </td>
                          <td className="text-center">
                            <strong>{data?.pending ? "Pending" : "Completed"}</strong>
                          </td>
                        </tr>
                      );
                    });

                  })}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <div className="alert alert-warning container" role="alert">
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              {props.error_orderDetails}!
            </h4>
            <hr />
            <div style={{ textAlign: "center" }}>
              <h5 >
                place some order <FontAwesomeIcon icon={faShoppingBag} />
                <br />
                <br />
                {!props?.token && " Please Login!"}
              </h5>

              {/* <p className="mb-0">
              {!props?.token && ", Please Login!"}
              </p> */}
            </div>
          </div>
        )}
      </div></div>
  )
}

export default connect(function (state, props) {
  console.log("state?.cake_orders ", state?.cake_orders)

  return {
    token: state?.user?.token,
    myOrder: state?.cake_orders,
    cart: state?.cart,
    error_orderDetails: state?.error_orderDetails
  };
})(withRouter(MyOrderDetails));