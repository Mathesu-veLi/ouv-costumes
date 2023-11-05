import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';
import Header from '@/components/Header/index.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store';

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
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Header />
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
            <ToastContainer autoClose={5000} className="toast-container" />
        </>
    );
}

export default MyApp;
