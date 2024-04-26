import '../style.css';
import React, {useState} from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { changecart,changefavourit } from "../Store/action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Provider } from "react-redux";
import store from "../Store/store";
import Footer from '../components/Footer';

function Myfavourit() {
  const [cart,setCart] = useState([]);
  
  const storedFavourit = JSON.parse(localStorage.getItem("favourit")) || [];
  const dispatch = useDispatch();


  let counter = (JSON.parse(localStorage.getItem("cart") || "[]").length);
  const countcart = (item) => {
    dispatch(changecart(counter++));
    Con(item);
  };

  let counterfavourit = (JSON.parse(localStorage.getItem("favourit") || "[]").length);
  const countfavourit = (item,id) => {
    dispatch(changefavourit(counterfavourit++));
    removeItem(item,id);
  };
  const Con = (item,key) => {
    try {
      const parsedItem = JSON.parse(decodeURIComponent(item));
      let existingkey = JSON.parse(localStorage.getItem(key)) || [];
      const isItemInCart = existingkey.some(
        (cartItem) => cartItem.id === parsedItem.id
      );
      if (!isItemInCart) {
        existingkey.push(parsedItem);
        localStorage.setItem(key, JSON.stringify(existingkey));
      }
    } catch (error) {
      console.error("Error decoding URI component:", error);
    }
  };
 
  const removeItem = (favourit, id) => {
    const updatedFavourit = favourit.filter((favourit) => favourit.id !== id);
    setCart(updatedFavourit);
    localStorage.setItem("favourit", JSON.stringify(updatedFavourit));
    
  };

  return (
    <Provider store={store}>
    <div className="card-container pt-5 pagination-container d-flex justify-content-center w-100" style={{ textDecoration: "none" }}>
      <div className="row w-100">
        {storedFavourit.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card no-underline p-2 w-100">
              <Link to={`/getProduct/${product.id}`} className="no-underline text-dark">
                <div width={2}>
                  <img
                    className="img"
                    src={product.images[0]}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "20px",
                    }}
                    alt={product.title}
                    width="100"
                  />
                </div>
                <h3>ID {product.id}</h3>
                <h3>{product.title}</h3>
                <div className=" text-danger p-2">
                  Price $<span>{product.price}</span>
                </div>
              </Link>
              <button
                className="btn"
                onClick={() => countcart(JSON.stringify(product))}
                >
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
              <button className="btn btn-danger " onClick={() => {
                countfavourit(storedFavourit, product.id)
              }}>remove</button>
              <Link to={`/getProduct/${product.id}`} className="btn btn-dark">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
              </Provider>
  );
}

export default Myfavourit;
