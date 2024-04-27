import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../views/pagination";
import Footer from '../components/Footer';
import { useSelector} from "react-redux";

function Shopping() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(9);
  
  const dispatch = useDispatch();

  const datarducer = useSelector((state) => state.shop);
  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  
  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

//////////// pagination
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;
  const currentPosts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
//////////get products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
          setProducts(data.products);
      })
  }, []);

////////add to favourit , cart and Check
  const addrduce = (op, key) => {
    const isAlreadyInFavourites = datarducer.favourit_data.some(item => item.id === op.id);
    const isAlreadyInCart = datarducer.cart_data.some(item => item.id === op.id);
  if(key==="CHANGE_FAVOURIT"){
    if (!isAlreadyInFavourites ) {
      dispatch({
        type: key,
        payload: JSON.stringify(op)
      });
    }
  }
  if(savedUserData){
  if(key==="CHANGE_CART"){
    if (!isAlreadyInCart ) {
      dispatch({
        type: key,
        payload: JSON.stringify(op)
      });
    }
  }}
  };

////////////search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

////////front
  return (
    <div className="w-100">
    <div
      className="card-container pt-5 pagination-container d-flex justify-content-center "
      style={{ textDecoration: "none" }}
    >
      <div className="search-container mb-3 w-50">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {currentPosts.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card no-underline p-2 w-100">
              <Link
                to={`/getProduct/${product.id}`}
                className="no-underline text-dark"
              >
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
              <button
                className="btn"
                onClick={() =>addrduce(product,"CHANGE_FAVOURIT")} 
              >
                <FontAwesomeIcon icon={faHeart}  style={{ color: "red" }} /> Add to Favorites
              </button>
              <button className="btn" onClick={() => addrduce(product,"CHANGE_CART")}>
                <FontAwesomeIcon icon={faShoppingCart}  style={{ color: "rgba(116, 196, 181, 0.953)" }} /> Add to Cart
              </button>

              <Link to={`/getProduct/${product.id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPosts={filteredProducts.length}
        postsPerPage={postPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
<Footer/>
    </div>


  );
}

export default Shopping;
