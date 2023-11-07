import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import Header from '@/components/Header/index.tsx';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/store';

import '@/assets/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="Seu site para compra de camisas de time"
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
