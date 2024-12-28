import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "@/common/constant.ts";

interface SocketState {
  socket: Socket | null;

  setSocket: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  setSocket: () => {
    const newSocket = io(SOCKET_BASE_URL, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("WebSocket disconnected:", reason);
    });

    set({ socket: newSocket });
  },
}));
