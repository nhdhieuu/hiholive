import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const StreamVideoJS = ({ sources }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // Create Quality Selector Plugin
      const Plugin = videojs.getPlugin("plugin");
      class QualitySelector extends Plugin {
        constructor(player, options) {
          super(player);

          // Make sure to bind player to this context
          this.player = player;
          this.sources = options.sources || [];
          this.currentQuality = 0;

          // Wait for the player to be ready before setting up the quality menu
          this.player.ready(() => {
            this.setupQualityMenu();
          });
        }

        setupQualityMenu() {
          const MenuButton = videojs.getComponent("MenuButton");
          const MenuItem = videojs.getComponent("MenuItem");

          // Create custom MenuItem class
          class QualityMenuItem extends MenuItem {
            constructor(player, options) {
              super(player, {
                label: options.label,
                selectable: true,
                selected: options.selected || false,
              });
              this.resolution = options.resolution;
              this.sources = options.sources;
            }

            handleClick() {
              const items = this.player().controlBar.qualityMenu.items || [];
              items.forEach((item) => item.selected(false));
              this.selected(true);

              // Save current time and playing state
              const currentTime = this.player().currentTime();
              const wasPlaying = !this.player().paused();
              console.log(`Selected quality: ${this.options_.label}`);

              // Change source
              this.player().src({
                src: this.sources[this.resolution].src,
                type: this.sources[this.resolution].type,
              });

              // Restore time and playing state
              this.player().one("loadeddata", () => {
                this.player().currentTime(currentTime);
                if (wasPlaying) {
                  this.player().play();
                }
              });
            }
          }

          // Create custom MenuButton class
          class QualityMenuButton extends MenuButton {
            constructor(player, options) {
              super(player, options);
              videojs.dom.addClass(this.el(), "vjs-quality-selector");
            }

            createItems() {
              return this.options_.sources.map((source, index) => {
                return new QualityMenuItem(this.player_, {
                  label: source.label,
                  resolution: index,
                  selected: index === 0,
                  sources: this.options_.sources,
                });
              });
            }
          }

          // Register components
          videojs.registerComponent("QualityMenuButton", QualityMenuButton);
          videojs.registerComponent("QualityMenuItem", QualityMenuItem);

          // Add quality menu button to control bar
          const controlBar = this.player.getChild("controlBar");
          if (controlBar) {
            controlBar.addChild("QualityMenuButton", {
              sources: this.sources,
            });
          }
        }
      }

      // Register plugin
      videojs.registerPlugin("qualitySelector", QualitySelector);

      // Initialize player
      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        responsive: true,
        plugins: {
          qualitySelector: {
            sources: sources,
          },
        },
      });

      // Set initial source
      playerRef.current.src({
        src: sources[0].src,
        type: sources[0].type,
      });
    }
  }, [sources]);

  // Cleanup
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
