import { motion } from 'framer-motion';
import type { TrafficIntersection } from '@/lib/trafficData';

interface Props {
  intersection: TrafficIntersection;
}

export function SignalPanel({ intersection }: Props) {
  const total = intersection.lanes.reduce((s, l) => s + l.vehicleCount, 0);

  return (
    <div className={`rounded-lg border p-4 ${intersection.emergencyActive ? 'border-emergency/50 animate-emergency' : 'border-border'} bg-card`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{intersection.name}</h3>
          <p className="text-xs text-muted-foreground">{intersection.city}</p>
        </div>
        {intersection.emergencyActive && (
          <span className="text-xs font-bold text-emergency px-2 py-0.5 bg-emergency/15 rounded">🚑 EMERGENCY</span>
        )}
      </div>

      {/* Signal lights */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1.5 p-2 bg-background rounded-lg">
          {(['red', 'yellow', 'green'] as const).map(color => (
            <motion.div
              key={color}
              className={`w-5 h-5 rounded-full ${
                color === 'red' ? 'bg-signal-red' : color === 'yellow' ? 'bg-signal-yellow' : 'bg-signal-green'
              }`}
              animate={{
                opacity: intersection.signalState === color ? 1 : 0.15,
                scale: intersection.signalState === color ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Green Time</div>
          <div className="text-lg font-mono font-bold text-foreground">{intersection.greenTime}s</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-secondary rounded-md p-2">
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="text-sm font-mono font-bold text-foreground">{total}</div>
        </div>
        <div className="bg-secondary rounded-md p-2">
          <div className="text-xs text-muted-foreground">Density</div>
          <div className={`text-sm font-bold capitalize ${
            intersection.density === 'high' ? 'text-signal-red' : intersection.density === 'medium' ? 'text-signal-yellow' : 'text-signal-green'
          }`}>{intersection.density}</div>
        </div>
        <div className="bg-secondary rounded-md p-2">
          <div className="text-xs text-muted-foreground">Signal</div>
          <div className={`text-sm font-bold uppercase ${
            intersection.signalState === 'red' ? 'text-signal-red' : intersection.signalState === 'yellow' ? 'text-signal-yellow' : 'text-signal-green'
          }`}>{intersection.signalState}</div>
        </div>
      </div>
    </div>
  );
}
