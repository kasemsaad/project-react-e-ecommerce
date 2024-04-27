import React, { useContext } from 'react';
import { CartContext } from '../views/cartContext';
import { useSelector} from "react-redux";

function ShoppingCart() {
  const datarducer = useSelector((state) => state.shop);
  const {  addItemToCart, subtractItemFromCart,removeItemFromCart, getTotalPrice, getCartItemsCount } = useContext(CartContext);
  const storedCartItems = datarducer.cart_data

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="product-list">
            {storedCartItems.map((product) => (
              <div key={product.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <button className="btn btn-success mx-1" onClick={() => addItemToCart(product)}>+</button>
                  <span>{product.quantity}</span>

                  <button className="btn btn-warning mx-1" onClick={() => subtractItemFromCart(product)}>-</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="cart-summary">
            <h2>Cart ({getCartItemsCount()})</h2>
            <ul className="list-group">
              {storedCartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item.title}</span>
                  <span>${item.price} x {item.quantity}</span>
                  <button className="btn btn-danger" onClick={() => removeItemFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total: ${getTotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
