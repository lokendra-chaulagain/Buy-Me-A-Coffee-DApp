import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { BuyMeACoffeeContextProvider } from "../context/Context";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return (
    <BuyMeACoffeeContextProvider>
      <Component {...pageProps} />
    </BuyMeACoffeeContextProvider>
  );
}

export default MyApp;
