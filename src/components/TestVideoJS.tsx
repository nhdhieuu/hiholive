/*
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const TestVideoPlayer = ({ id }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const videoSources = [
    {
      src: `https://content.hiholive.fun/${id}/master.m3u8`,
      type: "application/x-mpegURL",
      label: "auto",
    },
    {
      src: `https://content.hiholive.fun/${id}/index-1080p60.m3u8`,
      type: "application/x-mpegURL",
      label: "1080",
    },
    {
      src: `https://content.hiholive.fun/${id}/index-720p60.m3u8`,
      type: "application/x-mpegURL",
      label: "720",
    },
  ];

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      playerRef.current = videojs(
        videoElement,
        {
          autoplay: true,
          controls: true,
          responsive: true,
          fluid: true,
          liveui: true,
          html5: {
            hls: {
              enableLowInitialPlaylist: true,
              smoothQualityChange: true,
            },
          },
          sources: videoSources,
        },
        () => {
          // Thêm quality selector vào cuối control bar
          const controlBar = playerRef.current.controlBar;
          const qualitySelector = controlBar.addChild("MenuButton", {});
          qualitySelector.addClass("vjs-quality-selector");
          qualitySelector.controlText("Quality");

          // Di chuyển quality selector đến cuối
          controlBar.el().appendChild(qualitySelector.el());

          const menuItems = videoSources.map((source) => {
            return qualitySelector.addChild("MenuItem", {
              label: source.label,
              handler: () => {
                // Update selected source
                playerRef.current.src({
                  src: source.src,
                  type: source.type,
                });
                // Start playing
                playerRef.current.play();
              },
            });
          });
        },
      );
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [id]);

  return (
    <div className="w-full aspect-video">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default TestVideoPlayer;
*/
