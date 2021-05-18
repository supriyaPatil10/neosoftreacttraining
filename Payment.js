import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

function Payment(props) {

	function continue_checkout() {

		props.dispatch({
			type: "CHECKOUT_STAGE",
			counter: props.counter
		})
		props.history.push("/checkout/order")
	}

	return (
		<div><h2>Payment Mode</h2>
			<br /><br />
			<input type="radio" id="cash" name="cash" value="Cash On Delivery" checked="checked" />
		&emsp; <label for="cash">Cash On Delivery</label>
			<br /><br />
			<button className="btn btn-outline-primary" onClick={continue_checkout}>Next</button>
		</div>
	)
}

Payment = withRouter(Payment)
export default connect(function (state, props) {
	console.log(".... state initially in Payment", state)
	return {
		counter: state?.counter

	}
})(Payment);
