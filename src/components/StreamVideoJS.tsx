import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import videojs, { VideoJsPlayer, VideoJsPlayerPluginOptions } from "video.js";
import "video.js/dist/video-js.css";

interface Source {
  src: string;
  type: string;
  label: string;
}

interface StreamVideoJSProps {
  sources: Source[];
}

const StreamVideoJS = ({ sources }: StreamVideoJSProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const Plugin = videojs.getPlugin("plugin");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      class QualitySelector extends Plugin {
        player: VideoJsPlayer;
        sources: Source[];
        currentQuality: number;

        constructor(
          player: VideoJsPlayer,
          options: VideoJsPlayerPluginOptions,
        ) {
          super(player, options);
          this.player = player;
          this.sources = options.sources || [];
          this.currentQuality = 0;

          this.player.ready(() => {
            this.setupQualityMenu();
          });
        }

        setupQualityMenu() {
          const MenuButton = videojs.getComponent("MenuButton");
          const MenuItem = videojs.getComponent("MenuItem");

          class QualityMenuItem extends MenuItem {
            resolution: number;
            sources: Source[];

            constructor(player: VideoJsPlayer, options: never) {
              super(player, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                label: options.label,
                selectable: true,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                selected: options.selected || false,
              });
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              this.resolution = options.resolution;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              this.sources = options.sources;
            }

            handleClick() {
              const items =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                this.player().controlBar.getChild("qualityMenuButton").items ||
                [];
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              items.forEach((item: never) => item.selected(false));
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              this.selected(true);

              const currentTime = this.player().currentTime();
              const wasPlaying = !this.player().paused();
              console.log(`Selected quality: ${this.options_.label}`);

              this.player().src({
                src: this.sources[this.resolution].src,
                type: this.sources[this.resolution].type,
              });

              this.player().one("loadeddata", () => {
                this.player().currentTime(currentTime);
                if (wasPlaying) {
                  this.player().play();
                }
              });
            }
          }

          class QualityMenuButton extends MenuButton {
            constructor(player: VideoJsPlayer, options: never) {
              super(player, options);
              videojs.dom.addClass(this.el(), "vjs-quality-selector");
            }

            createItems() {
              return this.options_.sources.map(
                (source: Source, index: number) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  return new QualityMenuItem(this.player_, {
                    label: source.label,
                    resolution: index,
                    selected: index === 0,
                    sources: this.options_.sources,
                  });
                },
              );
            }
          }

          videojs.registerComponent("QualityMenuButton", QualityMenuButton);
          videojs.registerComponent("QualityMenuItem", QualityMenuItem);

          const controlBar = this.player.getChild("controlBar");
          if (controlBar) {
            controlBar.addChild("QualityMenuButton", {
              sources: this.sources,
            });
          }
        }
      }

      videojs.registerPlugin("qualitySelector", QualitySelector);

      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        responsive: true,
        autoplay: true, // Added autoplay option
        plugins: {
          qualitySelector: {
            sources: sources,
          },
        },
      });

      playerRef.current.src({
        src: sources[0].src,
        type: sources[0].type,
      });
    }
  }, [sources]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default StreamVideoJS;
