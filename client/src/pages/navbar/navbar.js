import React from "react";
import "./navbar.scss";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate=useNavigate()

  return (
    <nav className="navbar">
      <ul className="navbar__menu">
        <li>
          <a href="/add">Add</a>
        </li>
        <li>
          <a href="/view">View</a>
        </li>
        <li>
          <a href="/view">Edit</a>
        </li>
        <li>
          <a href="/view">Delete</a>
        </li>
        <li>
          <a
            href="/view"
            onClick={(e) => {
              e.preventDefault();
              localStorage.clear("profile");
              navigate("/");
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
