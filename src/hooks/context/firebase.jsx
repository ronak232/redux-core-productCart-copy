import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB5TFzHslTZ7-Rk5Rg6ZCWHVE7w6fuAo7Q",
  authDomain: "e-comm-app-6b0df.firebaseapp.com",
  projectId: "e-comm-app-6b0df",
  storageBucket: "e-comm-app-6b0df.appspot.com",
  messagingSenderId: "723357921913",
  appId: "1:723357921913:web:1b6ac090fc18593e94daa8",
  databaseURL: "https://e-comm-app-6b0df-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// const firebaseDatabase = getDatabase();

const FirebaseContext = createContext(null);

// using this custom hook used for calling the context data anywhere in our application.
export const useFirebaseAuth = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [signOutUser, setSignOutUser] = useState(null);

  const currentUserAuth = () => {
    const currentUser = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return currentUser;
  };

  useEffect(() => {
    currentUserAuth();
  }, [user]);

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

  // Login user after registration.
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

  const signOutCurrentUser = () => {
    return firebaseAuth.signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        registerNewUser,
        loginUser,
        user,
        signOutCurrentUser,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
