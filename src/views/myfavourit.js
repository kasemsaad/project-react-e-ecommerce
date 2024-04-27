import '../style.css';
import { useDispatch,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Provider } from "react-redux";
import store from "../Store/store";
import Footer from '../components/Footer';

function Myfavourit() {
  const dispatch = useDispatch();
  const datarducer = useSelector((state) => state.shop);
  const storedFavourit = datarducer.favourit_data
  const addrduce = (op, key) => {
  const isAlreadyInCart = datarducer.cart_data.some(item => item.id === op.id);
  if (!isAlreadyInCart ) {
    dispatch({
      type: key,
      payload: JSON.stringify(op)
    })
  }
  };
  const removeFavourit = (itemId) => {
    dispatch({
      type: "REMOVE_FAVOURIT",
      payload: itemId
    });
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
                {/* <h3>ID {product.id}</h3> */}
                <h3>{product.title}</h3>
                <div className=" text-danger p-2">
                  Price $<span>{product.price}</span>
                </div>
              </Link>
              <button className="btn" onClick={() => addrduce(product,"CHANGE_CART")}>
              <FontAwesomeIcon icon={faShoppingCart}  style={{ color: "rgba(116, 196, 181, 0.953)" }} /> Add to Cart
              </button>
              <button className="btn btn-danger " onClick={() => {
                removeFavourit(product.id)
              }}>remove</button>
              <Link to={`/getProduct/${product.id}`} className="btn btn-primary">
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
