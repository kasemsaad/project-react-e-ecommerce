import React from "react";
import { Link } from "react-router-dom";
import logo from "../pngegg.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../style.css"
function Navbar1(Props) {
  const countcart = useSelector((state) => state.shop);

  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  const handleLogout = () => {
    localStorage.removeItem("userData","cart","favourit");
  };

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img width={50}
            className="logo"
            src={logo}
            alt="Logo"
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Shop</Link>
            </li>
            {!savedUserData && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/myfavourit">
                Favorites
                <span className="badge bg-danger ms-2">{countcart.favourit}</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li> */}
              </ul>
            </li>
          </ul>
          {savedUserData && (
            <>
              <span className="nav-item pe-2">{savedUserData.username}</span>
              <Link className="nav-link pe-2" onClick={() => handleLogout()}>Logout</Link>
            </>
          )}
          <Link className="nav-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="badge bg-danger ms-2">{countcart.cart}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar1;
