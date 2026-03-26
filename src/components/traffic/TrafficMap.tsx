import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { TrafficIntersection } from '@/lib/trafficData';

interface Props {
  intersections: TrafficIntersection[];
  onSelectIntersection: (i: TrafficIntersection) => void;
  selectedId?: string;
}

const densityColor = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

export function TrafficMap({ intersections, onSelectIntersection, selectedId }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Layer[]>([]);
  const routeLinesRef = useRef<L.Polyline[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const emergencyIntersections = useMemo(
    () => intersections.filter(i => i.emergencyActive),
    [intersections]
  );

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current, {
      center: [22.5, 78.9],
      zoom: 5,
      zoomControl: true,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapRef.current);
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Draw emergency routes in blue
  useEffect(() => {
    if (!mapRef.current) return;
    routeLinesRef.current.forEach(l => l.remove());
    routeLinesRef.current = [];

    if (emergencyIntersections.length >= 2) {
      // Connect emergency intersections with blue route lines
      for (let i = 0; i < emergencyIntersections.length - 1; i++) {
        const a = emergencyIntersections[i];
        const b = emergencyIntersections[i + 1];
        const line = L.polyline(
          [[a.lat, a.lng], [b.lat, b.lng]],
          { color: '#3b82f6', weight: 4, opacity: 0.8, dashArray: '10 6' }
        ).addTo(mapRef.current!);
        line.bindPopup(`<div style="font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:#3b82f6">🚑 Emergency Corridor<br/><span style="font-weight:400;color:#888">${a.name} → ${b.name}</span></div>`);
        routeLinesRef.current.push(line);
      }
    }

    // Also draw a blue glow circle around each emergency intersection
    emergencyIntersections.forEach(inter => {
      const glow = L.circleMarker([inter.lat, inter.lng], {
        radius: 30,
        fillColor: '#3b82f6',
        fillOpacity: 0.12,
        color: '#3b82f6',
        weight: 1.5,
        opacity: 0.4,
      }).addTo(mapRef.current!);
      routeLinesRef.current.push(glow as unknown as L.Polyline);
    });
  }, [emergencyIntersections]);

  // Draw intersection markers
  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach(m => (m as L.CircleMarker).remove());
    markersRef.current = [];

    intersections.forEach(inter => {
      const color = densityColor[inter.density];
      const isSelected = inter.id === selectedId;
      const marker = L.circleMarker([inter.lat, inter.lng], {
        radius: isSelected ? 12 : inter.emergencyActive ? 10 : 7,
        fillColor: inter.emergencyActive ? '#a855f7' : color,
        fillOpacity: 0.85,
        color: isSelected ? '#ffffff' : color,
        weight: isSelected ? 3 : 1.5,
        opacity: 0.9,
      }).addTo(mapRef.current!);

      const total = inter.lanes.reduce((s, l) => s + l.vehicleCount, 0);
      const avgSpeed = Math.round(inter.lanes.reduce((s, l) => s + l.speed, 0) / inter.lanes.length);
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;min-width:200px">
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${inter.name}</div>
          <div style="font-size:12px;opacity:0.6;margin-bottom:10px">${inter.city}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px">
            <div style="background:#ffffff10;padding:6px 8px;border-radius:6px">
              <div style="opacity:0.5;font-size:10px;margin-bottom:2px">Vehicles</div>
              <div style="font-weight:700;font-family:JetBrains Mono,monospace">${total}</div>
            </div>
            <div style="background:#ffffff10;padding:6px 8px;border-radius:6px">
              <div style="opacity:0.5;font-size:10px;margin-bottom:2px">Avg Speed</div>
              <div style="font-weight:700;font-family:JetBrains Mono,monospace">${avgSpeed} km/h</div>
            </div>
            <div style="background:#ffffff10;padding:6px 8px;border-radius:6px">
              <div style="opacity:0.5;font-size:10px;margin-bottom:2px">Signal</div>
              <div style="font-weight:600;color:${inter.signalState === 'green' ? '#22c55e' : inter.signalState === 'red' ? '#ef4444' : '#f59e0b'};text-transform:uppercase">${inter.signalState}</div>
            </div>
            <div style="background:#ffffff10;padding:6px 8px;border-radius:6px">
              <div style="opacity:0.5;font-size:10px;margin-bottom:2px">Green Time</div>
              <div style="font-weight:700;font-family:JetBrains Mono,monospace">${inter.greenTime}s</div>
            </div>
          </div>
          <div style="margin-top:8px;display:flex;gap:4px;font-size:10px">
            <span style="background:#ffffff10;padding:2px 6px;border-radius:4px">🚗 ${inter.lanes.reduce((s,l)=>s+l.cars,0)}</span>
            <span style="background:#ffffff10;padding:2px 6px;border-radius:4px">🏍 ${inter.lanes.reduce((s,l)=>s+l.bikes,0)}</span>
            <span style="background:#ffffff10;padding:2px 6px;border-radius:4px">🚌 ${inter.lanes.reduce((s,l)=>s+l.buses,0)}</span>
            <span style="background:#ffffff10;padding:2px 6px;border-radius:4px">🚛 ${inter.lanes.reduce((s,l)=>s+l.trucks,0)}</span>
          </div>
          ${inter.emergencyActive ? '<div style="margin-top:8px;padding:6px 8px;background:#3b82f620;border:1px solid #3b82f7;border-radius:6px;font-size:11px;color:#3b82f6;text-align:center;font-weight:600">🚑 EMERGENCY — GREEN CORRIDOR ACTIVE</div>' : ''}
        </div>
      `);

      marker.on('click', () => onSelectIntersection(inter));
      markersRef.current.push(marker);

      // Heatmap glow for high density
      if (inter.density === 'high') {
        const glow = L.circleMarker([inter.lat, inter.lng], {
          radius: 25,
          fillColor: color,
          fillOpacity: 0.15,
          stroke: false,
        }).addTo(mapRef.current!);
        markersRef.current.push(glow);
      }
    });
  }, [intersections, selectedId, onSelectIntersection]);

  return (

    <div className="rounded-lg border border-border overflow-hidden h-full relative">
      <div className="absolute top-3 left-3 z-[1000] bg-card/90 backdrop-blur px-3 py-2 rounded-lg border border-border">
        <div className="text-xs font-medium text-foreground mb-1.5">Traffic Density</div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-traffic-low" /> Low</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-traffic-medium" /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-traffic-high" /> High</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emergency" /> Emergency</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 rounded" /> Route</span>
        </div>
      </div>
      <div ref={containerRef} className="w-full h-full min-h-[500px]" />
    </div>
    
  );
}
