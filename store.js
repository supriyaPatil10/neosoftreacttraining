import  {createStore , applyMiddleware} from "redux"
import demo from "./reducer"
import logger from "./middlewares"
import createSaga from "redux-saga"
import {LoginSaga, RootSaga} from "./sagas.js"

var sagaMiddleware = createSaga()

var middlewares = applyMiddleware(logger, sagaMiddleware)
var store = createStore(demo, middlewares)
{
sagaMiddleware.run(RootSaga)
}

//console.log(".........",store.getState())

// store.dispatch(
// {
// 	type:"LOGIN",
// 	payload:{email:"pranalidalvi@gmail.com", name:"Pranali Dalvi"}
// }) //parameters are actions 
//acions are plain js objects with key known as type
// console.log("........ after login match", store.getState())

export default store






// import {createStore} from "redux"
// import demo from "./reducer"

// var store= createStore(demo)

// store.dispatch({

//     type:"login"
// })

// console.log("", store.getState())


// store.dispatch({

//     type:"Login",
//     payload:{email:"spriya.patil92@gmail.com",name:"supriya"}
// })
// // store.dispatch({

// //     type:"Logout",
// //     payload:{email:"spriya.patil92@gmail.com",name:"supriya"}
// // })


// // console.log("", store.getState())


// export default store