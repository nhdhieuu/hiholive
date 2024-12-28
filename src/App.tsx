import "./App.css";
import { MainRoute } from "@/routes/MainRoute.tsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSocketStore } from "./stores/useSocket";

function App() {
  const { socket, setSocket } = useSocketStore();
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSocket();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit(
        "user:authentication",
        JSON.parse(token as string),
        (data: unknown) => {
          console.log("Authenticated successfully:", data);
        },
      );
    }
  }, [socket]);
  return (
    <main>
      <MainRoute />
      <ToastContainer />
    </main>
  );
}

export default App;
