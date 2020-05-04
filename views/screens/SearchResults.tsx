import React, {FunctionComponent, useState} from "react";
import Spinner from "../components/Spinner";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import {SearchResult, SearchResults as SearchResultsArray} from "./SearchScreen";
import {SearchResultBox} from "../components/SearchResultBox";

export enum SearchResultsStatus {
    ASK_INPUT,
    LOADING,
    RESULT,
    NO_RESULT,
    ERROR,
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
                            <SearchResultBox
                                result={r}
                                key={`result_${i}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    p.showGallery(r);
                                }}
                            />
                        )}
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
        <style jsx>{`
        div {
          width: 100%;
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
        `}</style>
    </div>;
};

export default SearchResults;
