import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addedToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  let navigate = useNavigate();
  const cardTitle = product ? product.name : "Product Photo";
  const cardDescription = product ? product.Description : "Default Description";
  const cardPrice = product ? product.price : "Default Price";

  const getARedirect = (redirect) => {
    if (redirect) {
      navigate("/cart");
    }
  };
  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };
  const showAddToCart = (addedToCart) => {
    return (
      addedToCart && (
        <div className="col-12">
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    //
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product}></ImageHelper>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹{cardPrice}</p>
        <div className="row">
          {showAddToCart(addedToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
