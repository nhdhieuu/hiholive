import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  controls?: boolean;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({
  src,
  poster,
  width = "100%",
  height = "auto",
  controls = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest loaded successfully");
        // Auto play when manifest is loaded
        videoRef.current
          ?.play()
          .then(() => {
            videoRef.current!.currentTime = 0;
          })
          .catch((error) => {
            console.warn("Auto-play failed:", error);
          });
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error(`HLS.js error: ${data.type} - ${data.details}`, data);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      // Handle native HLS playback
      videoRef.current
        .play()
        .then(() => {
          videoRef.current!.currentTime = 0;
        })
        .catch((error) => {
          console.warn("Auto-play failed:", error);
        });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      controls={controls}
      style={{ width, height }}
    />
  );
};

export default HlsPlayer;
