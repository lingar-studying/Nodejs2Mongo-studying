import React, { useState, useContext } from "react";
import GlobalContext from "../Hooks/GlobalContext";
import Layout from "../Components/Layout";

const API_URL = "http://localhost:3500/users";

const Login = () => {
  const { loggedIn, setLoggedIn, setAccessToken, setUserName } =
    useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      setLoggedIn(true);
      setUserName(data.name);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Layout>
        <div
          className={`container ${!loggedIn ? "w-25 mt-5" : ""}`}
          style={{ minHeight: "73vh" }}
        >
          {!loggedIn ? (
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "lightgray",
                padding: "30px 10px",
                borderRadius: "10px",
              }}
            >
              <h3>Log In Form</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="my-3">
                <label htmlFor="email" className="form-label">
                  <strong>Email address</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="emailHelp"
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary mt-3">
                  Log In
                </button>
              </div>
            </form>
          ) : (
            <div className=" d-flex flex-column align-items-center pt-5">
              <h3>You Are Logged In</h3>
              <button
                className="btn btn-outline-primary mt-5"
                onClick={() => {
                  setLoggedIn(false);
                  setAccessToken(null);
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Login;
