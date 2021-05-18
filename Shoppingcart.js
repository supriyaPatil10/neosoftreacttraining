import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


var shoppingCart = {
  width: "750px",
  height: "auto",
  margin: "5em auto",
  background: "#FFF",
  boxShadow: "1px 2px 3px 0px rgba(0,0,0,0.10)",
  borderRadius: "0.5em",

  display: "flex",
  flexDirection: "column"
}
var title = {
  height: "3.75em",
  borderBottom: "1px solid #E1E8EE",
  paddingTop: "27px",
  color: "#5E6977",
  fontSize: "1.125em",
  fontWeight: "400"
}


var image = {
  marginRight: "50px"
}
var description = {
  paddingTop: "10px",
  marginRight: "60px",
  width: "115px"
}
function Cart(props) {

  let [cakedetails, setCakedetails] = useState({})

  // alert(params.cakeid)

  useEffect(() => {
    var token = localStorage.token
    var baseurl = process.env.REACT_APP_BASE_URL;

    let cakedetailsapi = baseurl + "/api/cakecart"

    // let cakedetailsapi = "https://apibyashu.herokuapp.com/api/cakecart"
    axios({

      method: "post",
      headers: { authtoken: token },
      url: cakedetailsapi
    }).then((response) => {
      console.log("response from cart cake api>>>>", response.data)
      setCakedetails(response.data.data)

      props.dispatch({
        type: "UPDATE_CART",
        payload: response.data
    })
    props.dispatch({
        type: "CART",
        payload: response.data.data,

      });

    }, (error) => {
      console.log("response from  cake cart details api", error)
    })
  }, [props.token])



  return (
    <div>
      {/* cart page */}


      <div className={{ shoppingCart }}>


        {/* <div className="container mt-4">
      <div class="card bg-light text-dark">
    <div class="card-body"> */}

        <div className="col-sm-12 col-md-12 col-md-offset-1 container">
          <table className="table table-hover">
            <tbody>
              {cakedetails?.length > 0 &&
                cakedetails.map((cart, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
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
                        <strong>{cart.weight}</strong>
                      </td>
                      <td className="text-center">
                        <button type="button" className="btn btn-danger">
                          <span className="glyphicon glyphicon-remove"></span>{" "}
                          {/* Remove */}
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                    //   <div className="row">

                    //  <div className="col-md-3">

                    //  <div className={{image}}>
                    //         <img src={cart?.image} alt="" style={{ width: "72px", height: "72px" }}/>
                    //       </div>
                    //      </div>
                    //      <div className="col-md-3">
                    //      <div className={cart?.name}>
                    //         <span style={
                    //             {
                    //               paddingTop: "27px",
                    //               display: "block",
                    //               fontSize: "1em",
                    //               color: "#43484D",
                    //               fontWeight: "400"
                    //             }
                    //         }> {cakedetails.cakeid}</span>

                    //       </div>
                    //      </div>
                    //      <div className="col-md-3">
                    //      <div style={
                    //             {
                    //               paddingTop: "27px",
                    //               display: "block",
                    //               fontSize: "1em",
                    //               color: "#43484D",
                    //               fontWeight: "400"
                    //             }
                    //         }>
                    //      {cart.weight}
                    //     </div>
                    //      </div>
                    //      <div className="col-md-3">
                    //      <div style={{
                    //            width: "83px",
                    //            paddingTop: "27px",
                    //            textAlign: "center",
                    //            fontSize: "1em",
                    //            color: "#43484D",
                    //            fontWeight: "300"
                    //       }}>${cart.price}
                    //       </div>
                    //      </div>



                    //      </div>


                  );
                })}
            </tbody>
          </table>
          {/* </div>
  </div> */}

        </div>





      </div>
    </div>




  )
}

export default Cart