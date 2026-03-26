// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import { useTrafficSocket } from "./hooks/useTrafficSocket";
// import { useEffect } from "react";

// const queryClient = new QueryClient();

// const AppContent = () => {
//   const data = useTrafficSocket();

//   useEffect(() => {
//     if (data) {
//       console.log("📡 Live Data:", data);
//     }
//   }, [data]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <AppContent />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import { useTrafficSocket } from "./hooks/useTrafficSocket";
// import { useEffect, useMemo, useState } from "react";

// // 👇 IMPORT THESE
// import { VideoUpload, LaneUpload } from "@/components/traffic/VideoUpload";
// import { TrafficCharts } from "@/components/traffic/TrafficCharts";

// const queryClient = new QueryClient();

// const AppContent = () => {
//   const data = useTrafficSocket();

//   useEffect(() => {
//     if (data) {
//       console.log("📡 Live Data:", data);
//     }
//   }, [data]);

//   // ✅ GLOBAL STATE (IMPORTANT)
//   const [lanes, setLanes] = useState<LaneUpload[]>([
//     { file: null, name: "North Lane", status: "idle", vehicleCount: 0 },
//     { file: null, name: "South Lane", status: "idle", vehicleCount: 0 },
//     { file: null, name: "East Lane", status: "idle", vehicleCount: 0 },
//     { file: null, name: "West Lane", status: "idle", vehicleCount: 0 },
//   ]);

//   // ✅ TREND DATA (LINE CHART)
//   // const trends = useMemo(() => {
//   //   return [
//   //     {
//   //       time: "Now",
//   //       lane1: lanes[0].vehicleCount,
//   //       lane2: lanes[1].vehicleCount,
//   //       lane3: lanes[2].vehicleCount,
//   //       lane4: lanes[3].vehicleCount,
//   //     },
//   //   ];
//   // }, [lanes]);
//   const [trends, setTrends] = useState([
//   {
//     time: "Start",
//     lane1: 0,
//     lane2: 0,
//     lane3: 0,
//     lane4: 0,
//   },
// ]);

// useEffect(() => {
//   const allProcessed = lanes.some(lane => lane.file !== null);

//   if (!allProcessed) return;

//   const newPoint = {
//     time: new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     }),
//     lane1: lanes[0].vehicleCount,
//     lane2: lanes[1].vehicleCount,
//     lane3: lanes[2].vehicleCount,
//     lane4: lanes[3].vehicleCount,
//   };

//   setTrends(prev => [...prev.slice(-9), newPoint]);
// }, [lanes]);

//   // ✅ INTERSECTION DATA (ALL CHARTS)
//   const intersections = useMemo(() => {
//     const total = lanes.reduce((sum, l) => sum + l.vehicleCount, 0);

//     return [
//       {
//         id: "custom-1",
//         name: "Main Junction",
//         city: "Kanpur",
//         lat: 26.4499,
//         lng: 80.3319,
//         signalState: "green" as const,
//         emergencyActive: false,
//         greenTime: Math.max(...lanes.map(l => l.vehicleCount), 10) * 2,
//         density: total > 120 ? "high" as const : total > 60 ? "medium" as const : "low" as const,
//         lanes: lanes.map((l, index) => ({
//           id: `lane-${index}`,
//           name: l.name,
//           vehicleCount: l.vehicleCount,
//           cars: Math.floor(l.vehicleCount * 0.6),
//           bikes: Math.floor(l.vehicleCount * 0.2),
//           buses: Math.floor(l.vehicleCount * 0.1),
//           trucks: Math.floor(l.vehicleCount * 0.1),
//           speed: 30,
//         })),
//       },
//     ];
//   }, [lanes]);

//   const selectedIntersection = intersections[0] ?? null;

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <div className="space-y-6 p-4">
//               {/* 👇 VIDEO UPLOAD */}
//               <VideoUpload lanes={lanes} setLanes={setLanes} />

//               {/* 👇 LIVE CHARTS */}
//               <TrafficCharts
//                 trends={trends}
//                 intersections={intersections}
//                 selectedIntersection={selectedIntersection}
//               />
//             </div>
//           }
//         />

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <AppContent />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;




import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTrafficSocket } from "./hooks/useTrafficSocket";
import { useEffect } from "react";
import EmergencyPage from "./components/traffic/EmergencyPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const data = useTrafficSocket();

  useEffect(() => {
    if (data) {
      console.log("📡 Live Data:", data);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;