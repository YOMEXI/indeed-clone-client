import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Layout from "../Components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../Components/Layout/redux/store";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />{" "}
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />;
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </Provider>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
