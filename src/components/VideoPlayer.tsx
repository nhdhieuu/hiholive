import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  src: string; // URL của video HLS
  poster?: string; // Hình ảnh hiển thị trước khi phát video
  width?: string; // Chiều rộng của video
  height?: string; // Chiều cao của video
  controls?: boolean; // Hiển thị điều khiển hay không
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
