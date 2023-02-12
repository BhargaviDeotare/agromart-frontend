import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { isAuthenticated, signout } from "../auth/helper";
import logo from "../logo.svg";

const user = isAuthenticated() && isAuthenticated().user;

const Menu = () => {
  let navigate = useNavigate;
  return (
    <div>
      <ul className="nav nav-tabs bg-dark ">
        <li className="nav-item">
          <Link className="navbar-brand " to="/">
            <img src={logo} alt="brand-logo" width="40" height="40" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link " to="/cart">
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link className="nav-link " to="/user/dashBoard">
              DashBoard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link " to="/admin/dashBoard">
              Admin DashBoard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link " to="/signup">
                SignUp
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to="/signin">
                SignIn
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              SignOut
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default Menu;
