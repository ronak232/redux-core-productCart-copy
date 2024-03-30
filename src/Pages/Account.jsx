import React from "react";
import { TfiEmail, TfiLock } from "react-icons/tfi";
import { Button } from "../Styles/Button.style";
import { LiaUserCircle } from "react-icons/lia";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loginlogo from "../Images/login-logo.png";
import { useFirebaseAuth } from "../hooks/context/firebase";
import { Link, useNavigate } from "react-router-dom";

function Account() {
  const { registerNewUser } = useFirebaseAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPssd: "",
      email: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(12, "Username should be 12 characters or less!")
        .required("Required Field"),

      password: Yup.string()
        .min(8, "Atleast 8 characters")
        .max(12, "Password must be less than 12!")
        .required("Required Field"),
      email: Yup.string().email("Invalid email").required("Required Field"),
    }),

    validate: (values) => {
      const errors = {};
      if (!values.confirmPssd) {
        errors.confirmPssd = "Required Field";
      } else if (values.confirmPssd !== values.password) {
        errors.confirmPssd = "Password does not match";
      }
      return errors;
    },

    onSubmit: async (values) => {
      await registerNewUser(
        values.email,
        values.password,
        values.username,
        values.confirmPssd
      )
        .then(() => {
          setTimeout(() =>{
            navigate("/login");
          }, 1500)
        })
        .catch((err) => {
          console.log(err);
        });
      formik.resetForm();
    },
  });

  return (
    <>
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
                  Register with :
                </h3>
                <div className="store-account__card-loginoptions">
                  <button
                    className="store-account__card-link-media bg-google"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-google"></i>
                  </button>
                  <button
                    className="store-account__card-link-media bg-facebook"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-facebook-f"></i>
                  </button>
                  <button
                    className="store-account__card-link-media bg-twitter"
                    href="/"
                  >
                    <i class="bg-grey fa-brands fa-twitter"></i>
                  </button>
                </div>
              </div>
              <div className="store-account__form">
                <form
                  className="store-account__form-control"
                  onSubmit={formik.handleSubmit}
                >
                  <p>Or Create using below</p>
                  <div className="store-account__form-control-validation">
                    <LiaUserCircle className="store-account__form-control-icons" />
                    <input
                      type="text"
                      className="store-account__form-control-validation-text"
                      placeholder="Username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                    {!formik.touched.username && formik.errors.username ? (
                      <p className="fieldmssg-error">
                        {formik.errors.username}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
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
                  <div className="store-account__form-control-validation">
                    <TfiLock className="store-account__form-control-icons" />
                    <input
                      type="password"
                      className="store-account__form-control-validation-text"
                      placeholder="Confirm Password"
                      name="confirmPssd"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPssd}
                    />
                    {!formik.touched.confirmPssd &&
                    formik.errors.confirmPssd ? (
                      <p className="fieldmssg-error">
                        {formik.errors.confirmPssd}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="btn-red">
                    <Link target="_blank">
                      <Button
                        bgColor="#383fdc"
                        borderRadius="5px"
                        color="white"
                        padding="14px"
                        fontSize="18px"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
              <div className="user-registration">
                <span>
                  Already Register?
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
