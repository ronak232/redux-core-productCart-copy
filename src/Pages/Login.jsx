import React, { useState } from "react";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loginlogo from "../Images/login-logo.png";
import { useFirebaseAuth } from "../hooks/context/firebase";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function LoginUser() {
  const { isUserLoggedIn, loginUser } = useFirebaseAuth();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  let isUserLoggedInSuccess = false;

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required Field"),
      email: Yup.string().email("Invalid email").required("Required Field"),
    }),
    onSubmit: () => {
      try {
        loginUser(formik.values.email, formik.values.password)
          .then(() => {
            // If login successful, set the flag to true
            isUserLoggedInSuccess = true;
            // Redirect after a delay
            setTimeout(() => {
              navigate("/signout");
            }, 1200);
          })
          .catch((err) => {
            // If login failed, set the error message
            if (err.code === "auth/invalid-credential") {
              setTimeout(() => {
                setLoginError(err.code);
              }, 900);
            }
          });
      } catch (error) {
        console.error("Error occurred during login:", error);
      }
      // Reset the form input fields after all asynchronous operations
      formik.resetForm();
      console.log("User logged in:", isUserLoggedInSuccess);
    },
  });

  return (
    <>
      {!loginUser ? (
        <Dashboard />
      ) : (
        <div className="store-account">
          <div className="store-account__container">
            <div className="store-account__card">
              <div className="store-account__card-body">
                <img
                  className="store-account__logo"
                  src={Loginlogo}
                  alt="no-img"
                />

                <h1 className="store-account__card-title">CartZilla</h1>
                <div className="store-account__card-link">
                  <h3 className="store-account__card-link-text">
                    or Login with :
                  </h3>
                  <div className="store-account__card-loginoptions">
                    <button className="store-account__card-link-media bg-google">
                      <i class="bg-grey fa-brands fa-google"></i>
                    </button>
                    <button className="store-account__card-link-media bg-facebook">
                      <i class="bg-grey fa-brands fa-facebook-f"></i>
                    </button>
                    <button className="store-account__card-link-media  bg-twitter">
                      <i class="bg-grey fa-brands fa-twitter"></i>
                    </button>
                  </div>
                </div>
                {loginError && (
                  <p className="login-error-mssg">
                    Please check your email-id or password and try again.
                  </p>
                )}
                <div className="store-account__form">
                  <form
                    className="store-account__form-control"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="store-account__form-control-validation">
                      <TfiEmail className="store-account__form-control-icons" />
                      <input
                        type="email"
                        className="store-account__form-control-validation-text"
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="fieldmssg-error">{formik.errors.email}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="store-account__form-control-validation">
                      <TfiLock className="store-account__form-control-icons" />
                      <input
                        type="password"
                        className="store-account__form-control-validation-text"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {!formik.touched.password && formik.errors.password ? (
                        <p className="fieldmssg-error">
                          {formik.errors.password}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="login-btn">
                      <button type="submit">Login</button>
                    </div>
                    <div className="user-login">
                      <span>
                        Register with us
                        <Link to="/account">
                          <button>Register Now</button>
                        </Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginUser;
