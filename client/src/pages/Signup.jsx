import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:2000/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        role: "Customer",
      });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
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
                <div className="card-body p-3 p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h3 fw-bold mb-2 mt-2">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-2" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label">Your Name</label>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label">Your Email</label>
                          </div>
                        </div>

                        {/* Password */}
                        <div className="d-flex flex-row align-items-center mb-2">
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

                        {/* Confirm Password */}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label">
                              Confirm Password
                            </label>
                          </div>
                        </div>

                        {/* Gender */}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label d-block mb-1">
                              Gender
                            </label>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="genderMale"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="genderMale">
                                Male
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="genderFemale"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="genderFemale">
                                Female
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Role */}
                        <div className="d-flex flex-row align-items-center mb-2">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label d-block mb-1">
                              Role
                            </label>
                            {[
                              "Customer",
                              "Admin",
                              "TourManager",
                              "HotelManager",
                            ].map((role) => (
                              <div
                                className="form-check form-check-inline"
                                key={role}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="role"
                                  id={`role${role}`}
                                  value={role}
                                  checked={formData.role === role}
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`role${role}`}>
                                  {role.replace(/([A-Z])/g, " $1").trim()}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>

                        <div className="text-center mb-3">
                          Already have an account?{" "}
                          <Link to="/login" className="signin-link">
                            Sign in
                          </Link>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                        style={{ maxHeight: "220px", width: "auto" }}
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

export default Signup;
