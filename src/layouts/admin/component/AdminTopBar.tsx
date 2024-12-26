import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export const AdminTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 border">
      <div className="flex justify-between items-center p-5 bg-background">
        <Button
          variant={"ghost"}
          className={"text-2xl font-bold"}
          onClick={() => {
            navigate("/");
          }}
        >
          HIHOLIVE
        </Button>
      </div>
    </div>
  );
};
