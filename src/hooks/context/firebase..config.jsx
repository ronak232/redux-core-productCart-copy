import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  projectId: "e-comm-app-6b0df",
  storageBucket: "e-comm-app-6b0df.appspot.com",
  messagingSenderId: "723357921913",
};
console.log(firebaseConfig);
// GoogleProvide instance for sign-in
const googleSigninInstanceProvider = new GoogleAuthProvider();

// Facebook Instance Provider for sign-in
const facebookInstance = new FacebookAuthProvider();

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const FirebaseContext = createContext(null);

// using this custom hook we can call the context data anywhere in our application.
export const useFirebaseAuth = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  /*asynchronous function that listens for changes in the authentication statethrough
    callback function that gets called whenever the authentication state changes.
  */
  const unSubscribe = () => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    unSubscribe();
  }, [isUserLoggedIn]);

  /*
  Method to signIn using google and facebook 
  */

  // Google Authentication
  const signInwithGoogle = async () => {
    return await signInWithPopup(firebaseAuth, googleSigninInstanceProvider)
      .then((user) => {
        if (user) {
          unSubscribe();
          navigate("/auth");
        } else {
          navigate("/login");
        }
      })
      .catch((googleError) => {
        // Handling error for google sign
        const credential = GoogleAuthProvider.credentialFromError(googleError);
        console.error(credential);
      });
  };

  // Facebook Authentication
  const facebookAuth = async () => {
    return await signInWithPopup(firebaseAuth, facebookInstance)
      .then((facebookUser) => {
        if (facebookUser.user) {
          unSubscribe();
          navigate("/auth");
        } else {
          navigate("/login");
        }
      })
      .catch((userError) => {
        if (userError === "auth/account-exists-with-different-credential") {
          console.log(userError.customData.email);
        }
      });
  };

  // create new user with credentials for signup in database whenever new user signup...
  const registerNewUser = async (email, passowrd, username) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, passowrd)
      .then((registerdUserCredentials) => {
        let registerdUser = registerdUserCredentials.user;
        if (registerdUser) {
          updateProfile(registerdUser, {
            displayName: username,
          });
        }
        console.log("register", registerdUserCredentials);
        return registerdUserCredentials;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  // Login method with e-mail and password.
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential);
        return userCredential; // through this we can Return the user credential if needed to the caller function to passed the resolved.
      })
      .catch((error) => {
        console.error("Login failed:", error);
        throw error; // Throw the error to handle it in the caller
      });
  };

  // Email provider for signOut method...
  const isCurrentUserSignOut = () => {
    return firebaseAuth.signOut(firebaseAuth?.currentUser);
  };

  return (
    <FirebaseContext.Provider
      value={{
        registerNewUser,
        loginUser,
        isUserLoggedIn,
        isCurrentUserSignOut,
        signInwithGoogle,
        facebookAuth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
