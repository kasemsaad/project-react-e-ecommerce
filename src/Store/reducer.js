const INITIAL_STATE = {
    cart: (JSON.parse(localStorage.getItem("cart")) || []).length,
    cart_data: JSON.parse(localStorage.getItem("cart")) || [],
    favourit: (JSON.parse(localStorage.getItem("favourit")) || []).length,
    favourit_data: JSON.parse(localStorage.getItem("favourit")) || []
  };
  
  function shopReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "CHANGE_CART":
        return {
          ...state,
          cart: action.payload,
          cart_data: action.payload
        };
      case "CHANGE_CFAVOURT":
        return {
          ...state,
          favourit: action.payload,
          favourit_data: action.payload
        };
      default:
        return state;
    }
  }
  
  export default shopReducer;
  