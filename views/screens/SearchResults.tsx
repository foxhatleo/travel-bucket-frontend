import React, {FunctionComponent, useState} from "react";
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

const getSentimentArrows = (avgSentiment: number) => {
    const arrowType = avgSentiment > 0 ? "\u2191" : "\u2193";
    const absoluteSentiment = Math.abs(avgSentiment);
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
                            <>
                                <a className={"photo"} key={i} href={"#"} style={r.images.length > 0 ? {
                                    backgroundImage: `url(${r.images[0]["url"]}`,
                                } : {}}
                                onClick={(e) => {
                                    e.preventDefault();
                                    p.showGallery(r);
                                }}>
                                    <div className={"item"}>
                                        <div className="location-name">
                                            <span>Location:</span>
                                            <p style={{ paddingLeft: "100px"}}>{r.name}</p>
                                        </div>
                                        <div className="top-review-text">
                                            <div className="tooltip">
                                                <p style={{ whiteSpace: "nowrap" }}>Top Review:</p>
                                                <span className="tooltiptext">
                                                    The review with the most words in common with your search topic(s).
                                                </span>
                                            </div>
                                            <p className="review-box" dangerouslySetInnerHTML={{ __html: r.sentiment["most_positive"][0] }} />
                                        </div>
                                        <div>
                                            <div className="tooltip">
                                                <p>Avg Sentiment:</p>
                                                <span className="tooltiptext">
                                                    Sentiment is calculated on the Google Reviews for each location using nltk. 
                                                    From -1 (most negative) to 1 (most positive)
                                                </span>
                                            </div>
                                            <span style={{
                                                paddingLeft: "38px",
                                            }}>
                                                {r.sentiment["avg_sentiment"].toFixed(2)}
                                                <span style={{ 
                                                    color: r.sentiment["avg_sentiment"] > 0 ? "green" : "red",
                                                    fontSize: "16px",
                                                    position: "relative",
                                                    bottom: "4px",
                                                    paddingLeft: "5px",
                                                }}>
                                                    {getSentimentArrows(r.sentiment["avg_sentiment"])}
                                                </span>
                                            </span>
                                        </div>
                                    </div>                                        
                                </a>
                            </>)}
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
        <style jsx>{`
        div {
          width: 100%;
        }
        .photo {
          display: block;
          text-decoration: none;
          color: white;
          text-align: left;
          width: 100%;
          font-size: 22px;
          background: black no-repeat center center; 
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
        .photo:hover {
          -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        }
        .photo:active {
          -webkit-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
        }
        .photo div.item {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 270px;
          padding-left: 30px;
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
        .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted white;
            width: auto;
        }
          
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #555;
            color: #fff;
            text-align: center;
            font-size: 16px;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
        }
          
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }
          
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
        .location-name {
            padding-top: 15px;
            padding-bottom: 35px;
            height: 50px;
            display: flex;
            flex-direction: row;
        }
        .top-review-text {
            display: flex;
            flex-direction: row;
            align-items: center;
            min-height: 100px;
        }
        .review-box {
            margin-left: 70px;
            margin-right: 30px;
            background-color: rgba(0,0,0,0.4);
            color: white;
            font-size: 13px;
            height: fit-content;
            max-height: 130px;
            overflow-y: auto;
            line-height: 1.4;
        }
        `}</style>
    </div>;
};

export default SearchResults;
