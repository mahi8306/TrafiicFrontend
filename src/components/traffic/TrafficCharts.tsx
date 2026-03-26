// import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
// import type { TrafficTrend, TrafficIntersection } from '@/lib/trafficData';

// interface Props {
//   trends: TrafficTrend[];
//   intersections: TrafficIntersection[];
//   selectedIntersection: TrafficIntersection | null;
// }

// const LANE_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

// export function TrafficCharts({ trends, intersections, selectedIntersection }: Props) {
//   const vehicleTypes = selectedIntersection ? [
//     { name: 'Cars', value: selectedIntersection.lanes.reduce((s, l) => s + l.cars, 0) },
//     { name: 'Bikes', value: selectedIntersection.lanes.reduce((s, l) => s + l.bikes, 0) },
//     { name: 'Buses', value: selectedIntersection.lanes.reduce((s, l) => s + l.buses, 0) },
//     { name: 'Trucks', value: selectedIntersection.lanes.reduce((s, l) => s + l.trucks, 0) },
//   ] : [];

//   const signalData = intersections.slice(0, 8).map(i => ({
//     name: i.name.length > 12 ? i.name.slice(0, 12) + '…' : i.name,
//     greenTime: i.greenTime,
//     density: i.density,
//   }));

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//       {/* Traffic Trend */}
//       <div className="rounded-lg border border-border bg-card p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Trend (5-min intervals)</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={trends}>
//             <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//             <XAxis dataKey="time" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//             <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//             <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
//             {['lane1', 'lane2', 'lane3', 'lane4'].map((key, i) => (
//               <Line key={key} type="monotone" dataKey={key} stroke={LANE_COLORS[i]} strokeWidth={2} dot={false} name={`Lane ${i + 1}`} />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Signal Timing */}
//       <div className="rounded-lg border border-border bg-card p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-4">Signal Green Time (seconds)</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={signalData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//             <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
//             <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//             <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
//             <Bar dataKey="greenTime" radius={[4, 4, 0, 0]}>
//               {signalData.map((entry, i) => (
//                 <Cell key={i} fill={entry.density === 'high' ? '#ef4444' : entry.density === 'medium' ? '#f59e0b' : '#22c55e'} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Vehicle Type Breakdown */}
//       {selectedIntersection && (
//         <div className="rounded-lg border border-border bg-card p-4">
//           <h3 className="text-sm font-semibold text-foreground mb-1">Vehicle Breakdown</h3>
//           <p className="text-xs text-muted-foreground mb-3">{selectedIntersection.name}</p>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={vehicleTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} strokeWidth={0}>
//                 {vehicleTypes.map((_, i) => (
//                   <Cell key={i} fill={LANE_COLORS[i]} />
//                 ))}
//               </Pie>
//               <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(215 20% 55%)' }} />
//               <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* Intersection comparison */}
//       <div className="rounded-lg border border-border bg-card p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Count by Intersection</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={intersections.slice(0, 8).map(i => ({
//             name: i.name.length > 10 ? i.name.slice(0, 10) + '…' : i.name,
//             total: i.lanes.reduce((s, l) => s + l.vehicleCount, 0),
//           }))}>
//             <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
//             <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
//             <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
//             <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
//             <Bar dataKey="total" fill="hsl(185 80% 50%)" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }



import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import type { TrafficTrend, TrafficIntersection } from '@/lib/trafficData';

interface Props {
  trends: TrafficTrend[];
  intersections: TrafficIntersection[];
  selectedIntersection: TrafficIntersection | null;
}

const LANE_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export function TrafficCharts({ trends, intersections, selectedIntersection }: Props) {
  const vehicleTypes = selectedIntersection ? [
    { name: 'Cars', value: selectedIntersection.lanes.reduce((s, l) => s + l.cars, 0) },
    { name: 'Bikes', value: selectedIntersection.lanes.reduce((s, l) => s + l.bikes, 0) },
    { name: 'Buses', value: selectedIntersection.lanes.reduce((s, l) => s + l.buses, 0) },
    { name: 'Trucks', value: selectedIntersection.lanes.reduce((s, l) => s + l.trucks, 0) },
  ] : [];

  const signalData = intersections.slice(0, 8).map(i => ({
    name: i.name.length > 12 ? i.name.slice(0, 12) + '…' : i.name,
    greenTime: i.greenTime,
    density: i.density,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Traffic Trend */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Trend (5-min intervals)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
            <XAxis dataKey="time" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
            <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
            {['lane1', 'lane2', 'lane3', 'lane4'].map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={LANE_COLORS[i]} strokeWidth={2} dot={false} name={`Lane ${i + 1}`} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Signal Timing */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Signal Green Time (seconds)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={signalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
            <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="greenTime" radius={[4, 4, 0, 0]}>
              {signalData.map((entry, i) => (
                <Cell key={i} fill={entry.density === 'high' ? '#ef4444' : entry.density === 'medium' ? '#f59e0b' : '#22c55e'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Vehicle Type Breakdown */}
      {selectedIntersection && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">Vehicle Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-3">{selectedIntersection.name}</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={vehicleTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} strokeWidth={0}>
                {vehicleTypes.map((_, i) => (
                  <Cell key={i} fill={LANE_COLORS[i]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(215 20% 55%)' }} />
              <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Intersection comparison */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Vehicle Count by Intersection</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={intersections.slice(0, 8).map(i => ({
            name: i.name.length > 10 ? i.name.slice(0, 10) + '…' : i.name,
            total: i.lanes.reduce((s, l) => s + l.vehicleCount, 0),
          }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 9 }} angle={-30} textAnchor="end" height={60} />
            <YAxis tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: 'hsl(222 44% 9%)', border: '1px solid hsl(222 30% 18%)', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="total" fill="hsl(185 80% 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}