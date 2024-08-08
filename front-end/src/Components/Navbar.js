import { NavLink } from "react-router-dom";
import "../Components/Navbar.css";
import { useContext } from "react";
import GlobalContext from "../Hooks/GlobalContext";

const Navbar = () => {
  const { loggedIn, setLoggedIn, setAccessToken } = useContext(GlobalContext);

  const Logout = () => {
    setLoggedIn(false);
    setAccessToken(null);
  };

  return (
    <div className="w-75">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "link selected" : "link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/allproducts"
                  className={({ isActive }) =>
                    isActive ? "link selected" : "link"
                  }
                >
                  All Products
                </NavLink>
              </li>
              <li className="nav-item">
                {
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                  >
                    Categories
                  </NavLink>
                }
              </li>
              <li className="nav-item">
                {
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                  >
                    About Us
                  </NavLink>
                }
              </li>
              <li className="nav-item">
                {
                  <NavLink
                    to="/rules"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                  >
                    Rules & Conditions
                  </NavLink>
                }
              </li>

              <li className="nav-item me-3">|</li>
              <li className="nav-item">
                {
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                  >
                    Check Out
                  </NavLink>
                }
              </li>
              <li className="nav-item me-3">|</li>
              <li className="nav-item">
                {!loggedIn ? (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                  >
                    Login
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "link selected" : "link"
                    }
                    onClick={Logout}
                  >
                    Logout
                  </NavLink>
                )}
              </li>
              {!loggedIn && (
                <li className="nav-item">
                  {
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "link selected" : "link"
                      }
                    >
                      Regester
                    </NavLink>
                  }
                </li>
              )}
              {loggedIn && (
                <>
                  Manager Menu: [
                  <li className="nav-item">
                    {
                      <NavLink
                        to="/addProduct"
                        className={({ isActive }) =>
                          isActive ? "link selected" : "link"
                        }
                      >
                        Add Product
                      </NavLink>
                    }
                  </li>
                  ]
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
