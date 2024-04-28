import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5TFzHslTZ7-Rk5Rg6ZCWHVE7w6fuAo7Q",
  authDomain: "e-comm-app-6b0df.firebaseapp.com",
  projectId: "e-comm-app-6b0df",
  storageBucket: "e-comm-app-6b0df.appspot.com",
  messagingSenderId: "723357921913",
  appId: "1:723357921913:web:1b6ac090fc18593e94daa8",
  databaseURL: "https://e-comm-app-6b0df-default-rtdb.firebaseio.com/",
};

// GoogleProvide instance for sign-in
const googleSigninInstanceProvider = new GoogleAuthProvider();

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const FirebaseContext = createContext(null);

// using this custom hook we can call the context data anywhere in our application.
export const useFirebaseAuth = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  const checkedCurrentUserAuth = () => {
    return new Promise((resolve, reject) => {
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        resolve(currentUser);
      } else {
        reject("No logged in user");
      }
    });
  };

  const currentUser = () => {
    // asynchronous function that listens for changes in the authentication state
    // through callback function that gets called whenever the authentication state changes.
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(user);
        checkedCurrentUserAuth()
          .then((user) => {
            console.log("User is logged in:", user.displayName);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsUserLoggedIn(null);
      }
    });
  };

  useEffect(() => {
    currentUser();
  });

  const signInwithGoogle = async () => {
    return await signInWithPopup(firebaseAuth, googleSigninInstanceProvider)
      .then((googleUser) => {
        const userCredential = GoogleAuthProvider.credentialFromResult(googleUser);
        const userToken = userCredential.accessToken;
        const user = googleUser.user;
        console.log(userToken, user)
      })
      .catch((googleError) => {
        // Handling error for google sign
        const credential = GoogleAuthProvider.credentialFromError(googleError);
        console.log(credential);
      });
  };

  // create new user with credentials for signup in database whenever new user singup...
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

  // Login new user after registration.
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
        signInwithGoogle
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
