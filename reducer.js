

var demo = function (state = {
  user: null,


  counter: 1,

  loading: false,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null
}, action) {


  // * An *action* is a plain object that represents an intention to change the
  //* state. Actions are the only way to get data into the store.
  //* Actions must have a `type` field that indicates the type of action being* performed.
  switch (action.type) {
    case "LOADER": {
      console.log("here login")

      state["loading"] = false


      return state

    }
    case "LOGIN": {
      console.log("here login")
      state = { ...state }
      state["isloggin"] = true
      state["user"] = action.payload

      return state

    }
    case "LOGIN_SUCCESS": {
      console.log("here login login success saga")
      state = { ...state }
      state["isloggin"] = true
      state["isfetching"] = false
      state["islogginerror"] = false
      state["user"] = action.payload
      state["cart"] = [state.cart, action.payload];

      return state

    }
    case "LOGIN_FAILURE": {
      console.log("here login failure")
      state = { ...state }

      state["isfetching"] = false
      state["islogginerror"] = true

      return state

    }

    case "SETUSER": {
      console.log("here initial user")
      state = { ...state }
      state["isloggin"] = true
      state["user"] = action.payload

      return state

    }
    case "UPDATE_CART": {
      state = { ...state }
      state["updatecart"] = action.payload
      return state
    }
    case "ADD_CART": {
      state = { ...state };
      console.log("state in ADD_CART = ", state)
      state["cart"] = [state.cart, action.payload];
      state["total"] = state.total + action.payload.price;
      return state;
    }
    case "CART": {

      state = { ...state }
      state["cart"] = action.payload
      state["total"] = action.total;
      console.log("here we have to write logic for cart", state["cart"])
      return state
    }

    case "LOGOUT": {
      console.log("here logout")
      state = { ...state }
      localStorage.clear()
      delete state["user"]
      delete state["isloggin"]


      return state

    }
    case "SHOP_REMOVE_PRODUCT": {
      console.log("here remove item")
      state = { ...state }
      state["isloggin"] = true
      state["cakeid"] = action.payload
      delete state["cakeid"]



      return state

    }

    case "ADD_ADDRESS":
      {
        console.log("Here we have to ADD_ADDRESS ", state)
        state = { ...state }
        state["username"] = action.payload.name;
        state["phone"] = action.payload.phone;
        state["pincode"] = action.payload.pincode;
        state["city"] = action.payload.city;
        state["address"] = action.payload.address;




        console.log("after adding address state = ", state);

        return state;

      }
    case "CHECKOUT_STAGE":
      {
        console.log("Here we have to CHECKOUT_STAGE ", state)
        state = { ...state }
        state["counter"] = action.counter

        console.log("after incrementing counter = ", state);

        return state;
      }


    case "PLACE_ORDER":
      {
        console.log("Here we have to write logic for PLACE_ORDER")
        state = { ...state }


        state["isorderfetch"] = true

        return state
      }

    case "PLACE_ORDER_SUCCESS":
      {
        state = { ...state }
        state["success_msg"] = action.success_msg
        state["isorderfetch"] = false
        console.log("After PLACE_ORDER state =", state)
        return state
      }

    case "ORDER_DETAILS":
      {
        console.log("oprder reducer", state)
        state = { ...state }
        state["isorderdetailsfetch"] = true
        console.log("Before ORDER_DETAILS state =", state)

        return state
      }
    case "ORDER_DETAILS_SUCCESS":
      {
        state = { ...state }
        state["isorderdetailsfetch"] = false
        state["error_orderDetails"] = ""
        state["cake_orders"] = action.payload
        console.log("After ORDER_DETAILS state =", state)

        return state
      }
    case "ORDER_DETAILS_FAILURE":
      {
        state = { ...state }
        state["isorderdetailsfetch"] = false
        state["error_orderDetails"] = action.orderDetailsError
        console.log("After ORDER_DETAILS state =", state)

        return state
      }

    default: return state
  }
}

export default demo