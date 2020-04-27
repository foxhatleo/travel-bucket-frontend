import React, {FunctionComponent, useState} from "react";
import SearchResults, {SearchResultsStatus} from "./SearchResults";
import {Gallery} from "./Gallery";
import {fetchResults} from "../../utils/fetchData";

export interface SearchScreenProps {
    showing: boolean;
}

export interface SearchResult {
    images: string[];
    name: string;
    reviews: string[];
    sentiment: {};
};

export type SearchResults = SearchResult[];

const SearchScreen: FunctionComponent<SearchScreenProps> = (p) => {

    const [displayHidden, setDisplayHidden] = useState<boolean>(true);
    const [searchCity, setSearchCity] = useState<string>("");
    const [searchTopics, setSearchTopics] = useState<string>("");
    const [resultState, setResultState] = useState<SearchResultsStatus>(SearchResultsStatus.ASK_INPUT);
    const [results, setResults] = useState<SearchResults>(null);
    const [gallery, setGallery] = useState<SearchResult>(null);

    const fetchData = () => {
        // setResultState(SearchResultsStatus.RESULT);
        // setResult([{"images":["https://live.staticflickr.com/346/32126825356_407ea6b0a5_o.jpg","https://live.staticflickr.com/1724/41761352945_b6f31c55ba_o.jpg","https://live.staticflickr.com/65535/47834915251_410d46cd0b_o.jpg","https://live.staticflickr.com/4469/23920721208_64f5554684_o.jpg","https://live.staticflickr.com/696/33039289372_4d2b8fea4c_o.jpg","https://live.staticflickr.com/65535/49446218867_797638ef9c_o.jpg","https://live.staticflickr.com/4822/46269496592_033d8f6828_o.jpg","https://live.staticflickr.com/8222/28768089566_cc5218fcc5_o.jpg","https://live.staticflickr.com/65535/48054972887_b0f77d82aa_o.jpg","https://live.staticflickr.com/7812/46364293835_bab856fd89_o.jpg"],"name":"Brooklyn Bridge"},{"images":["https://live.staticflickr.com/3859/14234679600_bfc68fb97d_o.jpg","https://live.staticflickr.com/4499/37459686882_968ece80a0_o.jpg","https://live.staticflickr.com/5639/23967214252_e730c49a5c_o.jpg","https://live.staticflickr.com/24/55462268_f7e6897967_o.jpg","https://live.staticflickr.com/5268/5561103609_0a353d2a1f_o.jpg","https://live.staticflickr.com/4279/35192322302_df2bd90ee0_o.jpg","https://live.staticflickr.com/275/32631318790_45f6e29a67_o.jpg","https://live.staticflickr.com/65535/49266653898_33975b6bc1_o.jpg","https://live.staticflickr.com/4613/39463139225_0c06249ae2_o.jpg","https://live.staticflickr.com/617/32404289630_b88f511f83_o.jpg"],"name":"Time Warner Center"},{"images":["https://live.staticflickr.com/541/31565064475_693e7d0083_o.jpg","https://live.staticflickr.com/4259/35295582030_0839fb7613_o.jpg","https://live.staticflickr.com/8219/29777319776_56c5c509fc_o.jpg","https://live.staticflickr.com/5792/30495752463_650b786551_o.jpg","https://live.staticflickr.com/65535/47636682741_2b44210853_o.jpg","https://live.staticflickr.com/639/23271175282_36f04e9864_o.jpg","https://live.staticflickr.com/7881/40118952703_df2de4966d_o.jpg","https://live.staticflickr.com/632/22668340056_0a9a353d5a_o.jpg","https://live.staticflickr.com/5347/31181352922_a5a07fee7c_o.jpg","https://live.staticflickr.com/453/20269755618_9d523d4365_o.jpg"],"name":"Flatiron Building"},{"images":["https://live.staticflickr.com/4492/37397116821_557b929908_o.jpg","https://live.staticflickr.com/4531/26583255069_0aeccd4e55_o.jpg","https://live.staticflickr.com/5487/11467333156_ed790487fe_o.jpg","https://live.staticflickr.com/4827/32037967907_afb7632e17_o.jpg","https://live.staticflickr.com/4580/23917450917_d0df244314_o.jpg","https://live.staticflickr.com/2561/32992143711_c9f9fd5cc0_o.jpg","https://live.staticflickr.com/1574/24934133984_d4f9c42f2a_o.jpg","https://live.staticflickr.com/7736/18274193405_bccb06ffaa_o.jpg","https://live.staticflickr.com/1708/23713574133_4fb1ceb7a3_o.jpg","https://live.staticflickr.com/65535/48715615173_e4ebda1049_o.jpg"],"name":"The Loeb Boathouse"},{"images":["https://live.staticflickr.com/4850/45972481425_5aa8dc68b7_o.jpg","https://live.staticflickr.com/3391/3336560513_f76dff350f_o.jpg","https://live.staticflickr.com/65535/49622529938_40a6993a42_o.jpg","https://live.staticflickr.com/953/42252951912_341c1c8f3c_o.jpg","https://live.staticflickr.com/950/40493778610_aba8dea486_o.jpg","https://live.staticflickr.com/980/27430566917_9599062cdb_o.jpg","https://live.staticflickr.com/1462/25034118590_ac384c5213_o.jpg","https://live.staticflickr.com/7349/26702912924_6dbc9eb250_o.jpg","https://live.staticflickr.com/890/40493780710_9a88949de0_o.jpg","https://live.staticflickr.com/881/27430537667_0cfea34d22_o.jpg"],"name":"Central Park"},{"images":["https://live.staticflickr.com/4626/39463301844_1cea6ec4a7_o.jpg","https://live.staticflickr.com/924/41521888010_7b6f81650c_o.jpg","https://live.staticflickr.com/1808/42427721855_bda1492c6d_o.jpg","https://live.staticflickr.com/931/29642124068_324aa9056f_o.jpg","https://live.staticflickr.com/1853/43646936554_8be190b8a4_o.jpg","https://live.staticflickr.com/4620/26301766018_92583af041_o.jpg","https://live.staticflickr.com/4821/45250644084_28d12fb5c2_o.jpg","https://live.staticflickr.com/1791/42960721701_8e0a239f61_o.jpg","https://live.staticflickr.com/4752/25802058947_bc1354a20a_o.jpg","https://live.staticflickr.com/4709/40615508792_50085b559a_o.jpg"],"name":"Madison Square Park"},{"images":["https://live.staticflickr.com/7616/16619391780_9a32958008_o.jpg","https://live.staticflickr.com/65535/48932393308_983102e30f_o.jpg","https://live.staticflickr.com/65535/48906372742_deb6f722a5_o.jpg","https://live.staticflickr.com/5759/20737545732_902c900f12_o.jpg","https://live.staticflickr.com/65535/48944544461_a9c1c1e752_o.jpg","https://live.staticflickr.com/1501/23912630679_1efb257d9b_o.jpg","https://live.staticflickr.com/65535/49097954682_de719a2e95_o.jpg","https://live.staticflickr.com/8778/17113119292_da1f152bf8_o.jpg","https://live.staticflickr.com/65535/49113161702_d16e2d9abe_o.jpg","https://live.staticflickr.com/3751/18716096484_ea575f3a3e_o.jpg"],"name":"Prospect Park"},{"images":["https://live.staticflickr.com/509/31881469935_d8a342dc90_o.jpg","https://live.staticflickr.com/479/32016620595_f05ac52666_o.jpg","https://live.staticflickr.com/5486/30413090155_e0c87ab43d_o.jpg","https://live.staticflickr.com/65535/48459646952_3d0b6b6f1e_o.jpg","https://live.staticflickr.com/65535/49562092078_d74694eb6c_o.jpg","https://live.staticflickr.com/65535/49163142268_2e9ea92c71_o.jpg","https://live.staticflickr.com/1590/24733780772_7c2cf09f91_o.jpg","https://live.staticflickr.com/416/31997122553_fb5d1b000c_o.jpg","https://live.staticflickr.com/7629/16326420014_0c0553d17d_o.jpg","https://live.staticflickr.com/65535/49208735403_4717f91172_o.jpg"],"name":"Times Square"},{"images":["https://live.staticflickr.com/65535/49446327177_2b132d00cf_o.jpg","https://live.staticflickr.com/65535/48339070876_daafd5236f_o.jpg","https://live.staticflickr.com/609/21961736571_7b82dee0ac_o.jpg","https://live.staticflickr.com/65535/48339070061_7913821a7e_o.jpg","https://live.staticflickr.com/65535/48339069041_97b787481c_o.jpg","https://live.staticflickr.com/5491/31232882656_0cc714a6e9_o.jpg","https://live.staticflickr.com/3687/33224358366_fd93f3db9f_o.jpg","https://live.staticflickr.com/5561/14536035307_a59a08c44e_o.jpg","https://live.staticflickr.com/65535/49134143432_9de5081130_o.jpg","https://live.staticflickr.com/65535/48801918246_837ee2a522_o.jpg"],"name":"Brooklyn Bridge Park"}]);
        setResultState(SearchResultsStatus.LOADING);
        fetchResults(searchCity, searchTopics).then(data => {
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
                <input
                    type="text"
                    placeholder="Enter topic(s)."
                    value={searchTopics}
                    name="topics"
                    onChange={e => setSearchTopics(e.target.value)}
                    required={true}
                />
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
          overflow: scroll;
          max-width: 1000px;
          padding: 25px 15px;
          margin: 0 auto;
        }
        form, input, button {
          width: 100%;
          display: block;
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
