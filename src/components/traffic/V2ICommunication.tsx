import { Wifi, Car, Truck, Bike, Bus, Siren, ArrowRight } from 'lucide-react';
import type { V2IVehicle, TrafficIntersection } from '@/lib/trafficData';

interface Props {
  vehicles: V2IVehicle[];
  intersections: TrafficIntersection[];
}

const typeIcon = { car: Car, bike: Bike, bus: Bus, truck: Truck, ambulance: Siren };

export function V2ICommunication({ vehicles, intersections }: Props) {
  const grouped = intersections.slice(0, 6).map(inter => ({
    intersection: inter,
    vehicles: vehicles.filter(v => v.signalId === inter.id),
  }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-v2i/15 flex items-center justify-center">
            <Wifi className="w-5 h-5 text-v2i" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Smart WiFi V2I Communication</h2>
            <p className="text-xs text-muted-foreground">Vehicle-to-Infrastructure data exchange via simulated WiFi</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-lg font-mono font-bold text-v2i">{vehicles.length}</div>
            <div className="text-[10px] text-muted-foreground">Connected Vehicles</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-lg font-mono font-bold text-primary">{vehicles.filter(v => v.type === 'ambulance').length}</div>
            <div className="text-[10px] text-muted-foreground">Emergency Units</div>
          </div>
          <div className="bg-secondary rounded-lg p-3 text-center">
            <div className="text-lg font-mono font-bold text-accent">{Math.round(vehicles.reduce((s, v) => s + v.speed, 0) / Math.max(vehicles.length, 1))}</div>
            <div className="text-[10px] text-muted-foreground">Avg Speed (km/h)</div>
          </div>
        </div>
      </div>

      {/* Communication feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {grouped.map(({ intersection, vehicles: veh }) => (
          <div key={intersection.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-foreground">{intersection.name}</div>
                <div className="text-[10px] text-muted-foreground">{intersection.city}</div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-v2i">
                <Wifi className="w-3 h-3" />
                {veh.length} connected
              </div>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-auto">
              {veh.map(v => {
                const Icon = typeIcon[v.type];
                return (
                  <div key={v.id} className={`flex items-center gap-2 text-xs px-2 py-1.5 rounded ${v.type === 'ambulance' ? 'bg-emergency/10 border border-emergency/30' : 'bg-secondary'}`}>
                    <Icon className={`w-3 h-3 flex-shrink-0 ${v.type === 'ambulance' ? 'text-emergency' : 'text-muted-foreground'}`} />
                    <span className="text-foreground capitalize flex-1">{v.type}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    <span className="font-mono text-muted-foreground">{v.speed}km/h</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
