import "./App.css";
import { MainRoute } from "@/routes/MainRoute.tsx";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "@/common/constant.ts";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(SOCKET_BASE_URL, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log(socket.connected);
    });
    if (token) {
      socket.emit("authentication", { token: JSON.parse(token) });
      socket.on("authentication", (data) => {
        console.log("Đã xác thực thành công:", data);
      });
    }
  }, []);
  return (
    <main>
      <MainRoute />
      <ToastContainer />
    </main>
  );
}

export default App;
