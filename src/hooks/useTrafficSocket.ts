
import { useEffect, useState } from "react";

export const useTrafficSocket = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:8000/ws");
    const socket = new WebSocket("https://trafficbackend-9pj0.onrender.com/ws");

    socket.onopen = () => {
      console.log("✅ Connected to backend");
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      console.log("📡 Live Data:", parsed);
      setData(parsed);
    };

    socket.onerror = (err) => {
      console.log("❌ Socket error:", err);
    };

    socket.onclose = () => {
      console.log("🔌 Disconnected");
    };

    return () => socket.close();
  }, []);

  return data;
};
