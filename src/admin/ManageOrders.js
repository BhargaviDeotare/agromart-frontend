import React, { useState, useEffect } from "react";
import {
  getOrders,
  getOrderStatus,
  updateOrderStatus,
} from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

import { Link } from "react-router-dom";

const ManageOrders = ({ match }) => {
  const [values, setValues] = useState({
    orders: [],
    error: false,
    newStatus: "",
  });
  const { orders, error, newStatus } = values;
  const { user, token } = isAuthenticated();

  const preload = (userId) => {
    getOrders(userId, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          setValues({ ...values, orders: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getOrderStatus(user._id, token)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: true });
        } else {
          setValues({ ...values, orderStatus: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSelectOptions = (id) => {
    var select = document.getElementById(id);
    var value = select.options[select.selectedIndex].value;
    return value;
  };
  useEffect(() => {
    preload(user._id);
  }, []);

  return (
    <Base title="" description="">
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Transaction Id</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>

                <td>{order.createdAt}</td>
                <td>{order.amount}</td>
                <td>{order.transaction_id}</td>
                <td>{order.status}</td>

                <td>
                  <Link
                    className="btn btn-outline-warning "
                    to={`/admin/view/order/${order._id}`}
                  >
                    <span className="">View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default ManageOrders;
