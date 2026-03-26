// import { useState, useRef } from 'react';
// import { Upload, Film, CheckCircle, Camera } from 'lucide-react';

// interface LaneUpload {
//   file: File | null;
//   name: string;
//   status: 'idle' | 'uploading' | 'processing' | 'done';
//   vehicleCount: number;
// }

// export function VideoUpload() {
//   const [lanes, setLanes] = useState<LaneUpload[]>([
//     { file: null, name: 'North Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'South Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'East Lane', status: 'idle', vehicleCount: 0 },
//     { file: null, name: 'West Lane', status: 'idle', vehicleCount: 0 },
//   ]);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const handleUpload = (index: number, file: File) => {
//     setLanes(prev => prev.map((l, i) => i === index ? { ...l, file, status: 'uploading' } : l));

//     // Simulate processing
//     setTimeout(() => {
//       setLanes(prev => prev.map((l, i) => i === index ? { ...l, status: 'processing' } : l));
//       setTimeout(() => {
//         setLanes(prev => prev.map((l, i) => i === index ? { ...l, status: 'done', vehicleCount: Math.floor(Math.random() * 50) + 10 } : l));
//       }, 2000);
//     }, 1500);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="rounded-lg border border-border bg-card p-4">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
//             <Camera className="w-5 h-5 text-accent" />
//           </div>
//           <div>
//             <h2 className="text-base font-bold text-foreground">4-Lane Video Upload</h2>
//             <p className="text-xs text-muted-foreground">Upload traffic camera feeds for AI-powered vehicle detection (YOLOv8 simulation)</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {lanes.map((lane, i) => (
//           <div key={i} className="rounded-lg border border-border bg-card p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-sm font-semibold text-foreground">{lane.name}</h3>
//               {lane.status === 'done' && (
//                 <span className="flex items-center gap-1 text-xs text-signal-green">
//                   <CheckCircle className="w-3 h-3" /> Processed
//                 </span>
//               )}
//             </div>

//             {lane.file ? (
//               <div className="space-y-3">
//                 <video
//                   src={URL.createObjectURL(lane.file)}
//                   className="aspect-video w-full rounded-lg bg-secondary object-cover"
//                   controls
//                   muted
//                   autoPlay
//                   loop
//                 />
//                 <div className="text-xs text-muted-foreground truncate">{lane.file.name}</div>
//                 {lane.status === 'uploading' && (
//                   <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
//                     <div className="h-full bg-accent rounded-full animate-pulse w-2/3" />
//                   </div>
//                 )}
//                 {lane.status === 'processing' && (
//                   <div className="text-xs text-accent font-medium animate-pulse">🔍 Running YOLOv8 detection...</div>
//                 )}
//                 {lane.status === 'done' && (
//                   <div className="bg-secondary rounded-lg p-3 text-center">
//                     <div className="text-2xl font-mono font-bold text-primary">{lane.vehicleCount}</div>
//                     <div className="text-[10px] text-muted-foreground">Vehicles Detected</div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={() => inputRefs.current[i]?.click()}
//                 className="w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
//               >
//                 <Upload className="w-6 h-6 text-muted-foreground" />
//                 <span className="text-xs text-muted-foreground">Upload video file</span>
//                 <input
//                   ref={el => { inputRefs.current[i] = el; }}
//                   type="file"
//                   accept="video/*"
//                   className="hidden"
//                   onChange={e => {
//                     const file = e.target.files?.[0];
//                     if (file) handleUpload(i, file);
//                   }}
//                 />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useRef } from 'react';
import { Upload, Film, CheckCircle, Camera } from 'lucide-react';

export interface LaneUpload {
  file: File | null;
  name: string;
  status: 'idle' | 'uploading' | 'processing' | 'done';
  vehicleCount: number;
}

interface VideoUploadProps {
  lanes: LaneUpload[];
  setLanes: React.Dispatch<React.SetStateAction<LaneUpload[]>>;
}

export function VideoUpload({ lanes, setLanes }: VideoUploadProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleUpload = (index: number, file: File) => {
    setLanes(prev => prev.map((l, i) => i === index ? { ...l, file, status: 'uploading', vehicleCount: 0 } : l));

    // Simulate processing
    setTimeout(() => {
      setLanes(prev => prev.map((l, i) => i === index ? { ...l, status: 'processing' } : l));
      setTimeout(() => {
        setLanes(prev => prev.map((l, i) => i === index ? { ...l, status: 'done', vehicleCount: Math.floor(Math.random() * 50) + 10 } : l));
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
            <Camera className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">4-Lane Video Upload</h2>
            <p className="text-xs text-muted-foreground">Upload traffic camera feeds for AI-powered vehicle detection (YOLOv8 simulation)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lanes.map((lane, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">{lane.name}</h3>
              {lane.status === 'done' && (
                <span className="flex items-center gap-1 text-xs text-signal-green">
                  <CheckCircle className="w-3 h-3" /> Processed
                </span>
              )}
            </div>

            {lane.file ? (
              <div className="space-y-3">
                <video
                  src={URL.createObjectURL(lane.file)}
                  className="aspect-video w-full rounded-lg bg-secondary object-cover"
                  controls
                  muted
                  autoPlay
                  loop
                />
                <div className="text-xs text-muted-foreground truncate">{lane.file.name}</div>
                {lane.status === 'uploading' && (
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full animate-pulse w-2/3" />
                  </div>
                )}
                {lane.status === 'processing' && (
                  <div className="text-xs text-accent font-medium animate-pulse">🔍 Running YOLOv8 detection...</div>
                )}
                {lane.status === 'done' && (
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <div className="text-2xl font-mono font-bold text-primary">{lane.vehicleCount}</div>
                    <div className="text-[10px] text-muted-foreground">Vehicles Detected</div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => inputRefs.current[i]?.click()}
                className="w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <Upload className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload video file</span>
                <input
                  ref={el => { inputRefs.current[i] = el; }}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(i, file);
                  }}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}