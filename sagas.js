import axios from "axios"
import { call, put, takeEvery, all, Redirect } from "redux-saga/effects"


// apifromashu.herokuapp.com
function login(action) {
	var baseurl = process.env.REACT_APP_BASE_URL;

	return axios({
		method: "post",
		url: baseurl + "/api/login",
		data: action.payload
	})
}

function place_order(action) {
	var baseurl = process.env.REACT_APP_BASE_URL;

	var token = localStorage.token
	console.log("palce order api data>>", action.payload)
	return axios({
		method: "post",
		url: baseurl + "/api/addcakeorder",
		data: action.payload,
		headers: {
			authtoken: token
		}
	})
}



function orderDetails(action) {
	var baseurl = process.env.REACT_APP_BASE_URL;

	return axios({
		method: "post",
		url: baseurl + "/api/cakeorders",

		headers: {
			authtoken: localStorage.token
		}
	})
}

function* LoginGenerator(action) {
	var result = yield call(login, action)
	if (result.data.token) {

		yield put({ type: "LOGIN_SUCCESS", payload: result.data }) //call to reducer

		localStorage.token = result.data.token;
		localStorage.email = result.data.email;
		//  redirect: () => push('/')
		// <Redirect to="/"/>  
	}
	else {
		yield put({ type: "LOGIN_FAILURE" })
	}
}
function* OrderGenerator(action) {
	var response = yield call(place_order, action)
	yield put({ type: 'PLACE_ORDER_SUCCESS', success_msg: response.data.messageg })


}

function* OrderDetailsGenerator(action) {
	var res = yield call(orderDetails, action)
	console.log("orderdetailapi", res)
	if (res) {
		yield put({ type: "ORDER_DETAILS_SUCCESS", payload: res.data.cakeorders }) //call to reducer
	}
	else {
		yield put({ type: "ORDER_DETAILS_FAILURE", orderDetailsError: "No Orders currently" })
	}

}

export function* LoginSaga() {
	yield takeEvery("LOGIN", LoginGenerator)


}
export function* OrderSaga() {
	yield takeEvery("PLACE_ORDER", OrderGenerator)
}

export function* OrderDetailsSaga() {
	yield takeEvery("ORDER_DETAILS", OrderDetailsGenerator)
}

export function* RootSaga() {
	yield all([LoginSaga(), OrderSaga(), OrderDetailsSaga()])
}
// import axios from "axios"

// import {all, call, put, takeEvery} from "redux-saga/effects"


// function login(action){

//    return
//     axios({
//         url: "https://apibyashu.herokuapp.com/api/login",
//         method: "post",
//         data: action.paylaod
//     })

// }

// function* LoginGenerator(action){
//     var result= yield call(login,action)
//     if(result.data.token){
//         yield put({type:'LOGIN_SUCCESS',payload:result.data})
//     }
//     else{
//         yield put({type:'LOGIN_FAILURE',payload:result.data})  
//     }
// }

// // export function* LoginSaga(){
// //     yield takeEvery('LOGIN', LoginGenerator)
// // }

// export function* RootSaga(){
//     yield takeEvery('LOGIN', LoginGenerator)
// }