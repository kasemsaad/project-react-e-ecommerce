import React, { useContext } from 'react';
import { CartContext } from '../views/cartContext';

function ShoppingCart() {
  const { cart, addItemToCart, subtractItemFromCart,removeItemFromCart, getTotalPrice, getCartItemsCount } = useContext(CartContext);

  if (!cart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
          <div className="product-list">
            {cart.map((product) => (
              <div key={product.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <button className="btn btn-primary" onClick={() => addItemToCart(product)}>Add to Cart</button>
                  <button className="btn btn-primary" onClick={() => subtractItemFromCart(product)}>remove Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="cart-summary">
            <h2>Cart ({getCartItemsCount()})</h2>
            <ul className="list-group">
              {cart.map((item) => (
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
