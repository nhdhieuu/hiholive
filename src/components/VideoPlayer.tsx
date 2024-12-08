import React, { useEffect, useRef } from "react";
import shaka from "shaka-player";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const player = new shaka.Player(video);

    player
      .load(src)
      .then(() => console.log("Video loaded successfully!"))
      .catch((err) => console.error("Error loading video", err));
    return () => {
      player.destroy();
    };
  }, [src]);

  return <video ref={videoRef} controls width="100%" />;
};

export default VideoPlayer;
