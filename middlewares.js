

export function FirstMiddleWare(store){
	return function(next){
		return function(action){
			
		}
	}
}

//ES6
let logger = store=>next=>action=>{
	console.log("before action", action.type,  store.getState())

			var  result =  next(action)
			console.log("after action store state is.....", store.getState())
			return result
}

export default logger;
//redux logging
// function FirstMiddleware(store){

//     return function (next){

//         return function(action){

//    console.log("before",store.getState(),action.type)

//    var result= next(action)
//    console.log("....After",store.getState())
//    return result

//         }
//     }
// }

//ES6 syntax


// export let logger=store=>next=>action=>{

//        console.log("before",action.type,store.getState())

//    var result= next(action)
//    console.log("....After",store.getState())
//    return result

// }