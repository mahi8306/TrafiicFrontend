

// import { useEffect, useRef, useState } from 'react';
// import { Camera, Play, Square } from 'lucide-react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from 'recharts';

// interface LivePoint {
//   time: string;
//   vehicles: number;
// }

// export function LiveDetection() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const intervalRef = useRef<number | null>(null);

//   const [isRunning, setIsRunning] = useState(false);
//   const [vehicleData, setVehicleData] = useState({
//     name: 'Live Camera Point',
//     vehicleCount: 0,
//     cars: 0,
//     bikes: 0,
//     buses: 0,
//     trucks: 0,
//   });

//   const [trendData, setTrendData] = useState<LivePoint[]>([
//     { time: 'Start', vehicles: 0 },
//   ]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });

//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       setIsRunning(true);

//       intervalRef.current = window.setInterval(() => {
//         const cars = Math.floor(Math.random() * 12) + 3;
//         const bikes = Math.floor(Math.random() * 8) + 1;
//         const buses = Math.floor(Math.random() * 3);
//         const trucks = Math.floor(Math.random() * 3);
//         const total = cars + bikes + buses + trucks;

//         setVehicleData({
//           name: 'Live Camera Point',
//           vehicleCount: total,
//           cars,
//           bikes,
//           buses,
//           trucks,
//         });

//         setTrendData(prev => [
//           ...prev.slice(-9),
//           {
//             time: new Date().toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//               second: '2-digit',
//             }),
//             vehicles: total,
//           },
//         ]);
//       }, 2000);
//     } catch (error) {
//       console.error('Camera access failed:', error);
//     }
//   };

//   const stopCamera = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }

//     setIsRunning(false);
//   };

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const breakdownData = [
//     { name: 'Cars', value: vehicleData.cars },
//     { name: 'Bikes', value: vehicleData.bikes },
//     { name: 'Buses', value: vehicleData.buses },
//     { name: 'Trucks', value: vehicleData.trucks },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="rounded-lg border border-border bg-card p-4">
//         <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
//               <Camera className="w-5 h-5 text-accent" />
//             </div>
//             <div>
//               <h2 className="text-base font-bold text-foreground">Live Detection</h2>
//               <p className="text-xs text-muted-foreground">
//                 Laptop camera based live traffic monitoring
//               </p>
//             </div>
//           </div>

//           {!isRunning ? (
//             <button
//               onClick={startCamera}
//               className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm flex items-center gap-2"
//             >
//               <Play className="w-4 h-4" />
//               Start Camera
//             </button>
//           ) : (
//             <button
//               onClick={stopCamera}
//               className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm flex items-center gap-2"
//             >
//               <Square className="w-4 h-4" />
//               Stop Camera
//             </button>
//           )}
//         </div>

//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-full max-w-4xl aspect-video rounded-lg bg-black object-cover"
//         />

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.vehicleCount}</div>
//             <div className="text-xs text-muted-foreground">Total Vehicles</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.cars}</div>
//             <div className="text-xs text-muted-foreground">Cars</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.bikes}</div>
//             <div className="text-xs text-muted-foreground">Bikes</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.buses}</div>
//             <div className="text-xs text-muted-foreground">Buses</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.trucks}</div>
//             <div className="text-xs text-muted-foreground">Trucks</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div className="rounded-lg border border-border bg-card p-4">
//           <h3 className="text-sm font-semibold text-foreground mb-4">Live Vehicle Trend</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={trendData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//               <XAxis dataKey="time" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//               <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//               <Tooltip
//                 contentStyle={{
//                   background: 'hsl(222 44% 9%)',
//                   border: '1px solid hsl(222 30% 18%)',
//                   borderRadius: 8,
//                   fontSize: 12,
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="vehicles"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Vehicles"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="rounded-lg border border-border bg-card p-4">
//           <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Breakdown</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={breakdownData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//               <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//               <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//               <Tooltip
//                 contentStyle={{
//                   background: 'hsl(222 44% 9%)',
//                   border: '1px solid hsl(222 30% 18%)',
//                   borderRadius: 8,
//                   fontSize: 12,
//                 }}
//               />
//               <Bar dataKey="value" fill="hsl(185 80% 50%)" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useRef, useState } from "react";
// import { Camera, Play, Square } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// interface DetectionBox {
//   x1: number;
//   y1: number;
//   x2: number;
//   y2: number;
//   label: string;
// }

// interface LivePoint {
//   time: string;
//   vehicles: number;
// }

// export function LiveDetection() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const intervalRef = useRef<number | null>(null);

//   const [isRunning, setIsRunning] = useState(false);
//   const [boxes, setBoxes] = useState<DetectionBox[]>([]);
//   const [videoSize, setVideoSize] = useState({ width: 640, height: 360 });

//   const [vehicleData, setVehicleData] = useState({
//     vehicleCount: 0,
//     cars: 0,
//     bikes: 0,
//     buses: 0,
//     trucks: 0,
//   });

//   const [trendData, setTrendData] = useState<LivePoint[]>([
//     { time: "Start", vehicles: 0 },
//   ]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: false,
//       });

//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       setIsRunning(true);

//       intervalRef.current = window.setInterval(() => {
//         sendFrameToBackend();
//       }, 2000);
//     } catch (error) {
//       console.error("Camera access failed:", error);
//       alert("Unable to access camera. Please allow camera permission.");
//     }
//   };

//   const stopCamera = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     setIsRunning(false);
//     setBoxes([]);
//   };

//   const captureFrame = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     if (!video || !canvas) return null;
//     if (!video.videoWidth || !video.videoHeight) return null;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return null;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     setVideoSize({
//       width: video.videoWidth,
//       height: video.videoHeight,
//     });

//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     return canvas.toDataURL("image/jpeg");
//   };

//   const sendFrameToBackend = async () => {
//     const image = captureFrame();
//     if (!image) return;

//     try {
//       const res = await fetch("https://trafficbackend-9pj0.onrender.com/detect", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ image }),
//       });

//       const data = await res.json();

//       setBoxes(data.boxes || []);

//       const total = data.count || 0;

//       const cars = (data.boxes || []).filter((b: DetectionBox) => b.label === "car").length;
//       const bikes = (data.boxes || []).filter((b: DetectionBox) => b.label === "motorcycle").length;
//       const buses = (data.boxes || []).filter((b: DetectionBox) => b.label === "bus").length;
//       const trucks = (data.boxes || []).filter((b: DetectionBox) => b.label === "truck").length;

//       setVehicleData({
//         vehicleCount: total,
//         cars,
//         bikes,
//         buses,
//         trucks,
//       });

//       setTrendData((prev) => [
//         ...prev.slice(-9),
//         {
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//           }),
//           vehicles: total,
//         },
//       ]);
//     } catch (error) {
//       console.error("Detection API error:", error);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const breakdownData = [
//     { name: "Cars", value: vehicleData.cars },
//     { name: "Bikes", value: vehicleData.bikes },
//     { name: "Buses", value: vehicleData.buses },
//     { name: "Trucks", value: vehicleData.trucks },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="rounded-lg border border-border bg-card p-4">
//         <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
//               <Camera className="w-5 h-5 text-accent" />
//             </div>
//             <div>
//               <h2 className="text-base font-bold text-foreground">Live Detection</h2>
//               <p className="text-xs text-muted-foreground">
//                 Frontend camera + backend YOLO detection
//               </p>
//             </div>
//           </div>

//           {!isRunning ? (
//             <button
//               onClick={startCamera}
//               className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm flex items-center gap-2"
//             >
//               <Play className="w-4 h-4" />
//               Start Camera
//             </button>
//           ) : (
//             <button
//               onClick={stopCamera}
//               className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm flex items-center gap-2"
//             >
//               <Square className="w-4 h-4" />
//               Stop Camera
//             </button>
//           )}
//         </div>

//         <div className="relative w-full max-w-4xl">
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full aspect-video rounded-lg bg-black object-cover"
//           />

//           <div className="absolute inset-0 pointer-events-none">
//             {boxes.map((box, i) => {
//               const scaleX = 100 / videoSize.width;
//               const scaleY = 100 / videoSize.height;

//               return (
//                 <div
//                   key={i}
//                   className="absolute border-2 border-red-500"
//                   style={{
//                     left: `${box.x1 * scaleX}%`,
//                     top: `${box.y1 * scaleY}%`,
//                     width: `${(box.x2 - box.x1) * scaleX}%`,
//                     height: `${(box.y2 - box.y1) * scaleY}%`,
//                   }}
//                 >
//                   <div className="bg-red-500 text-white text-[10px] px-1 py-0.5 inline-block">
//                     {box.label}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <canvas ref={canvasRef} className="hidden" />

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.vehicleCount}</div>
//             <div className="text-xs text-muted-foreground">Total Vehicles</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.cars}</div>
//             <div className="text-xs text-muted-foreground">Cars</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.bikes}</div>
//             <div className="text-xs text-muted-foreground">Bikes</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.buses}</div>
//             <div className="text-xs text-muted-foreground">Buses</div>
//           </div>

//           <div className="rounded-lg bg-secondary p-3 text-center">
//             <div className="text-lg font-bold text-primary">{vehicleData.trucks}</div>
//             <div className="text-xs text-muted-foreground">Trucks</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <div className="rounded-lg border border-border bg-card p-4">
//           <h3 className="text-sm font-semibold text-foreground mb-4">Live Vehicle Trend</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={trendData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//               <XAxis dataKey="time" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
//               <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
//               <Tooltip
//                 contentStyle={{
//                   background: "hsl(222 44% 9%)",
//                   border: "1px solid hsl(222 30% 18%)",
//                   borderRadius: 8,
//                   fontSize: 12,
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="vehicles"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Vehicles"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="rounded-lg border border-border bg-card p-4">
//           <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Breakdown</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={breakdownData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//               <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
//               <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
//               <Tooltip
//                 contentStyle={{
//                   background: "hsl(222 44% 9%)",
//                   border: "1px solid hsl(222 30% 18%)",
//                   borderRadius: 8,
//                   fontSize: 12,
//                 }}
//               />
//               <Bar dataKey="value" fill="hsl(185 80% 50%)" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useEffect, useRef, useState } from "react";
import { Camera, Play, Square } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface DetectionBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  confidence?: number;
}

interface LivePoint {
  time: string;
  vehicles: number;
}

const API_URL = "https://trafficbackend-9pj0.onrender.com/detect";

export function LiveDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isSendingRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);
  const [boxes, setBoxes] = useState<DetectionBox[]>([]);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 360 });

  const [vehicleData, setVehicleData] = useState({
    vehicleCount: 0,
    cars: 0,
    bikes: 0,
    buses: 0,
    trucks: 0,
  });

  const [trendData, setTrendData] = useState<LivePoint[]>([
    { time: "Start", vehicles: 0 },
  ]);

  const resetStats = () => {
    setBoxes([]);
    setVehicleData({
      vehicleCount: 0,
      cars: 0,
      bikes: 0,
      buses: 0,
      trucks: 0,
    });
    setTrendData([{ time: "Start", vehicles: 0 }]);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 360 },
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsRunning(true);

      setTimeout(() => {
        sendFrameToBackend();
      }, 1000);

      intervalRef.current = window.setInterval(() => {
        sendFrameToBackend();
      }, 2000);
    } catch (error) {
      console.error("Camera access failed:", error);
      alert("Unable to access camera. Please allow camera permission.");
    }
  };

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    isSendingRef.current = false;
    setIsRunning(false);
    resetStats();
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return null;
    if (!video.videoWidth || !video.videoHeight) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 640;
    canvas.height = 360;

    setVideoSize({
      width: 640,
      height: 360,
    });

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.7);
  };

  const sendFrameToBackend = async () => {
    if (isSendingRef.current) return;

    const image = captureFrame();
    if (!image) return;

    try {
      isSendingRef.current = true;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("detect response:", data);

      const safeBoxes: DetectionBox[] = Array.isArray(data.boxes) ? data.boxes : [];
      console.log("boxes:", safeBoxes);

      setBoxes(safeBoxes);

      const total = data.count || 0;
      const cars = safeBoxes.filter((b) => b.label === "car").length;
      const bikes = safeBoxes.filter((b) => b.label === "motorcycle").length;
      const buses = safeBoxes.filter((b) => b.label === "bus").length;
      const trucks = safeBoxes.filter((b) => b.label === "truck").length;

      setVehicleData({
        vehicleCount: total,
        cars,
        bikes,
        buses,
        trucks,
      });

      setTrendData((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          vehicles: total,
        },
      ]);
    } catch (error) {
      console.error("Detection API error:", error);
    } finally {
      isSendingRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const breakdownData = [
    { name: "Cars", value: vehicleData.cars },
    { name: "Bikes", value: vehicleData.bikes },
    { name: "Buses", value: vehicleData.buses },
    { name: "Trucks", value: vehicleData.trucks },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
              <Camera className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Live Detection</h2>
              <p className="text-xs text-muted-foreground">
                Frontend camera + backend YOLO detection
              </p>
            </div>
          </div>

          {!isRunning ? (
            <button
              onClick={startCamera}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              <Play className="h-4 w-4" />
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm text-destructive-foreground"
            >
              <Square className="h-4 w-4" />
              Stop Camera
            </button>
          )}
        </div>

        <div className="relative w-full max-w-4xl overflow-hidden rounded-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="aspect-video w-full rounded-lg bg-black object-cover"
          />

          <div className="pointer-events-none absolute inset-0">
            {boxes.map((box, i) => {
              const scaleX = 100 / videoSize.width;
              const scaleY = 100 / videoSize.height;

              return (
                <div
                  key={i}
                  className="absolute border-2 border-red-500"
                  style={{
                    left: `${box.x1 * scaleX}%`,
                    top: `${box.y1 * scaleY}%`,
                    width: `${(box.x2 - box.x1) * scaleX}%`,
                    height: `${(box.y2 - box.y1) * scaleY}%`,
                  }}
                >
                  <div className="inline-block bg-red-500 px-1 py-0.5 text-[10px] text-white">
                    {box.label}
                    {typeof box.confidence === "number"
                      ? ` ${Math.round(box.confidence * 100)}%`
                      : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-lg font-bold text-primary">{vehicleData.vehicleCount}</div>
            <div className="text-xs text-muted-foreground">Total Vehicles</div>
          </div>

          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-lg font-bold text-primary">{vehicleData.cars}</div>
            <div className="text-xs text-muted-foreground">Cars</div>
          </div>

          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-lg font-bold text-primary">{vehicleData.bikes}</div>
            <div className="text-xs text-muted-foreground">Bikes</div>
          </div>

          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-lg font-bold text-primary">{vehicleData.buses}</div>
            <div className="text-xs text-muted-foreground">Buses</div>
          </div>

          <div className="rounded-lg bg-secondary p-3 text-center">
            <div className="text-lg font-bold text-primary">{vehicleData.trucks}</div>
            <div className="text-xs text-muted-foreground">Trucks</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Live Vehicle Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis dataKey="time" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222 44% 9%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="vehicles"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
                name="Vehicles"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Vehicle Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={breakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(222 44% 9%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="hsl(185 80% 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}