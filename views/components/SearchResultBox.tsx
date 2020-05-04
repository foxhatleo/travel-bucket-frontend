import React, {FunctionComponent, useState} from "react";
import { SearchResult } from "views/screens/SearchScreen";

export interface SearchResultBoxProps {
    result: SearchResult,
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
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

export const SearchResultBox: FunctionComponent<SearchResultBoxProps> = ({result, onClick}) => {
    const [reviewIndex, setReviewIndex] = useState<number>(0);
    return (
        <>
            <a className={"photo"} href={"#"} style={result.images.length > 0 ? {
                backgroundImage: `url(${result.images[0]["url"]}`,
            } : {}}
            onClick={onClick}
            >
                <div className={"item"}>
                    <div className="location-name">
                        <span>Location:</span>
                        <p style={{ paddingLeft: "100px"}}>{result.name}</p>
                    </div>
                    <div className="top-review-text">
                        <div className="tooltip">
                            <p style={{ whiteSpace: "nowrap" }}>Reviews:</p>
                            <span className="tooltiptext">
                                Google Reviews for the selected location. Query words are in bold.
                            </span>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <p className="review-box" dangerouslySetInnerHTML={{ __html: result.reviews[reviewIndex] }} />
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignSelf: "flex-end",
                                paddingRight: "30px"
                            }}>
                                <button
                                    className={"button white"}
                                    disabled={reviewIndex === 0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReviewIndex(reviewIndex-1)
                                    }}
                                >
                                    {`<`}
                                </button>
                                <button
                                    className={"button white"}
                                    disabled={reviewIndex === result.reviews.length-1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReviewIndex(reviewIndex+1)
                                    }}
                                >
                                    {`>`}
                                </button>
                            </div>
                        </div>
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
                            {result.sentiment["avg_sentiment"].toFixed(2)}
                            <span style={{ 
                                color: result.sentiment["avg_sentiment"] > 0 ? "green" : "red",
                                fontSize: "16px",
                                position: "relative",
                                bottom: "4px",
                                paddingLeft: "5px",
                            }}>
                                {getSentimentArrows(result.sentiment["avg_sentiment"])}
                            </span>
                        </span>
                    </div>
                </div>                                        
            </a>
            <style jsx>{`
            .photo {
                display: block;
                text-decoration: none;
                color: white;
                text-align: left;
                width: 100%;
                font-size: 22px;
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
            .location-name {
                padding-top: 15px;
                padding-bottom: 35px;
                height: 50px;
                display: flex;
                flex-direction: row;
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
                left: 60%;
                margin-left: -100px;
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 60%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
            
            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }
            .top-review-text {
                display: flex;
                flex-direction: row;
                align-items: center;
                min-height: 100px;
            }
            .review-box {
                margin-left: 100px;
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
        </>
    );
};