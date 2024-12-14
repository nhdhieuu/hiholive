import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoElement.classList.add("vjs-live"); // Add live UI class
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          liveui: true, // Enable live UI
          liveTracker: {
            trackingThreshold: 0,
            liveTolerance: 15,
          },
          controlBar: {
            ...options.controlBar,
            progressControl: false, // Hide progress bar
            remainingTimeDisplay: false, // Hide remaining time
            durationDisplay: false, // Hide duration
            currentTimeDisplay: false, // Hide current time
          },
        },
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        },
      ));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
