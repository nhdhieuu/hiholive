import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SearchStreamCard from "@/pages/search/components/SearchStreamCard.tsx";
import SearchChannel from "@/pages/search/components/SearchChannel.tsx";
import SearchPreviousVideo from "@/pages/search/components/SearchPreviousVideo.tsx";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 space-y-6">
      {/* Live Channels Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Các kênh trực tiếp được gắn thẻ 123
        </h2>
        <SearchStreamCard></SearchStreamCard>
        <SearchStreamCard></SearchStreamCard>
        {/* Add more live channels as needed */}
      </section>

      {/* Featured Channel */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Kênh</h2>
        <SearchChannel></SearchChannel>
        <SearchChannel></SearchChannel>
      </section>

      {/* Categories Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Danh mục</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4"></div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      {/* Recent Videos */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Video trước đây</h2>
        <SearchPreviousVideo></SearchPreviousVideo>
        <SearchPreviousVideo></SearchPreviousVideo>
        <SearchPreviousVideo></SearchPreviousVideo>
      </section>
    </div>
  );
}
