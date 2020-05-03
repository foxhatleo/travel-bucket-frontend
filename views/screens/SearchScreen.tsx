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
        setResultState(SearchResultsStatus.RESULT);
        setResults([  {    "images": [      "https://live.staticflickr.com/1978/44604099435_feabc07b97_z.jpg",       "https://live.staticflickr.com/8640/16825055625_ee12f12606_z.jpg",       "https://live.staticflickr.com/3891/15125316842_1f0b5075fe_z.jpg",       "https://live.staticflickr.com/7843/32524040867_3ccac0323b_z.jpg",       "https://live.staticflickr.com/947/42250109542_6a20cd9c10_z.jpg",       "https://live.staticflickr.com/7917/32636928927_11950376f2_z.jpg",       "https://live.staticflickr.com/958/42250108262_93a8bdb50e_z.jpg",       "https://live.staticflickr.com/3835/14346220015_16f9906d59_z.jpg",       "https://live.staticflickr.com/3893/14939044830_0b0f91d06e_z.jpg",       "https://live.staticflickr.com/5664/22837949398_5243327e5f_z.jpg"    ],     "name": "Saint-\u00c9tienne-du-Mont",     "reviews": [      "This is one church I would go out of my way to visit in Paris, one of my favorites. Beautiful, architecture, interesting history. Close to the beautiful Luxemourg gardens and the Pantheon. It is home to the reliquary of the patron Saint of Paris, St. Genevi\u00e8ve. There are some unique historic features in the church you won't find in many others. One interesting side note, the large red door on the Eastern side of the church was featured in the movie \"midnight in Paris\".",       "Beautiful church and so worth taking time out of a busy day to just take it in even if for only a few minutes.",       "Went to Christmas eve midnight mass here. Lovely church. Very historic and great location.",       "Gorgeous Church right next to the Pantheon. Every part of it looks very unique, gotta pay attention to every detail of it",       "This church is a hidden gem in Paris. Absolutely spectacular and a lovely place to just sit and watch the world go buy. Those who have seen the Woody Allen movie \"Midnight in Paris\", will recognize the steps and street it was filmed from. Would highly recommend to visitors wanting to get a little bit away from the busy tourist areas."    ],     "sentiment": {      "avg_sentiment": 0.76764,       "most_negative": [        "Gorgeous Church right next to the Pantheon. Every part of it looks very unique, gotta pay attention to every detail of it",         0.5165      ],       "most_positive": [        "This is one church I would go out of my way to visit in Paris, one of my favorites. Beautiful, architecture, interesting history. Close to the beautiful Luxemourg gardens and the Pantheon. It is home to the reliquary of the patron Saint of Paris, St. Genevi\u00e8ve. There are some unique historic features in the church you won't find in many others. One interesting side note, the large red door on the Eastern side of the church was featured in the movie \"midnight in Paris\".",         0.9432      ],       "overall": "positve"    }  },   {    "images": [      "https://live.staticflickr.com/753/23097117161_8978353415_z.jpg",       "https://live.staticflickr.com/5541/10124857665_f4fe4102ef_z.jpg",       "https://live.staticflickr.com/7031/6681766755_803024cb72_z.jpg",       "https://live.staticflickr.com/620/22483100021_d1259c0ca8_z.jpg",       "https://live.staticflickr.com/3418/3238039373_f1f4f31c64_z.jpg",       "https://live.staticflickr.com/6095/7029853921_440cb1d05c_z.jpg",       "https://live.staticflickr.com/603/31783800213_b565f57f03_z.jpg",       "https://live.staticflickr.com/723/20651438834_6dda662f30_z.jpg",       "https://live.staticflickr.com/1229/1471315161_ef72fa96ee_z.jpg",       "https://live.staticflickr.com/4167/34451854146_a2f6f59bed_z.jpg"    ],     "name": "\u00c9lys\u00e9e Palace",     "reviews": [      "I loved this place\ud83d\ude0d\ud83d\ude0d",       "Tremendous place !",       "Elysee Palace and the gardens seem great (better than The White House), but walls and gates are too high to be able to see something interesting.",       "Fries are good. Definitely a good adress. \n<b>Only bad points</b> :  no menu advertised at the Palais entrance...\nCan be improved ;)",       "I'm sure it's spectacular, but you can't see it behind the high walls, and if you do try and go in, it's a hell of a long wait."    ],     "sentiment": {      "avg_sentiment": 0.26592000000000005,       "most_negative": [        "I'm sure it's spectacular, but you can't see it behind the high walls, and if you do try and go in, it's a hell of a long wait.",         -0.775      ],       "most_positive": [        "Fries are good. Definitely a good adress. \n<b><i>Only bad point</i></b> :  no menu advertised at the Palais entrance...\nCan be improved ;)",         0.7783      ],       "overall": "positve"    }  },   {    "images": [      "https://live.staticflickr.com/65535/47074938624_b2e51117a9_z.jpg",       "https://live.staticflickr.com/3018/2838735369_facb6a4a88_z.jpg",       "https://live.staticflickr.com/5269/5689412487_fc3a42263d_z.jpg",       "https://live.staticflickr.com/65535/32742850737_77fbb95e88_z.jpg",       "https://live.staticflickr.com/3795/10891671466_cce1d0a488_z.jpg",       "https://live.staticflickr.com/65535/48962091266_f86e503409_z.jpg",       "https://live.staticflickr.com/65535/48962092826_4a1b101f66_z.jpg",       "https://live.staticflickr.com/5781/22614157649_80126d81a1_z.jpg",       "https://live.staticflickr.com/617/21497003340_c114b2e460_z.jpg",       "https://live.staticflickr.com/1577/26116604205_c182518c81_z.jpg"    ],     "name": "Palais de Chaillot",     "reviews": [      "We finally made it to Europe! Although we won\u2019t be able to explore other nearby countries we are glad to be here. Right now is considered the slow season for tourists since many do not opt for the cold/rainy weather here in Paris. However, it is very popular as it gets closer to Christmas and New Years Eve. We were lucky to find cheap flights from hopper that got us to France prior to the busier time of the month which was nice. There were strikes going on that were interfering with public transportation which also led to a decrease in tourists. Because of that we opted to walk everywhere which gave us the opportunity to see and experience the city from different perspectives. This location is very popular for viewing the Eiffel Tower and was taken from the Palais de Chaillot which is very common for a more full view of the tower. We recommend going early in the morning to beat the crowds. We were one of 5-6 other people at the time and actually got to witness a proposal taking place! While walking around we have also been able to see the tower through the streets of the city which is a more unique perspective and is what is pictured in the other photo. Because of Paris being such a touristy location it is easy to forget how many people live here and see the tower as just another structure on their way to school or work.\n- @wanderingwithustwo",       "An excellent place start the visit to Eiffel Tower.  You have a commending view of the tower from distance overlooking this iconic Paris attraction.  The walk through the garden and crossing the bridge over river Seine towards the tower is very enjoyable.",       "Great place for views of the Eiffel Tower! Just beware of anyone approaching you asking you to sign something, or trying to talk to you in any way. There are also betting scams here. Overall enjoy the sight but be vigilant and not overly trusting.",       "The Palais definitely offers one of the best views of the Eiffel Tower in the city and panorama around the site. \n\nBecause of how well-known the Palais is to tourists, it does get really busy during the day and it could distract from the beauty of the Palais and it\u2019s a little difficult to get a nice photo with the crowds. \n\nHowever, it\u2019s a must-see spot to visit in Paris and coming here in the early morning around sunrise would be the best time to visit and avoid the crowds.",       "Highly recommend coming here to take a picture of the Eiffel Tower if you want it in full glory. Can get very busy with so many tourists. Beautiful fountains and the building is impressive. Street traders are an issue though with many trying to harass you for sales and money."    ],     "sentiment": {      "avg_sentiment": 0.76544,       "most_negative": [        "Great place for views of the Eiffel Tower! Just beware of anyone approaching you asking you to sign something, or trying to talk to you in any way. There are also betting scams here. Overall enjoy the sight but be vigilant and not overly trusting.",         0.1791      ],       "most_positive": [        "We finally made it to Europe! Although we won\u2019t be able to explore other nearby countries we are glad to be here. Right now is considered the slow season for tourists since many do not opt for the cold/rainy weather here in Paris. However, it is very popular as it gets closer to Christmas and New Years Eve. We were lucky to find cheap flights from hopper that got us to France prior to the busier time of the month which was nice. There were strikes going on that were interfering with public transportation which also led to a decrease in tourists. Because of that we opted to walk everywhere which gave us the opportunity to see and experience the city from different perspectives. This location is very popular for viewing the Eiffel Tower and was taken from the Palais de Chaillot which is very common for a more full view of the tower. We recommend going early in the morning to beat the crowds. We were one of 5-6 other people at the time and actually got to witness a proposal taking place! While walking around we have also been able to see the tower through the streets of the city which is a more unique perspective and is what is pictured in the other photo. Because of Paris being such a touristy location it is easy to forget how many people live here and see the tower as just another structure on their way to school or work.\n- @wanderingwithustwo",         0.9594      ],       "overall": "positve"    }  },   {    "images": [      "https://live.staticflickr.com/7923/32532116427_e6a5c135a8_z.jpg",       "https://live.staticflickr.com/65535/49628474752_8fac94f176_z.jpg",       "https://live.staticflickr.com/161/356972934_064d6d5076_z.jpg",       "https://live.staticflickr.com/65535/48480577016_aa9282008d_z.jpg",       "https://live.staticflickr.com/7626/16794956551_3aa0452fb8_z.jpg",       "https://live.staticflickr.com/7921/32524866067_9155a71e75_z.jpg",       "https://live.staticflickr.com/4227/34527551204_3d500b6faa_z.jpg",       "https://live.staticflickr.com/65535/48893024112_3185a736fc_z.jpg",       "https://live.staticflickr.com/4026/4589038396_3dce50c27e_z.jpg",       "https://live.staticflickr.com/3323/3613561917_1c25879d81_z.jpg"    ],     "name": "Palais de Tokyo",     "reviews": [      "This is an interesting museum of contemporary art. The entry to the exhibition was 12\u20ac. The space is huge so make sure to take enough time to see it all. There is a very fancy restaurant as well. If you like contemporary art, this is a good museum to visit.",       "Surprising variety of a modern to contemporary collection spanning the early 20th century to today.  Also a nice surprise that admission to the main collection is free.  Painting sculpture and even media with a wide range of themes.  Definitely worth a visit.  A perfect example of the french providing art to the public for cultural enhancement and preservation.  Come with an open mind and perhaps you will leave with one a bit more open and enhanced!  Enjoy.",       "One of my favorite art museums ever. Staff is funny and nice, art is strange and interesting, and the performances are great. The building itself is very cool and original too. I always come back whenever I'm in Paris.",       "The Palais de Tokyo is a phenomenal contemporary art exhibition space. It's 100% temporary exhibitions, no permanent collection, so your experience will vary wildly. But every time I've been there I've been blown away by the exhibitions. I'm a huge contemporary art fan, and this is a MUST GO location every time I visit Paris. It's also right next to the Modern Art museum so you can get both done in one visit.\n\nThe Palais de Tokyo is also open pretty late (till midnight often) so it's a great way to get this in after other museums close and has a cool atmosphere at night depending on the exhibit.",       "Amazing lively museum, differing a lot from the stereotype. There is a caf\u00e9 with lots of people chatting, people skating on the patio, and of course thoughtful expositions in its huge space. The location is also great to put it as an afternoon activity in a day of exploration of Paris, being neighbor of the Eiffel tower, Trocadero gardens, etc. Recommend it!"    ],     "sentiment": {      "avg_sentiment": 0.9397400000000001,       "most_negative": [        "The Palais de Tokyo is a phenomenal contemporary art exhibition space. It's 100% temporary exhibitions, no permanent collection, so your experience will vary wildly. But every time I've been there I've been blown away by the exhibitions. I'm a huge contemporary art fan, and this is a MUST GO location every time I visit Paris. It's also right next to the Modern Art museum so you can get both done in one visit.\n\nThe Palais de Tokyo is also open pretty late (till midnight often) so it's a great way to get this in after other museums close and has a cool atmosphere at night depending on the exhibit.",         0.9058      ],       "most_positive": [        "Surprising variety of a modern to contemporary collection spanning the early 20th century to today.  Also a nice surprise that admission to the main collection is free.  Painting sculpture and even media with a wide range of themes.  Definitely worth a visit.  A perfect example of the french providing art to the public for cultural enhancement and preservation.  Come with an open mind and perhaps you will leave with one a bit more open and enhanced!  Enjoy.",         0.9633      ],       "overall": "positve"    }  }]);
        // setResultState(SearchResultsStatus.LOADING);
        // fetchResults(searchCity, searchTopics).then(data => {
        //     if (!data || !data["length"] || data["length"] < 1) {
        //         setResultState(SearchResultsStatus.NO_RESULT);
        //     } else {
        //         setResultState(SearchResultsStatus.RESULT);
        //         setResults(data);
        //     }
        // }).catch((r) => {
        //     setResultState(SearchResultsStatus.ERROR);
        //     console.error("This is the error that is reported:", r);
        // });
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
          overflow-y: auto;
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
