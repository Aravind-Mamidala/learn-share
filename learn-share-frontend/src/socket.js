import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";
const token = localStorage.getItem("token");

const socket = io(SOCKET_URL, {
  auth: {
    token, // send token with handshake
  },
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

export default socket;
