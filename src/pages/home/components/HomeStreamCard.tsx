import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeStreamCard() {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full overflow-hidden bg-background hover:bg-gray-50"
      onClick={() => {
        navigate("/streaming");
      }}
    >
      {/* Stream Preview Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-red-600 px-2 py-1 text-white">
          <div className="h-2 w-2 rounded-full bg-white" />
          LIVE
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Eye className="h-4 w-4" />
          <span>18K viewers</span>
        </div>
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=250&width=400')`,
            backgroundColor: "#1a1a1a",
          }}
        >
          {/* Purple neon overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent" />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>TW</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="line-clamp-1 font-semibold">
              🚨 EXCLUSIVE DROP - AK47 BLUE GEM
            </h3>
            <p className="text-sm text-muted-foreground">Trainwreckstv</p>
            <p className="text-sm text-muted-foreground">Rust</p>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary" className="rounded-full">
                DropsEnabled
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                English
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
