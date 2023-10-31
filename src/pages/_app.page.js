import "bootstrap/dist/css/bootstrap.min.css";

import Head from "next/head";
import Header from '@/components/Header/index.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
      <>
          <Head>
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
              />
              <title>OUV Trajes</title>
          </Head>
          <Header />
          <Component {...pageProps} />
          <ToastContainer autoClose={5000} className="toast-container" />
      </>
  );
}

export default MyApp;
