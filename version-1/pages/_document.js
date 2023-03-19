import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
