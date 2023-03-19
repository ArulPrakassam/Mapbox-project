import MapSetUp from "./mapsetup";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const App = ({ apiKey, firebaseAPI, firebaseDatabaseURL }) => {
  const firebaseConfig = {
    apiKey: firebaseAPI,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: firebaseDatabaseURL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  //authentication
  const auth = getAuth(app);

  signInAnonymously(auth)
    .then(() => {
      console.log("successfully signed in as anonymous user");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <>
      <MapSetUp apiKey={apiKey} database={database} />
    </>
  );
};

export default App;
