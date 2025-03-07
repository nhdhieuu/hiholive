import { Button } from "@/components/ui/button.tsx";
import { LogOut, Mail, Settings, Tv, User, Video } from "lucide-react";
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
} from "@/components/ui/dropdown-menu.tsx";
import { ChannelSettingModal } from "@/layouts/user/components/ChannelSettingModal.tsx";
import { StreamDialog } from "./StreamDialog.tsx";
import { SearchBar } from "@/layouts/user/components/SearchBar.tsx";
import { useUserProfile } from "@/stores/useUserProfile.ts";
import { ProfileSettingModal } from "@/layouts/user/components/ProfileSettingModal.tsx";
import { ChannelUpdateModal } from "@/layouts/user/components/ChannelUpdateModal.tsx";

export const TopBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showChannelDialog, setShowChannelDialog] = useState<boolean>(false);
  const [showStreamDialog, setShowStreamDialog] = useState<boolean>(false);
  const [showSettingDialog, setShowSettingDialog] = useState<boolean>(false);
  const [showChannelUpdateDialog, setShowChannelUpdateDialog] =
    useState<boolean>(false);
  const { userProfile, clearUserProfile } = useUserProfile();
  useEffect(() => {
    console.log("Userprofile: ", userProfile);
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
    window.location.reload();
    clearUserProfile();
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
          {userProfile?.SystemRole === "admin" && (
            <div className="flex items-center space-x-2">
              <Button
                className="px-4 py-2"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Quản lý
              </Button>
            </div>
          )}
          <button className={"hover:bg-accent p-1 rounded-md"}>
            <Mail size={32} />
          </button>
          {isLoggedIn ? (
            <div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={userProfile?.avatar?.url || ""}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div
                    className="flex items-center gap-2 p-2 hover:bg-gray-50"
                    onClick={() => {
                      if (userProfile?.SystemRole === "viewer") {
                        setShowChannelDialog(true);
                      } else {
                        navigate(`/channel/${userProfile?.user_name}`);
                      }
                    }}
                  >
                    <Avatar>
                      <AvatarImage
                        src={userProfile?.avatar?.url || ""}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {userProfile?.display_name}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />

                  {userProfile?.SystemRole === "viewer" && (
                    <DropdownMenuItem
                      onSelect={() => setShowChannelDialog(true)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Tạo kênh</span>
                    </DropdownMenuItem>
                  )}
                  {userProfile?.SystemRole === "streamer" && (
                    <DropdownMenuItem
                      onSelect={() => {
                        setShowChannelUpdateDialog(true);
                      }}
                    >
                      <Tv className="mr-2 h-4 w-4" />
                      <span>Thông tin kênh</span>
                    </DropdownMenuItem>
                  )}
                  {userProfile?.SystemRole === "streamer" && (
                    <DropdownMenuItem
                      onSelect={() => {
                        setShowStreamDialog(true);
                      }}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      <span>Trình tạo Stream</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onSelect={() => {
                      setShowSettingDialog(true);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Cài đặt tài khoản</span>
                  </DropdownMenuItem>
                  {/*<DropdownMenuItem>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Ngôn ngữ</span>
                  </DropdownMenuItem>*/}
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
              <ProfileSettingModal
                isOpen={showSettingDialog}
                onOpenChange={setShowSettingDialog}
              />
              <ChannelUpdateModal
                open={showChannelUpdateDialog}
                onOpenChange={setShowChannelUpdateDialog}
              />
            </div>
          ) : (
            <div className={"space-x-5"}>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
