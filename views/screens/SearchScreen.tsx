import React, {FunctionComponent, useState} from "react";
import { fetchResults } from "../../utils/fetchData";

export type SearchScreenProps = {
    showing: boolean;
}

const SearchScreen: FunctionComponent<SearchScreenProps> = (p) => {

    const [displayHidden, setDisplayHidden] = useState<boolean>(true);
    const [searchCity, setSearchCity] = useState<string>("");

    const fetchData = () => {
        fetchResults(searchCity).then(data => {
            console.log(data);
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
                    type={"text"}
                    placeholder={"Enter a search term to start."}
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                />
            </form>
        </div>
        <style jsx>{`
        .container {
          background: white;
          background: rgba(255, 255, 255, .5);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          width: 100%;
          height: 100%;
          position: relative;
          opacity: 1;
          z-index: 5;
          transition: .5s ease-in-out opacity;
        }
        .container.hidden {
          opacity: 0;
        }
        .inner-container {
          width: 100%;
          max-width: 1000px;
          padding: 15px;
          margin: 0 auto;
        }
        form, input {
          width: 100%;
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
        }
        `}</style>
    </div>;
}

export default SearchScreen;
