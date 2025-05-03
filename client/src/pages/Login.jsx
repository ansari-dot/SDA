import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response) {
        toast.success(`Login successful`);
      }
      setTimeout(() => {
        navigate("/");
      }, 4);

      // ✅ Reset form
      setFormData({ email: "", password: "" });

      // Optional: Redirect based on role
      // if (userRole === "admin") navigate("/admin");
      // else if (userRole === "customer") navigate("/customer");
      // else navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign in
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label">Email</label>
                          </div>
                        </div>

                        {/* Password */}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label">Password</label>
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg">
                            Login
                          </button>
                        </div>

                        <div className="text-center mb-2">
                          <Link to="/forgot-password" className="signin-link">
                            Forgot Password?
                          </Link>
                        </div>

                        <div className="text-center mb-3">
                          Don't have an account?{" "}
                          <Link to="/signup" className="signin-link">
                            Sign up
                          </Link>
                        </div>
                      </form>
                    </div>

                    {/* Right side image */}
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
