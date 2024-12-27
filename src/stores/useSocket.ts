import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "@/common/constant.ts";

interface SocketState {
  socket: Socket | null;
  // eslint-disable-next-line no-unused-vars
  setSocket: (token: string) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  setSocket: (token: string) => {
    const newSocket = io(SOCKET_BASE_URL, {
      transports: ["websocket"],
      query: { token },
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
