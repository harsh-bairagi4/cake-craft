import { useRef, useEffect } from "react";
import "./DemoVideo.css";
import { assets } from "../../assets/assets";

const DemoVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <section className="demo">
      <div className="demo-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={assets.poster}
          >
            <source src={assets.demo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;