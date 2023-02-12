import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = product ? `${API}/product/photo/${product._id}` : null;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "10rem", maxWidth: "10rem" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
