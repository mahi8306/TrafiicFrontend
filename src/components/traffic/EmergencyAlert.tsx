


import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Siren } from 'lucide-react';
import type { TrafficIntersection } from '@/lib/trafficData';

interface Props {
  intersections: TrafficIntersection[];
}

export function EmergencyAlert({ intersections }: Props) {
  if (intersections.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-destructive/40 bg-destructive/10 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Siren className="w-4 h-4 text-destructive animate-pulse" />
          <h3 className="text-sm font-bold text-destructive">Emergency Alerts</h3>
        </div>
        <div className="space-y-2">
          {intersections.map(i => (
            <div key={i.id} className="flex items-center gap-2 bg-background/50 rounded-md px-3 py-2">
              <AlertTriangle className="w-3 h-3 text-emergency flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate">{i.name}</div>
                <div className="text-[10px] text-muted-foreground">{i.city} · Green corridor active</div>
              </div>
              <span className="text-[10px] font-mono font-bold text-signal-green px-1.5 py-0.5 bg-primary/10 rounded">
                GREEN
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
