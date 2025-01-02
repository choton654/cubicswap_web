// @generated: @expo/next-adapter@2.1.77
// export { default } from '@expo/next-adapter/document';
import { getInitialProps } from "@expo/next-adapter/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
class CustomDocument extends Document {
  render() {
    return (
      <Html style={{ height: "100%" }}>
        <Head>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='theme-color' content='#eeeeee' />
          <link rel='manifest' href='/manifest.json'></link>
          <link rel='apple-touch-icon' href='/img/cubicSwap-new.png' />
          <link rel='icon' type='image/png' sizes='60x60' href='/img/cubicswap-favicon.png' />
          <link rel='preconnect' href='https://res.cloudinary.com/choton/image/upload/' />
          <link rel='dns-prefetch' href='https://res.cloudinary.com/choton/image/upload/' />
          <link href='https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <body style={{ height: "100%", overflow: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = getInitialProps;

export default CustomDocument;

// <script
//   async
//   defer
//   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsiYNgCT94CEjwUk48DK28MHCsJfcFw0Y"
//   type="text/javascript"
// ></script>;
