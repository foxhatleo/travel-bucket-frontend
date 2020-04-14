import {FunctionComponent, useState} from "react";

export type SearchScreenProps = {
    showing: boolean;
}

const SearchScreen: FunctionComponent<SearchScreenProps> = (p) => {

    const [displayHidden, setDisplayHidden] = useState<boolean>(true);

    function transitionEnds() {
        if (!p.showing) {
            setDisplayHidden(true);
        }
    }

    if (p.showing && displayHidden) {
        setDisplayHidden(false);
    }

    return <div className={"container" + (p.showing ? "" : " hidden")}
                style={{display: p.showing ? "block" : "none"}}
                onTransitionEnd={transitionEnds}>
        <style jsx>{`
        .container {
          background: white;
          width: 100%;
          height: 100%;
          position: relative;
          opacity: 1;
          z-index: 5;
          transition: 10s ease-in-out opacity;
          display: block;
        }
        .container.hidden {
          opacity: 0;
        }
        `}</style>
    </div>;
}

export default SearchScreen;
