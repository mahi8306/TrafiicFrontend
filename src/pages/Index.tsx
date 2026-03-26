


// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Activity, AlertTriangle, Radio, Map, BarChart3, Wifi, Upload, Settings } from 'lucide-react';
// import { TrafficMap } from '@/components/traffic/TrafficMap';
// import { SignalPanel } from '@/components/traffic/SignalPanel';
// import { LaneCountPanel } from '@/components/traffic/LaneCountPanel';
// import { TrafficCharts } from '@/components/traffic/TrafficCharts';
// import { EmergencyAlert } from '@/components/traffic/EmergencyAlert';
// import { V2ICommunication } from '@/components/traffic/V2ICommunication';
// import { VideoUpload, LaneUpload } from '@/components/traffic/VideoUpload';
// import {
//   generateIntersections,
//   generateTrends,
//   generateV2IVehicles,
//   type TrafficIntersection,
//   type TrafficTrend,
//   type V2IVehicle,
// } from '@/lib/trafficData';
// import { useTrafficSocket } from '@/hooks/useTrafficSocket';

// const navItems = [
//   { icon: Map, label: 'Map', id: 'map' },
//   { icon: BarChart3, label: 'Analytics', id: 'analytics' },
//   { icon: Wifi, label: 'V2I', id: 'v2i' },
//   { icon: Upload, label: 'Video', id: 'video' },
//   { icon: Settings, label: 'Signals', id: 'signals' },
// ] as const;

// const Index = () => {
//   const [intersections, setIntersections] = useState<TrafficIntersection[]>(generateIntersections());
//   const [trends, setTrends] = useState<TrafficTrend[]>(generateTrends());
//   const [v2iVehicles, setV2iVehicles] = useState<V2IVehicle[]>([]);
//   const [selectedIntersection, setSelectedIntersection] = useState<TrafficIntersection | null>(null);
//   const [activeTab, setActiveTab] = useState<string>('map');
//   const [lastUpdate, setLastUpdate] = useState(new Date());

//   const [lanes, setLanes] = useState<LaneUpload[]>([
//     { file: null, name: 'North Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'South Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'East Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'West Lane', status: 'idle', vehicleCount: 0 },
//   ]);

//   const socketData = useTrafficSocket();

//   useEffect(() => {
//     setV2iVehicles(generateV2IVehicles(intersections));
//     setSelectedIntersection(intersections[0]);
//   }, []);

//   useEffect(() => {
//     if (!socketData) return;

//     setIntersections(prev =>
//       prev.map(intersection => ({
//         ...intersection,
//         emergencyActive: socketData.emergency,
//         lanes: intersection.lanes.map(lane => ({
//           ...lane,
//           vehicleCount: Math.floor(socketData.vehicles / 4),
//         })),
//       }))
//     );

//     setLastUpdate(new Date());
//   }, [socketData]);

//   useEffect(() => {
//     const hasUploadedFile = lanes.some(lane => lane.file !== null);
//     if (!hasUploadedFile) return;

//     const total = lanes.reduce((sum, lane) => sum + lane.vehicleCount, 0);

//     const updatedIntersection: TrafficIntersection = {
//       id: 'upload-1',
//       name: 'Uploaded Junction',
//       city: 'Kanpur',
//       lat: 26.4499,
//       lng: 80.3319,
//       signalState: 'green',
//       emergencyActive: false,
//       greenTime: Math.max(...lanes.map(lane => lane.vehicleCount), 10) * 2,
//       density: total > 120 ? 'high' : total > 60 ? 'medium' : 'low',
//       lanes: lanes.map((lane, index) => ({
//         id: `lane-${index}`,
//         name: lane.name,
//         vehicleCount: lane.vehicleCount,
//         cars: Math.floor(lane.vehicleCount * 0.6),
//         bikes: Math.floor(lane.vehicleCount * 0.2),
//         buses: Math.floor(lane.vehicleCount * 0.1),
//         trucks: Math.floor(lane.vehicleCount * 0.1),
//         speed: 30,
//       })),
//     };

//     setIntersections(prev => [updatedIntersection, ...prev.slice(1)]);
//     setSelectedIntersection(updatedIntersection);

//     setTrends(prev => [
//       ...prev.slice(-9),
//       {
//         time: new Date().toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit',
//         }),
//         lane1: lanes[0].vehicleCount,
//         lane2: lanes[1].vehicleCount,
//         lane3: lanes[2].vehicleCount,
//         lane4: lanes[3].vehicleCount,
//       },
//     ]);

//     setLastUpdate(new Date());
//   }, [lanes]);

//   useEffect(() => {
//     setV2iVehicles(generateV2IVehicles(intersections));
//   }, [intersections]);

//   const emergencyIntersections = intersections.filter(i => i.emergencyActive);
//   const totalVehicles = intersections.reduce(
//     (sum, intersection) =>
//       sum + intersection.lanes.reduce((laneSum, lane) => laneSum + lane.vehicleCount, 0),
//     0
//   );

//   return (
//     <div className="flex h-screen overflow-hidden bg-background">
//       {/* Sidebar */}
//       <aside className="w-16 lg:w-56 flex-shrink-0 bg-card border-r border-border flex flex-col">
//         <div className="p-3 lg:p-4 border-b border-border flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
//             <Activity className="w-5 h-5 text-primary" />
//           </div>
//           <div className="hidden lg:block">
//             <h1 className="text-sm font-bold text-foreground tracking-tight">TrafficAI</h1>
//             <p className="text-xs text-muted-foreground">Smart Control</p>
//           </div>
//         </div>

//         <nav className="flex-1 p-2 space-y-1">
//           {navItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
//                 activeTab === item.id
//                   ? 'bg-primary/15 text-primary font-medium'
//                   : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
//               }`}
//             >
//               <item.icon className="w-4 h-4 flex-shrink-0" />
//               <span className="hidden lg:inline">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="p-3 border-t border-border">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//             <span className="text-xs text-muted-foreground hidden lg:inline">
//               Live · {lastUpdate.toLocaleTimeString('en-IN')}
//             </span>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur">
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2">
//               <Radio className="w-4 h-4 text-primary animate-pulse" />
//               <span className="text-sm font-medium text-foreground">{intersections.length} Intersections</span>
//             </div>
//             <div className="text-sm text-muted-foreground">
//               <span className="font-mono">{totalVehicles}</span> vehicles tracked
//             </div>
//           </div>

//           {emergencyIntersections.length > 0 && (
//             <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/15 border border-destructive/30">
//               <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
//               <span className="text-xs font-medium text-destructive">
//                 {emergencyIntersections.length} Emergency
//               </span>
//             </motion.div>
//           )}
//         </header>

//         <div className="flex-1 overflow-auto p-4">
//           <AnimatePresence mode="wait">
//             {activeTab === 'map' && (
//               <motion.div key="map" className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <div className="lg:col-span-2">
//                   <TrafficMap
//                     intersections={intersections}
//                     onSelectIntersection={setSelectedIntersection}
//                     selectedId={selectedIntersection?.id}
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   {selectedIntersection && (
//                     <>
//                       <SignalPanel intersection={selectedIntersection} />
//                       <LaneCountPanel lanes={selectedIntersection.lanes} />
//                     </>
//                   )}
//                   <EmergencyAlert intersections={emergencyIntersections} />
//                 </div>
//               </motion.div>
//             )}

//             {activeTab === 'analytics' && (
//               <TrafficCharts
//                 trends={trends}
//                 intersections={intersections}
//                 selectedIntersection={selectedIntersection}
//               />
//             )}

//             {activeTab === 'v2i' && (
//               <V2ICommunication vehicles={v2iVehicles} intersections={intersections} />
//             )}

//             {activeTab === 'video' && (
//               <VideoUpload lanes={lanes} setLanes={setLanes} />
//             )}

//             {activeTab === 'signals' && (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//                 {intersections.map(intersection => (
//                   <SignalPanel key={intersection.id} intersection={intersection} />
//                 ))}
//               </div>
//             )}
//           </AnimatePresence>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Index;



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Activity, AlertTriangle, Radio, Map, BarChart3, Wifi, Upload, Settings } from 'lucide-react';
import { Activity, AlertTriangle, Radio, Map, BarChart3, Wifi, Upload, Settings, Camera } from 'lucide-react';
import { LiveDetection } from '@/components/traffic/LiveDetection';
import { TrafficMap } from '@/components/traffic/TrafficMap';
import { SignalPanel } from '@/components/traffic/SignalPanel';
import { LaneCountPanel } from '@/components/traffic/LaneCountPanel';
import { TrafficCharts } from '@/components/traffic/TrafficCharts';
import { EmergencyAlert } from '@/components/traffic/EmergencyAlert';
import { V2ICommunication } from '@/components/traffic/V2ICommunication';
import { VideoUpload, LaneUpload } from '@/components/traffic/VideoUpload';
import {
  generateIntersections,
  generateTrends,
  generateV2IVehicles,
  type TrafficIntersection,
  type TrafficTrend,
  type V2IVehicle,
} from '@/lib/trafficData';
import { useTrafficSocket } from '@/hooks/useTrafficSocket';

const navItems = [
  { icon: Map, label: 'Map', id: 'map' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Wifi, label: 'V2I', id: 'v2i' },
  { icon: Upload, label: 'Video', id: 'video' },
  { icon: Camera, label: 'Live Detection', id: 'live-detection' },
  { icon: Settings, label: 'Signals', id: 'signals' },
] as const;

const Index = () => {
  const [intersections, setIntersections] = useState<TrafficIntersection[]>(generateIntersections());
  const [trends, setTrends] = useState<TrafficTrend[]>(generateTrends());
  const [v2iVehicles, setV2iVehicles] = useState<V2IVehicle[]>([]);
  const [selectedIntersection, setSelectedIntersection] = useState<TrafficIntersection | null>(null);
  const [activeTab, setActiveTab] = useState<string>('map');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [lanes, setLanes] = useState<LaneUpload[]>([
    { file: null, name: 'North Lane', status: 'idle', vehicleCount: 0 },
    { file: null, name: 'South Lane', status: 'idle', vehicleCount: 0 },
    { file: null, name: 'East Lane', status: 'idle', vehicleCount: 0 },
    { file: null, name: 'West Lane', status: 'idle', vehicleCount: 0 },
  ]);

  const socketData = useTrafficSocket();

  useEffect(() => {
    setV2iVehicles(generateV2IVehicles(intersections));
    setSelectedIntersection(intersections[0]);
  }, []);

  useEffect(() => {
    if (!socketData) return;

    setIntersections(prev =>
      prev.map(intersection => ({
        ...intersection,
        emergencyActive: socketData.emergency,
        lanes: intersection.lanes.map(lane => ({
          ...lane,
          vehicleCount: Math.floor(socketData.vehicles / 4),
        })),
      }))
    );

    setLastUpdate(new Date());
  }, [socketData]);

  useEffect(() => {
    const hasUploadedFile = lanes.some(lane => lane.file !== null);
    if (!hasUploadedFile) return;

    const total = lanes.reduce((sum, lane) => sum + lane.vehicleCount, 0);

    const updatedIntersection: TrafficIntersection = {
      id: 'upload-1',
      name: 'Uploaded Junction',
      city: 'Kanpur',
      lat: 26.4499,
      lng: 80.3319,
      signalState: 'green',
      emergencyActive: false,
      greenTime: Math.max(...lanes.map(lane => lane.vehicleCount), 10) * 2,
      density: total > 120 ? 'high' : total > 60 ? 'medium' : 'low',
      lanes: lanes.map((lane, index) => ({
        id: `lane-${index}`,
        name: lane.name,
        vehicleCount: lane.vehicleCount,
        cars: Math.floor(lane.vehicleCount * 0.6),
        bikes: Math.floor(lane.vehicleCount * 0.2),
        buses: Math.floor(lane.vehicleCount * 0.1),
        trucks: Math.floor(lane.vehicleCount * 0.1),
        speed: 30,
      })),
    };

    setIntersections(prev => [updatedIntersection, ...prev.slice(1)]);
    setSelectedIntersection(updatedIntersection);

    setTrends(prev => [
      ...prev.slice(-9),
      {
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        lane1: lanes[0].vehicleCount,
        lane2: lanes[1].vehicleCount,
        lane3: lanes[2].vehicleCount,
        lane4: lanes[3].vehicleCount,
      },
    ]);

    setLastUpdate(new Date());
  }, [lanes]);

  useEffect(() => {
    setV2iVehicles(generateV2IVehicles(intersections));
  }, [intersections]);

  const emergencyIntersections = intersections.filter(i => i.emergencyActive);
  const totalVehicles = intersections.reduce(
    (sum, intersection) =>
      sum + intersection.lanes.reduce((laneSum, lane) => laneSum + lane.vehicleCount, 0),
    0
  );

  const uploadedIntersection = intersections.find(intersection => intersection.id === 'upload-1') ?? null;
  const hasUploadedAnalytics = uploadedIntersection !== null;

  const uploadedTrends = trends.filter(
    trend => trend.lane1 > 0 || trend.lane2 > 0 || trend.lane3 > 0 || trend.lane4 > 0
  );

  const analyticsIntersections = hasUploadedAnalytics ? [uploadedIntersection] : [];
  const analyticsSelectedIntersection = hasUploadedAnalytics ? uploadedIntersection : null;
  const analyticsTrends = hasUploadedAnalytics ? uploadedTrends : [];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-16 lg:w-56 flex-shrink-0 bg-card border-r border-border flex flex-col">
        <div className="p-3 lg:p-4 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-sm font-bold text-foreground tracking-tight">TrafficAI</h1>
            <p className="text-xs text-muted-foreground">Smart Control</p>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === item.id
                  ? 'bg-primary/15 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground hidden lg:inline">
              Live · {lastUpdate.toLocaleTimeString('en-IN')}
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">{intersections.length} Intersections</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-mono">{totalVehicles}</span> vehicles tracked
            </div>
          </div>

          {emergencyIntersections.length > 0 && (
            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/15 border border-destructive/30">
              <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
              <span className="text-xs font-medium text-destructive">
                {emergencyIntersections.length} Emergency
              </span>
            </motion.div>
          )}
        </header>

        <div className="flex-1 overflow-auto p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'map' && (
              <motion.div key="map" className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <TrafficMap
                    intersections={intersections}
                    onSelectIntersection={setSelectedIntersection}
                    selectedId={selectedIntersection?.id}
                  />
                </div>

                <div className="space-y-4">
                  {selectedIntersection && (
                    <>
                      <SignalPanel intersection={selectedIntersection} />
                      <LaneCountPanel lanes={selectedIntersection.lanes} />
                    </>
                  )}
                  <EmergencyAlert intersections={emergencyIntersections} />
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <TrafficCharts
                trends={analyticsTrends}
                intersections={analyticsIntersections}
                selectedIntersection={analyticsSelectedIntersection}
              />
            )}

            {activeTab === 'v2i' && (
              <V2ICommunication vehicles={v2iVehicles} intersections={intersections} />
            )}

            {activeTab === 'video' && (
              <VideoUpload lanes={lanes} setLanes={setLanes} />
            )}
            {/* i added this */}
            {activeTab === 'live-detection' && <LiveDetection />}
            
            {activeTab === 'signals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {intersections.map(intersection => (
                  <SignalPanel key={intersection.id} intersection={intersection} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Index;