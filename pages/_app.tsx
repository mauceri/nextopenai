import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Script from "next/script";

function App({ Component, pageProps }: AppProps) {
  return (<>
              <Script src="http://localhost:8097" />;
              <Component {...pageProps} />;
          </>)
}

export default App;
