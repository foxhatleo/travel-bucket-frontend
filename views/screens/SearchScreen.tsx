import React, {FunctionComponent, useState} from "react";
import TagsInput from 'react-tagsinput';
import SearchResults, {SearchResultsStatus} from "./SearchResults";
import {Gallery} from "./Gallery";
import {fetchResults} from "../../utils/fetchData";

export interface SearchScreenProps {
    showing: boolean;
}

export interface SearchResult {
    images: any[];
    name: string;
    reviews: string[];
    sentiment: {};
};

export type SearchResults = SearchResult[];

const SearchScreen: FunctionComponent<SearchScreenProps> = (p) => {

    const [displayHidden, setDisplayHidden] = useState<boolean>(true);
    const [searchCity, setSearchCity] = useState<string>("");
    const [searchTopics, setSearchTopics] = useState([]);
    const [resultState, setResultState] = useState<SearchResultsStatus>(SearchResultsStatus.ASK_INPUT);
    const [results, setResults] = useState<SearchResults>(null);
    const [gallery, setGallery] = useState<SearchResult>(null);

    const fetchData = () => {
        // setResultState(SearchResultsStatus.RESULT);
        // setResults([{"images": [{"AP": "f/10.0","EB": null,"ISO": "400","SS": "1/250","camera": "Canon EOS REBEL T1i","url": "https://live.staticflickr.com/7891/47382426071_9009ea67f9_z.jpg"},{"AP": "f/10.0","EB": null,"ISO": "400","SS": "1/250","camera": "Canon EOS REBEL T1i","url": "https://live.staticflickr.com/7843/45843459145_566c697481_z.jpg"},{"AP": "f/2.8","EB": null,"ISO": "200","SS": "1/40","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7190/6976776167_8ae6ea84be_z.jpg"},{"AP": "f/3.5","EB": null,"ISO": "80","SS": "1/200","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7203/6976774215_12652b3af1_z.jpg"},{"AP": "f/2.8","EB": null,"ISO": "125","SS": "1/60","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7061/6830652450_0e1233159c_z.jpg"},{"AP": "f/2.8","EB": null,"ISO": "200","SS": "1/60","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7191/6976776887_ee3ee275a9_z.jpg"},{"AP": "f/2.8","EB": null,"ISO": "160","SS": "1/60","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7050/6976777057_4850d97da6_z.jpg"},{"AP": "f/4.9","EB": null,"ISO": "80","SS": "1/160","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7196/6976773891_a73c4fe636_z.jpg"},{"AP": "f/4.9","EB": null,"ISO": "200","SS": "1/80","camera": "Canon PowerShot SD1100 IS","url": "https://live.staticflickr.com/7192/6976774671_a8bb4d3487_z.jpg"}],"name": "USF Botanical Gardens","reviews": ["A lot of greenery. Amazing variety of flora, which signage to indicate the species. Disappointed that the orchids were not in bloom. However, the <b>gardens</b> are a keeper. We used Google Lens to I. D. some plants.","Relaxing walk in a <b>garden</b> is the best way to relieve stress. Lots of plants, trees and flowers to peruse. Not very large but that's perfect for a gentle stroll.","A cornucopia of mostly tropical plants. Two tall coniferous trees which reminded me of California Sierra Nevada. The lake has crocodiles which for native Floridians might not he unusual. There are tables and chairs presumably for picnicking and a small greenhouse with two local cats, where you may be able to purchase plants.","Even though the reason why I was at the <b>gardens</b> wasn’t to visit them but rather attend a vegan festival, I cannot help but rate the <b>gardens</b> 2 stars due to their deplorable state. The medicinal and culinary herbs section, for example, displayed nothing but an array of dead plants and overgrown weeds, missing signs informing of the type of plant and what not. A bad “no no” if you ask me, considering they are part of the USF premises and you would think students related to the botanical, agricultural or biological sciences would care for them properly with investment and help from authorities. Didn’t care to take any pictures because there really wasn’t much to photograph 🤷🏻‍♂️","My friend and I went for the 2019 Fall Plant Festival today. The weather was beautiful. Her first time here. We had a ball! Met some lovely plant lovers and vendors. We saw many beautiful specimens. Some of which we had never seen before. We both came home with some new goodies to add to our own <b>gardens</b>!"],"sentiment": {"avg_sentiment": 0.51212,"most_negative": ["A cornucopia of mostly tropical plants.  Two tall coniferous trees which reminded me of California Sierra Nevada.  The lake has crocodiles which for native Floridians might not he unusual.  There are tables and chairs presumably for picnicking and a small greenhouse with two local cats, where you may be able to purchase plants.",0],"most_positive": ["My friend and I went for the 2019 Fall Plant Festival today. The weather was beautiful. Her first time here. We had a ball! Met some lovely plant lovers and vendors. We saw many beautiful specimens. Some of which we had never seen before. We both came home with some new goodies to add to our own gardens!",0.9719],"overall": "positve"}}]);
        setResultState(SearchResultsStatus.LOADING);
        fetchResults(searchCity, searchTopics.join(" ")).then(data => {
            if (!data || !data["length"] || data["length"] < 1) {
                setResultState(SearchResultsStatus.NO_RESULT);
            } else {
                setResultState(SearchResultsStatus.RESULT);
                setResults(data);
            }
        }).catch((r) => {
            setResultState(SearchResultsStatus.ERROR);
            console.error("This is the error that is reported:", r);
        });
    }

    function transitionEnds() {
        if (!p.showing) {
            setDisplayHidden(true);
        }
    }

    if (p.showing && displayHidden) {
        setDisplayHidden(false);
    }


    return <div className={"container" + (p.showing ? "" : " hidden")}
                style={{visibility: (displayHidden ? "hidden" : "visible")}}
                onTransitionEnd={transitionEnds}>
        <div className={"inner-container"}>
            <form onSubmit={e => {
                fetchData();
                e.preventDefault();
            }}>
                <input
                    type="text"
                    placeholder="Enter a city."
                    value={searchCity}
                    name="city"
                    onChange={e => setSearchCity(e.target.value)}
                    required={true}
                />
                <div className='tag-input'>
                    <TagsInput
                        type="text"
                        name="topics"
                        value={searchTopics}
                        addKeys={[9, 13, 32, 188]}
                        onChange={e => setSearchTopics(e)}
                        inputProps={{
                            placeholder: searchTopics.length ? "" : "Enter topic(s).",
                            required: !searchTopics.length
                        }}
                    />
                </div>
                <button type="submit" className={"button"}>Submit</button>
            </form>
            <SearchResults status={resultState} results={results} showGallery={setGallery} />
        </div>
        <Gallery result={gallery} onClose={() => {setGallery(null);}} />
        <style jsx>{`
        .container {
          background: white;
          background: rgba(255, 255, 255, .5);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 1;
          z-index: 5;
          transition: .5s ease-in-out opacity;
        }
        .container.hidden {
          opacity: 0;
        }
        .inner-container {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          max-width: 1000px;
          padding: 25px 15px;
          margin: 0 auto;
        }
        form, input, button {
          width: 100%;
          display: block;
        }
        .tag-input {
            color: black;
            padding: 10px;
            width: inherit;
            border: none;
            border-bottom: 1px solid #999;
            margin-bottom: 6px;
        }
        input {
          color: black;
          padding: 10px;
          appearance: none;
          font-size: 20px;
          font-weight: 400;
          border: none;
          background: none;
          border-bottom: 1px solid #999;
          margin-bottom: 6px;
        }
        @media (min-width: 600px) {
          form {
            display: flex;
            space-between: 5px;
          }
          button {
            width: 100px;
          }
          input {
            margin-right: 10px;
          }
        }
        `}</style>
    </div>;
}

export default SearchScreen;
