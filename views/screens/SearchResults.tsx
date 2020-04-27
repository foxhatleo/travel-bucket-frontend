import React, {FunctionComponent} from "react";
import Spinner from "../components/Spinner";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {SearchResult, SearchResults as SearchResultsArray} from "./SearchScreen";

export enum SearchResultsStatus {
    ASK_INPUT,
    LOADING,
    RESULT,
    NO_RESULT,
    ERROR,
}

const getSentimentArrows = (sentiment: number) => {
    const arrowType = sentiment > 0 ? "\u2191" : "\u2193";
    const absoluteSentiment = Math.abs(sentiment);
    let numArrows;
    if (absoluteSentiment > 0.66) numArrows = 3;
    if (absoluteSentiment < 0.66 && absoluteSentiment > 0.33) numArrows = 2;
    if (absoluteSentiment < 0.33) numArrows = 1;
    return '' + arrowType.repeat(numArrows);
}

const SearchResults: FunctionComponent<{
    status: SearchResultsStatus;
    results: SearchResultsArray;
    showGallery: (g: SearchResult) => void;
}> = (p) => {

    const is = (i: SearchResultsStatus) => (p.status == i ? " shown" : "");

    return <div>
        <SwitchTransition mode={"out-in"}>
            <CSSTransition key={p.status}
                           addEndListener={(node, done) => {
                               node.addEventListener("transitionend", done, false);
                           }}
                           classNames="fade">
                <div>
                    <div className={"ask-input parent" + (is(SearchResultsStatus.ASK_INPUT))}>
                        ⬆️ Start exploring for your next trip above. 😆
                    </div>
                    <div className={"loading parent" + (is(SearchResultsStatus.LOADING))}>
                        <Spinner />
                    </div>
                    <div className={"no-result parent" + (is(SearchResultsStatus.NO_RESULT))}>
                        No results. Maybe change your queries to something else? 🧐
                    </div>
                    <div className={"no-result parent" + (is(SearchResultsStatus.ERROR))}>
                        An error happened. 😵 Check console for more info please.
                    </div>
                    <div className={"result parent" + (is(SearchResultsStatus.RESULT))}>
                        {p.results && p.results.map((r, i) =>
                            <div className={"item-container"}>
                                <a className={"item"} key={i} href={"#"} style={r.images.length > 0 ? {
                                    backgroundImage: `url(${r.images[0]}`,
                                } : {}} onClick={(e) => {
                                    e.preventDefault();
                                    p.showGallery(r);
                                }}>
                                    <span className={"city-name"}>{r.name}</span>
                                    <div className={"sentiment"}>
                                        Sentiment: {r.sentiment["avg_sentiment"].toFixed(2)} &nbsp;
                                        <span
                                            style={{ 
                                                color: r.sentiment["avg_sentiment"] > 0 ? "green" : "red",
                                                fontSize: "16px",
                                                position: "relative",
                                                bottom: "2px",
                                            }}
                                        >
                                        {getSentimentArrows(r.sentiment["avg_sentiment"])}
                                        </span>
                                    </div>
                                </a>
                            </div>)}
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
        <style jsx>{`
        div {
          width: 100%;
        }
        .item-container {
          display: block;
          width: 100%;
        }
        .item {
          display: block;
          text-decoration: none;
          color: white;
          text-align: left;
          width: 100%;
          font-size: 22px;
          height: 100px;
          background: white no-repeat center center; 
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          margin-top: 10px;
          transition: .3s ease-in-out box-shadow;
          -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        }
        .item:hover {
          -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        }
        .item:active {
          -webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
        }
        .item span.city-name {
          display: block;
          line-height: 100px;
          width: 100%;
          height: 100%;
          padding-left: 50px;
          -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,1);
          -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,1);
          box-shadow: 0px 0px 8px 0px rgba(0,0,0,1);
          background: linear-gradient(
            to right,
            hsl(0, 0%, 0%) 0%,
            hsla(0, 0%, 0%, 0.986) 7.1%,
            hsla(0, 0%, 0%, 0.948) 13.7%,
            hsla(0, 0%, 0%, 0.892) 19.8%,
            hsla(0, 0%, 0%, 0.82) 25.6%,
            hsla(0, 0%, 0%, 0.736) 31.3%,
            hsla(0, 0%, 0%, 0.644) 36.8%,
            hsla(0, 0%, 0%, 0.546) 42.3%,
            hsla(0, 0%, 0%, 0.447) 48%,
            hsla(0, 0%, 0%, 0.349) 53.9%,
            hsla(0, 0%, 0%, 0.257) 60.1%,
            hsla(0, 0%, 0%, 0.174) 66.7%,
            hsla(0, 0%, 0%, 0.103) 74%,
            hsla(0, 0%, 0%, 0.048) 81.8%,
            hsla(0, 0%, 0%, 0.013) 90.5%,
            hsla(0, 0%, 0%, 0) 100%
          );
        }
        .parent {
          text-align: center;
          transition: .3s ease-in-out opacity;
          display: none;
        }
        .loading, .ask-input, .no-result {
          margin-top: 100px;
        }
        .ask-input {
          font-size: 20px;
        }
        .shown {
          display: block;
        }
        .fade-enter{
           opacity: 0;
        }
        .fade-exit{
           opacity: 1;
        }
        .fade-enter-active{
           opacity: 1;
        }
        .fade-exit-active{
           opacity: 0;
        }
        .fade-enter-active,
        .fade-exit-active{
           transition: opacity 500ms;
        }
        .sentiment {
            position: relative;
            left: 85%;
            top: -35px;
            width: 140px;
            height: 30px;
            font-size: 14px;
            background-color: black;
            display: flex;
            align-items: center;
            padding-left: 5px;
        }
        `}</style>
    </div>;
};

export default SearchResults;
