import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
return (
  <Base title="Home Page" description="Welcome to Tushar water supply">
    <div className="row text-center">
      <h1 className="text-dark">All of Products</h1>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card product={product}></Card>
            </div>
          );
        })}
      </div>
    </div>
  </Base>
);
