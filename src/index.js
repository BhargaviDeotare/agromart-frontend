import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashBoard";
import EditUser from "./user/EditUser";
import Cart from "./core/Cart";
import AdminDashboard from "./user/AdminDashBoard";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth/helper";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";
import UpdateProduct from "./admin/UpdateProduct";
import UserOrders from "./user/UserOrders";
import ViewOrder from "./admin/ViewOrder";
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
const AdminRoute = ({ children }) => {
  if (!(isAuthenticated() && isAuthenticated.user.role === 1)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="user/dashboard" element={<UserDashboard />} />
      <Route path="user/:userId" element={<EditUser />} />
      <Route path="user/orders/:userId" element={<UserOrders />} />
      <Route path="cart" element={<Cart />} />
      <Route path="admin/dashboard" element={<AdminDashboard />} />
      <Route path="admin/create/product" element={<AddProduct />} />
      <Route path="admin/products" element={<ManageProducts />} />
      <Route path="admin/orders" element={<ManageOrders />} />
      <Route
        path="admin/product/update/:productId"
        element={<UpdateProduct />}
      />
      <Route path="admin/view/order/:orderId" element={<ViewOrder />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
