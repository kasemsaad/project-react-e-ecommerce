const changecart = (payload) => {
    return {
      type: "CHANGE_CART",
      payload
    };
  };
  
  const changefavourit = (payload) => {
    return {
      type: "CHANGE_CFAVOURT",
      payload
    };
  };
  
  export { changecart, changefavourit };
  