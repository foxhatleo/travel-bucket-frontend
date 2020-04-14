import React, {FunctionComponent} from "react";

export type FullImageBackgroundProps = {
    url: string;
};

const FullImageBackground: FunctionComponent<FullImageBackgroundProps> = (p) => (
    <div>
        <style jsx>{`
        div {
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(${p.url}) no-repeat center center fixed; 
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }
        `}</style>
    </div>
);

export default FullImageBackground;
