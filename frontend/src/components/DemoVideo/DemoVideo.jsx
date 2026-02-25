import { useRef, useEffect } from "react";
import "./DemoVideo.css";

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
            poster="/poster.png"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;