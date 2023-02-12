import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserOrder } from "../core/helper/orderHelper";
import { getUser } from "./helper/userapicalls";

import { useParams } from "react-router-dom";

const UserOrders = ({ match }) => {
  const [values, setValues] = useState({
    purchases: [],
    error: false,
  });
  const { purchases, error } = values;
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const preload = (userId) => {
    console.log(userId);
    getUserOrder(userId, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, purchases: data });
          console.log(purchases);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    preload(userId);
  }, [userId]);

  return (
    <Base title="" description="">
      <div>
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase, index) => (
                <tr>
                  <td>{purchase._id}</td>

                  <td>{purchase.createdAt}</td>
                  <td>{purchase.amount}</td>
                  <td>{purchase.transaction_id}</td>
                  <td>{purchase.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
};

export default UserOrders;
