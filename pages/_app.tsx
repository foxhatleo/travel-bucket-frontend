import React, {FunctionComponent, useState} from "react";
import {AppProps} from "next/app";
import Head from "next/head";
import 'react-image-lightbox/style.css';
import '../styles/react-tagsinput.css';
import HomeScreen from "../views/screens/HomeScreen";
import SearchScreen from "../views/screens/SearchScreen";

export type ReportFunc = (p: {showSearch: boolean}) => void;

export type PageReportProps = {
    report: ReportFunc;
};

/**
 * Default app entry point. Include any global CSS and JS libraries here.
 */
const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {

    const [showSearch, setShowSearch] = useState(false);

    const report: ReportFunc = (r) => {
        setShowSearch(r.showSearch);
    }

    return <>
        <HomeScreen pureBG={showSearch} />
        <SearchScreen showing={showSearch} />
        <Component {...pageProps} report={report} />
        <Head>
            <title>Travel Bucket</title>
        </Head>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap" rel="stylesheet" />
        <style>{`
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video, input {
          font-size: 12px;
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          box-sizing: border-box;
          font-family: "Ubuntu", "Helvetica", "Helvetica Neue", "Arial", sans-serif;
          vertical-align: baseline;
        }
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
          display: block;
        }
        body {
          line-height: 1;
        }
        ol, ul {
          list-style: none;
        }
        blockquote, q {
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
          content: '';
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        .button {
          display: inline-block;
          font-size: 15px;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          color: white;
          background: #1976d2;
          border: none;
          cursor: pointer;
          appearance: none;
          transition: .3s ease-in-out background;
          padding: 10px;
        }
        .button:disabled {
          opacity: .6;
          pointer-events: none;
        }
        .button.white {
          background: white;
          color: black;
        }
        .button.white:hover {
          background: #dfdfdf;
        }
        .button.white:active {
          background: #bcbcbc;
        }
        .button:hover {
          background: #2196f3;
        }
        .button:active {
          background: #0d47a1;
        }
        html, body, #__next {
          width: 100%;
          height: 100%;
        }
        input:focus,
        select:focus,
        textarea:focus,
        button:focus {
          outline: none;
        }
        `}</style>
    </>;
};

export default App;
