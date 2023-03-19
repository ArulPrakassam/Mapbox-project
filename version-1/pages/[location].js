import MapSetUp from "/components/mapsetup";
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AppProvider from "components/context";

const Location = ({ center, apiKey }) => {
  const router = useRouter();
  const title = router.query.location;
  return (
    <>
      <Head>
        <title>Accident Blackspots - {title}</title>
      </Head>
      <AppProvider>
        <MapSetUp centerCoordinates={center} apiKey={apiKey}></MapSetUp>
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
