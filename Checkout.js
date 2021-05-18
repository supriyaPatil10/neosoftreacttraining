import { Link, useRouteMatch, Route, withRouter } from "react-router-dom"
import CartSummary from "./CartSummary"
import Payment from "./Payment"
import Address from "./Address"
import Order from "./Order"
import "./index.css"
import { connect } from "react-redux";


// import {with}from "route-redux"
import Cart from "./Cart"


function Checkout(props) {
    var route = useRouteMatch()
    console.log("....", route)

    var url = route.url
    var path = route.path
    return (
        <div className="row">

            <div className="col-4">

                <ul class="nav flex-column nav-customs" style={{ padding: "80px" }}>




                    <li class="nav-item " >
                        <Link to={url} > <a class="nav-link active" >Cart Summary</a></Link>
                    </li>

                    <li class="nav-item" >
                        {props?.counter >= 1 ? <Link to={url + "/address"} >  <a class="nav-link" >Add Address</a></Link>
                            : <a class="nav-link" >Add Address</a>}</li>
                    <li class="nav-item" >
                        {props?.counter >= 2 ? <Link to={url + "/payment"} >  <a class="nav-link" >Payment</a></Link>
                            : <a class="nav-link" >Payment</a>}
                        {/* <Link to={url + "/payment"} ><a class="nav-link" >Payment</a></Link> */}
                    </li>

                    <li class="nav-item" >
                        {props?.counter >= 3 ? <Link to={url + "/order"} >  <a class="nav-link" >Order details</a></Link>
                            : <a class="nav-link" >Order details</a>}
                        {/* <Link to={url + "/order"} > <a class="nav-link " >Order details</a></Link> */}
                    </li>

                </ul>


            </div>
            <div className="col-8" style={{ padding: "40px" }}>
                <Route path={path} exact component={CartSummary} />
                {props?.counter >= 1 && <Route exact path={path + "/address"} component={Address} />}
                {props?.counter >= 2 && <Route exact path={path + "/payment"} component={Payment} />}
                {props?.counter >= 3 && <Route exact path={path + "/order"} component={Order} />}
                {/* <Route path={path + "/address"} exact component={Address} />
                <Route path={path + "/payment"} exact component={Payment} />
                <Route path={path + "/order"} exact component={Order} /> */}



            </div>
        </div>
    )

}
//export default Checkout
Checkout = withRouter(Checkout)
export default connect(function (state, props) {
    return {

        user: state?.user?.name,
        loginstatus: state?.isloggin,
        counter: state?.counter
    }

})(Checkout)