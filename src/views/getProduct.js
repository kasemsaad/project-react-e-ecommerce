import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function GetProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          console.log("Product fetched:", data);
          setProduct(data);
        } else {
          console.error("Data fetched is not a product:", data);
        }
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pt-4 d-flex justify-content-center alin-item-center">
    <div className="row">
      <div className="col-md-8">
        <div className="product-details">
          <h1>{product.title || "Unknown title"}</h1>
          {product.images && (
            <img src={product.images[0]} alt={product.title} className="img-fluid"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "20px",
            }}
            />
          )}
          <h3>Description</h3>
          <p>{product.description || "Unknown description"}</p>
        </div>
      </div>
      <div className="col-md-4">
       
        <Link to={`/`} className="btn btn-dark mt-3 ms-3" style={{textdecoration: "none"}}>
          Shopping
        </Link>
      </div>
    </div>
  </div>
  );
}

export default GetProduct;
