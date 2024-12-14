import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

// Define types for the props
interface VideoJSProps {
  options: {
    autoplay?: boolean;
    sources: { src: string; type: string }[];
    controlBar?: {
      progressControl: boolean;
      remainingTimeDisplay: boolean;
      durationDisplay: boolean;
      currentTimeDisplay: boolean;
    };
  };
  onReady?: (player: Player) => void;
}

export const VideoJS = ({ options, onReady }: VideoJSProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // Effect to initialize the player
  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoElement.classList.add("vjs-live"); // Add live UI class
      videoRef.current?.appendChild(videoElement);

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
          if (onReady) {
            onReady(player); // Explicitly call onReady if defined
          }
        },
      ));
    } else {
      const player = playerRef.current;
      if (options.autoplay !== undefined) {
        player.autoplay(options.autoplay); // Correct type usage
      }
      player.src(options.sources);
    }
  }, [options, onReady]); // Add 'onReady' to the dependency array

  // Cleanup effect to dispose the player
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
