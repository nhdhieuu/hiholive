import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ShowMoreDividerProps {
  onShowMore?: () => void;
}

export default function ShowMoreDivider({ onShowMore }: ShowMoreDividerProps) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowMore}
        className="h-auto gap-1 px-2 py-1 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      >
        Show more
        <ChevronDown className="h-4 w-4" />
      </Button>{" "}
      <Separator className="flex-1" />
    </div>
  );
}
