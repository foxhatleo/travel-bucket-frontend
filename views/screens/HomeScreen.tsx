import {FunctionComponent} from "react";
import FullImageBackground from "../components/FullImageBackground";

const HomeScreen: FunctionComponent = () => {
    return <div className={"container"}>
        <div className={"bg"}>
            <FullImageBackground url={"bg/home-bg1.jpg"} />
        </div>
        <div className={"search"}>
            <div className={"bg1"} />
            <div className={"bg2"} />
            <div className={"search-inner"}>
                <div className={"subtext"}>FIND YOURSELF IN TRAVEL</div>
                <h1>Travel Bucket</h1>
            </div>
        </div>
        <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .search {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 30%;
        }
        .search .bg1 {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 25%;
          background: rgb(0,0,0);
          background: linear-gradient(
            to left,
            hsla(0, 100%, 100%, 0.8) 0%,
            hsla(0, 100%, 100%, 0.79) 8.1%,
            hsla(0, 100%, 100%, 0.761) 15.5%,
            hsla(0, 100%, 100%, 0.717) 22.5%,
            hsla(0, 100%, 100%, 0.66) 29%,
            hsla(0, 100%, 100%, 0.593) 35.3%,
            hsla(0, 100%, 100%, 0.518) 41.2%,
            hsla(0, 100%, 100%, 0.44) 47.1%,
            hsla(0, 100%, 100%, 0.36) 52.9%,
            hsla(0, 100%, 100%, 0.282) 58.8%,
            hsla(0, 100%, 100%, 0.207) 64.7%,
            hsla(0, 100%, 100%, 0.14) 71%,
            hsla(0, 100%, 100%, 0.083) 77.5%,
            hsla(0, 100%, 100%, 0.039) 84.5%,
            hsla(0, 100%, 100%, 0.01) 91.9%,
            hsla(0, 100%, 100%, 0) 100%
          );
        }
        .search .bg2 {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 75%;
          right: 0;
          background: rgba(255,255,255,0.8);
        }
        .search-inner {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          text-align: right;
          width: 100%;
          padding: 20px;
        }
        .subtext {
          font-weight: 700;
          letter-spacing: 2px;
        }
        h1 {
          margin-top: 10px;
          font-size: 50px;
          font-weight: 300;
        }
        @media screen and (max-width: 550px) {
          .bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 60%;
          }
          .search {
            top : 40%;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .search .bg1 {
            top: 0;
            left: 0;
            right: 0;
            bottom: unset;
            background: linear-gradient(
              to bottom,
              hsla(0, 0%, 100%, 0) 0%,
              hsla(0, 0%, 100%, 0.013) 8.1%,
              hsla(0, 0%, 100%, 0.049) 15.5%,
              hsla(0, 0%, 100%, 0.104) 22.5%,
              hsla(0, 0%, 100%, 0.175) 29%,
              hsla(0, 0%, 100%, 0.259) 35.3%,
              hsla(0, 0%, 100%, 0.352) 41.2%,
              hsla(0, 0%, 100%, 0.45) 47.1%,
              hsla(0, 0%, 100%, 0.55) 52.9%,
              hsla(0, 0%, 100%, 0.648) 58.8%,
              hsla(0, 0%, 100%, 0.741) 64.7%,
              hsla(0, 0%, 100%, 0.825) 71%,
              hsla(0, 0%, 100%, 0.896) 77.5%,
              hsla(0, 0%, 100%, 0.951) 84.5%,
              hsla(0, 0%, 100%, 0.987) 91.9%,
              hsl(0, 0%, 100%) 100%
            );
            height: 33%;
          }
          .search .bg2 {
            top: 33%;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
          }
        }
        `}</style>
    </div>;
};

export default HomeScreen;
