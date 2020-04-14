import React, {FunctionComponent} from "react";
import {AppProps} from "next/app";
import Head from "next/head";

/**
 * Default app entry point. Include any global CSS and JS libraries here.
 */
const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
    return <>
        <Component {...pageProps} />
        <Head>
            <title>Travel Bucket</title>
        </Head>
    </>;
};

export default App;
