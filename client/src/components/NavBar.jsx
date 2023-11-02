import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(user, isAuthenticated);
  return (
    <nav>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>welcome {user.username}</li>
            <li>
              <Link to="/add-task">Add task</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
