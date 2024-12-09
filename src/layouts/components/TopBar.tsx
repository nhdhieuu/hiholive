import { Button } from "@/components/ui/button.tsx";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const commands = [
    { value: "calendar", label: "Calendar" },
    { value: "search-emoji", label: "Search Emoji" },
    { value: "calculator", label: "Calculator" },
  ];
  const navigate = useNavigate();

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
          {/*<Avatar className={"cursor-pointer"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>*/}
        </div>
      </div>
    </div>
  );
};
