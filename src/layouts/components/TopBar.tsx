import { Button } from "@/components/ui/button.tsx";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export const TopBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    console.log("auth", auth);
    if (auth && auth.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
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
        {/*<CommandSearch commands={commands} />*/}
        <div className={"flex space-x-5 items-center"}>
          <button className={"hover:bg-accent p-1 rounded-md"}>
            <Mail size={32} />
          </button>
          {isLoggedIn ? (
            <Avatar className={"cursor-pointer"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div>
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

          {/*<Avatar className={"cursor-pointer"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>*/}
        </div>
      </div>
    </div>
  );
};
