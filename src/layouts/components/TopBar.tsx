import { Button } from "@/components/ui/button.tsx";
import { Globe, LogOut, Mail, Settings, User, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChannelSettingModal } from "@/layouts/components/ChannelSettingModal.tsx";
import { StreamDialog } from "./StreamDialog";
import { SearchBar } from "@/layouts/components/SearchBar.tsx";

export const TopBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showChannelDialog, setShowChannelDialog] = useState<boolean>(false);
  const [showStreamDialog, setShowStreamDialog] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    console.log("auth", auth);
    if (auth && auth.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handlelogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div className="sticky top-0 z-50 border">
      <div className="flex justify-between items-center p-5 bg-background">
        <Button
          variant={"ghost"}
          className={"text-2xl font-bold"}
          onClick={() => {
            navigate("");
          }}
        >
          HIHOLIVE
        </Button>
        <SearchBar></SearchBar>
        {/*<CommandSearch commands={commands} />*/}
        <div className={"flex space-x-5 items-center"}>
          <button className={"hover:bg-accent p-1 rounded-md"}>
            <Mail size={32} />
          </button>
          {isLoggedIn ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">nhdhieuu</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setShowChannelDialog(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Kênh</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {
                      setShowStreamDialog(true);
                    }}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    <span>Trình tạo Stream</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Ngôn ngữ</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handlelogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ChannelSettingModal
                open={showChannelDialog}
                onOpenChange={setShowChannelDialog}
              />
              <StreamDialog
                isOpen={showStreamDialog}
                onOpenChange={setShowStreamDialog}
              />
            </div>
          ) : (
            <div className={"space-x-5"}>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
