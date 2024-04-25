import React, { useState, useEffect } from "react";
import Footer from '../components/Footer';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, ] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const parsedData = JSON.parse(localStorage.getItem("cart")) || [];
    setData(Array.isArray(parsedData) ? parsedData : [parsedData]);
  }, []);
  const addQuantity = (item) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const removeQuantity = (item) => {
    const updatedCart = cart.filter((i) => i.id !== item.id);
    setCart(updatedCart);
  };

  const removeItem = (cart, id) => {
    const updatedCart = cart.filter((cart) => cart.id !== id);
    setCart(updatedCart);
    // Remove item's ID from localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

 
  return (
    <div className="pt-5">
      <h1 className="text-center">Shopping Cart</h1>
      <table >
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th >Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td className="text-center">{cart.find((i) => i.id === item.id)?.quantity || 0}</td>
              <td>
                <button className="btn btn-success ms-2" onClick={() => addQuantity(item)}>+</button>
                <button className="btn btn-danger ms-2" onClick={() => removeQuantity(item)}>-</button>
                <button className="btn btn-danger ms-2" onClick={() => removeItem(data, item.id)}>remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <Footer />
    </div>
  );
}

export default ShoppingCart;