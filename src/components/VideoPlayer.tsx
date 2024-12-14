/*
import React, { useEffect, useRef } from "react";
import shaka from "shaka-player";
import "shaka-player/dist/controls.css"; // Import CSS UI

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const uiContainer = uiContainerRef.current;

    if (!video || !uiContainer || !src) return;

    // Initialize Shaka Player
    const player = new shaka.Player(video);

    // Initialize Shaka UI Overlay
    const ui = new shaka.ui.Overlay(player, uiContainer, video);

    // Configure UI
    const uiConfig = {
      addSeekBar: false, // Disable seek bar
      controlPanelElements: [
        "play_pause",
        "mute",
        "volume",
        "fullscreen",
        "live",
      ], // Enable live icon
    };
    ui.configure(uiConfig);

    // Load the video source
    player
      .load(src)
      .then(() => console.log("Video loaded successfully!"))
      .catch((err) => console.error("Error loading video", err));

    return () => {
      // Cleanup resources
      ui.destroy();
      player.destroy();
    };
  }, [src]);

  return (
    <div ref={uiContainerRef} style={{ position: "relative", width: "100%" }}>
      <video ref={videoRef} style={{ width: "100%" }} controls />
    </div>
  );
};

export default VideoPlayer;
*/
