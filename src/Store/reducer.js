const INITIAL_STATE = {
  userData:[],
  cart: 0,
  cart_data: [],
  favourit: 0,
  favourit_data: []
};

function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CHANGE_FAVOURIT":
      const parsedItem = JSON.parse(decodeURIComponent(action.payload));
      let existingFavourites = JSON.parse(localStorage.getItem("favourit")) || [];
      existingFavourites.push(parsedItem);
      localStorage.setItem("favourit", JSON.stringify(existingFavourites));
      const updatedFavourites = [...state.favourit_data, parsedItem];
      return {
         ...state,
         favourit: updatedFavourites.length,
         favourit_data: updatedFavourites
      };
    case "CHANGE_CART":
      const parsedCartItem = JSON.parse(decodeURIComponent(action.payload));
      let existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      existingCartItems.push(parsedCartItem);
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      const updatedCart = [...state.cart_data, parsedCartItem];
      return {
         ...state,
         cart: updatedCart.length,
         cart_data: updatedCart
      };
      case "REMOVE_FAVOURIT":
        const removedItemId = action.payload;
        const updatedFavouritess = state.favourit_data.filter(item => item.id !== removedItemId);
        localStorage.setItem("favourit", JSON.stringify(updatedFavouritess)); // Update localStorage
        return {
          ...state,
          favourit: updatedFavouritess.length,
          favourit_data: updatedFavouritess
        };
       case "REMOVE_CART":
        const removedItemIdd = action.payload; 
        const updatedCartt = state.cart_data.filter(item => item.id !== removedItemIdd);
        localStorage.setItem("cart", JSON.stringify(updatedCartt)); // Update localStorage
        return {
            ...state,
            cart: updatedCartt.length,
            cart_data: updatedCartt
          };
    default:
      return state;
  }
}

export default shopReducer;
