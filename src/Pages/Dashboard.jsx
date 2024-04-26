import React from "react";
import Loginlogo from "../Images/login-logo.png";
import { useFirebaseAuth } from "../hooks/context/firebase";
import { getAuth } from "firebase/auth";

function Dashboard() {
  const { isCurrentUserSignOut, isUserLoggedIn } = useFirebaseAuth();

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
              <div className="store-account__card-link">
                {isUserLoggedIn ? (
                  <p className="store-account__welcome-mssg">Welcome {String(getAuth()?.currentUser?.displayName)} on our store.</p>
                ) : (
                  ""
                )}
              </div>

              <div className="user-login">
                <div className="signout-btn">
                  <button type="submit" onClick={() => isCurrentUserSignOut()}>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
