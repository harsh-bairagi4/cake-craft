import React from "react";
import "./DemoVideo.css";

const DemoVideo = () => {
  return (
    <section className="demo">
      <div className="demo-container">
        <h2 className="demo-title">
          See How It Works
        </h2>
        <p className="demo-subtitle">
          Watch how a simple idea turns into a cake created by you.
        </p>

        <div className="video-wrapper">
          <video
            controls
            preload="metadata"
            poster="/video-poster.jpg"
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
