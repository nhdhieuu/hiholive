import ChannelInfo from "./components/ChannelInfo.tsx";
import ClipsSection from "./components/ClipSection";
import { useParams } from "react-router-dom";

export default function ChannelPage() {
  const { id } = useParams<{ id: string }>();
  console.log("Channel ID:", id);
  return (
    <div>
      {/* Main Content */}
      <main className=" mx-auto px-4 py-2">
        <div className="relative">
          <div className="h-[500px] relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src="https://placehold.co/600x400?text=Hiholive"
              alt="Stream Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-20 px-4">
            <ChannelInfo />
          </div>
        </div>
        <ClipsSection />
      </main>
    </div>
  );
}
