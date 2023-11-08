import React, { useEffect, useRef } from "react";
import video from "../assets/bg1.mp4";

function Videopage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    videoElement.muted = true; // Mute the video for autoplay
    videoElement
      .play()
      .then(() => {
        // Video has started playing
      })
      .catch((error) => {
        console.error("Error autoplaying video:", error);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} src={video} width="100%" height="100%" />
    </div>
  );
}

export default Videopage;
