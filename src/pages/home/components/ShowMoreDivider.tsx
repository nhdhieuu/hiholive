import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ShowMoreDividerProps {
  onShowMore?: () => void;
  isShowMore?: boolean;
}

export default function ShowMoreDivider({
  onShowMore,
  isShowMore,
}: ShowMoreDividerProps) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onShowMore}
        className="h-auto gap-1 px-2 py-1 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      >
        {isShowMore ? "Show Less" : "Show More"}
        {isShowMore ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>{" "}
      <Separator className="flex-1" />
    </div>
  );
}
