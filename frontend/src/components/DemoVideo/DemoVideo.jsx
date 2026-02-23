import { useRef } from "react";
import "./DemoVideo.css";

const DemoVideo = () => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <section className="demo">
      <div className="demo-container">
        <div
          className="video-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            preload="metadata"
            poster="/poster.png"
            muted
            loop
            playsInline
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;