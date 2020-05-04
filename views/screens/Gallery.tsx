import {FunctionComponent, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Lightbox from "react-image-lightbox";
import {SearchResult} from "../screens/SearchScreen";

export const Gallery: FunctionComponent<{result: SearchResult | null; onClose: () => void;}> = (p) => {
    const { result } = p;
    const { images } = result || {};
    const isIn = !!(result && images);
    const [lightboxIndex, setlightboxIndex] = useState<number>(-1);
    return <div>
        <CSSTransition in={isIn} timeout={200} classNames="fade">
            {isIn ? <div className={"gallery"}>
                <a className={"block"} key={-1} href={"#"} onClick={(e) => {
                    e.preventDefault();
                    p.onClose();
                }}><span>Go Back</span></a>
                {images.map((r, i) =>
                    <button
                        className={"block"}
                        key={i} 
                        onClick={() => {
                            setlightboxIndex(i);
                        }}
                        style={{
                            cursor: "pointer",
                            backgroundImage: `url(${r["url"]})`
                        }} 
                    />
                )}
            </div> : <></>}
        </CSSTransition>
        {lightboxIndex !== -1 && 
        <Lightbox
            mainSrc={images[lightboxIndex]["url"]}
            onCloseRequest={() => setlightboxIndex(-1)}
            nextSrc={images[(lightboxIndex + 1) % images.length]}
            prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
            onMovePrevRequest={() =>
                setlightboxIndex((lightboxIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
                setlightboxIndex((lightboxIndex + 1) % images.length)
            }
        />}
        <style jsx>{`
        .gallery {
          position: fixed;
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: black;
          background: rgba(0, 0, 0, .5);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }
        .block {
          // width: 25vw
          flex: 1 0 21%;
          height: 25vw;
          display: inline-block;
          position: relative;
          margin: 0;
          padding: 0;
          background: black no-repeat center center; 
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          text-decoration: none;
          color: white;
          font-size: 20px;
        }
        .block:hover span {
          color: #fff;
        }
        .block:active span {
          color: #999;
        }
        .block span {
          position: absolute;
          top: 50%;
          left: 50%;
          color: #ccc;
          transition: .3s ease-in-out color;
          transform: translate(-50%, -50%);
        }
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
        @media (max-width: 600px) {
          .block {
            width: 50vw;
            height: 50vw;
          }
        }
        `}</style>
    </div>;
};
