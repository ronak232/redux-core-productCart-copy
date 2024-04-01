import React from "react";
import Loginlogo from "../Images/login-logo.png";
import { useFirebaseAuth } from "../hooks/context/firebase";

function Dashboard() {
  const { signOutCurrentUser } = useFirebaseAuth();

  return (
    <div>
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
              <div className="store-account__card-link"></div>

              <div className="user-login">
                <div className="signout-btn">
                  <button type="submit" onClick={() => signOutCurrentUser()}>
                    Sign out
                  </button>
                </div>
                {/* <span>
                  Register with us
                  <Link to="/account">
                    <button>Register Now</button>
                  </Link>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
