import "./App.css";
import { MainRoute } from "@/routes/MainRoute.tsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSocketStore } from "./stores/useSocket";

function App() {
  const { socket, setSocket } = useSocketStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSocket(token);
    }
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("authentication", {
        token: JSON.parse(localStorage.getItem("token") || ""),
      });
      socket.on("authentication", (data) => {
        console.log("Authenticated successfully:", data);
      });
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
