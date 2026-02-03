import React from "react";
import "./DemoVideo.css";

const DemoVideo = () => {
  return (
    <section className="demo">
      <div className="demo-container">
        <div className="video-wrapper">
          <video
            controls
            preload="metadata"
            poster="/video-poster.jpg"
            src="/veloria.mp4"
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
