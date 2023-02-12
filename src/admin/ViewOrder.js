import { Divider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import PrintIcon from "@mui/icons-material/Print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {
  getOneOrder,
  getOrderStatus,
  updateOrderStatus,
} from "../core/helper/orderHelper";
import { useParams } from "react-router-dom";

const UpdateOrder = ({ match }) => {
  const contentArea = useRef(null);
  const token = isAuthenticated() && isAuthenticated().token;
  const user = isAuthenticated().user;
  const [values, setValues] = useState({
    order: [],
    error: "",
    statuss: "",
    productArr: [],
    Status: "",
    reload: false,
  });

  const { order, statuss, productArr, Status, reload } = values;
  let orderid = useParams();
  const preload = (orderId) => {
    console.log(orderId);
    getOneOrder(user._id, token, orderId.orderId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, order: data, productArr: data.products });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(orderid);
  }, [reload]);
  const changeStatusOrder = (event) => {
    console.log(Status);
    updateOrderStatus(user._id, token, match.params.orderId, Status)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    setValues({ ...values, reload: values.reload + 1 });
  };
  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, {
      paperSize: "A4",
      fileName: "Bill.pdf",
      title: "Bill",
      creator: "AgroMart",
      date: new Date(),
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
    //
  };
  return (
    <Base title="" description="" reload={reload}>
      <div ref={contentArea}>
        <div className="text-center">
          <h1 className="text-dark text-center">Tushar water supply </h1>
          <p className="text-dark text-center">
            Shop no 7,ground floor,Om Shivam Aptt CHSL,Gokul Township, Agashi
            Road,Virar(W)-401303
          </p>
        </div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order Id</td>
              <td>{order._id}</td>
            </tr>
            <tr>
              <td>Transaction ID</td>
              <td>{order.transaction_id}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{order.status}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{order.address}</td>
            </tr>
            <tr>
              <td>Contact Number</td>
              <td>{order.contact}</td>
            </tr>

            <tr>
              <td>Products</td>
              <td>
                {productArr.map((prod, index) => (
                  <div key={index}>
                    <p>
                      Product {index + 1} :{prod.name}
                    </p>
                    <p>Price : ₹{prod.price}</p>
                    <p>Count: {prod.count}</p>
                    <Divider />
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>Total Price</td>
              <td>{order.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={handleExportWithFunction} className="btn btn-warning">
        <PrintIcon />
      </button>
      <Divider />
      <form className="table table-dark">
        <table>
          <tr>
            <td className="text-light">Update Status</td>
            <td>
              <select name="stats" id="stats" onChange={handleChange("Status")}>
                <option>Select</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="btn btn-outline-warning"
                onClick={changeStatusOrder}
              >
                Update
              </button>
            </td>
          </tr>
        </table>
      </form>
    </Base>
  );
};

export default UpdateOrder;
