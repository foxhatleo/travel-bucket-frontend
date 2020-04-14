import {FunctionComponent} from "react";
import FullImageBackground from "../components/FullImageBackground";

const HomeScreen: FunctionComponent = () => {
    return <div>
        <FullImageBackground url={"bg/home-bg1.jpg"} />
        <style jsx>{`
        div {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        `}</style>
    </div>;
};

export default HomeScreen;
