import MapSetUp from "/components/mapsetup";
import Head from "next/head";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import AppProvider from "components/context";

const Location = ({ center, apiKey, firebaseAPI, firebaseDatabaseURL }) => {
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

  const router = useRouter();
  const title = router.query.location;
  return (
    <>
      <Head>
        <title>Accident Blackspots - {title}</title>
      </Head>
      <AppProvider>
        <MapSetUp
          centerCoordinates={center}
          apiKey={apiKey}
          database={database}
        ></MapSetUp>
      </AppProvider>
    </>
  );
};
export default Location;
export const getStaticProps = async (context) => {
  const { params } = context;
  const mapboxAPI = process.env.MAPBOX_API_KEY;
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${params.location}.json?access_token=${mapboxAPI}`
    );
    const data = await response.json();
    if (data.features.length === 0) {
      return {
        notFound: true,
      };
    }
    const { center } = data.features[0];

    return {
      props: {
        center,
        apiKey: process.env.MAPBOX_API_KEY,
        firebaseAPI: process.env.FIREBASE_API_KEY,
        firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return;
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { location: "pondicherry" },
      },
    ],
    fallback: "blocking",
  };
}
