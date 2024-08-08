import React, { useState } from "react";
import Layout from "../Components/Layout";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_URL = "http://localhost:3500/users/register";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      setSuccess("User registered successfully");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Layout>
        <div className="container w-25 mt-5" style={{ minHeight: "73vh" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "lightgray",
              padding: "30px 10px",
              borderRadius: "10px",
            }}
          >
            <h3>Register Form</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="my-3">
              <label htmlFor="name" className="form-label">
                <strong>Full Name</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
