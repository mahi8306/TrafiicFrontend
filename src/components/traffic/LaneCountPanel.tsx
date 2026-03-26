import { Car, Bike, Bus, Truck } from 'lucide-react';
import type { LaneData } from '@/lib/trafficData';

interface Props {
  lanes: LaneData[];
}

const icons = { cars: Car, bikes: Bike, buses: Bus, trucks: Truck };

export function LaneCountPanel({ lanes }: Props) {
  const maxCount = Math.max(...lanes.map(l => l.vehicleCount), 1);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Vehicle Count by Lane</h3>
      <div className="space-y-3">
        {lanes.map(lane => (
          <div key={lane.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">{lane.name}</span>
              <span className="text-xs font-mono font-bold text-foreground">{lane.vehicleCount}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(lane.vehicleCount / maxCount) * 100}%`,
                  backgroundColor: lane.vehicleCount > maxCount * 0.7 ? 'hsl(var(--signal-red))' : lane.vehicleCount > maxCount * 0.4 ? 'hsl(var(--signal-yellow))' : 'hsl(var(--signal-green))',
                }}
              />
            </div>
            <div className="flex items-center gap-3 mt-1">
              {(Object.entries(icons) as [keyof typeof icons, typeof Car][]).map(([key, Icon]) => (
                <span key={key} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Icon className="w-3 h-3" />
                  {lane[key]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
