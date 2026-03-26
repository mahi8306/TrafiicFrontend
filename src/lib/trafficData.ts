// Simulated traffic data engine

export interface TrafficIntersection {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  lanes: LaneData[];
  signalState: 'red' | 'yellow' | 'green';
  greenTime: number;
  density: 'high' | 'medium' | 'low';
  emergencyActive: boolean;
}

export interface LaneData {
  id: string;
  name: string;
  vehicleCount: number;
  cars: number;
  bikes: number;
  buses: number;
  trucks: number;
  speed: number;
}

export interface V2IVehicle {
  id: string;
  type: 'car' | 'bike' | 'bus' | 'truck' | 'ambulance';
  speed: number;
  lat: number;
  lng: number;
  heading: number;
  signalId: string;
}

export interface TrafficTrend {
  time: string;
  lane1: number;
  lane2: number;
  lane3: number;
  lane4: number;
}

const cities: Omit<TrafficIntersection, 'lanes' | 'signalState' | 'greenTime' | 'density' | 'emergencyActive'>[] = [
  { id: 'del-1', name: 'ITO Junction', city: 'Delhi', lat: 28.6292, lng: 77.2410 },
  { id: 'del-2', name: 'Connaught Place', city: 'Delhi', lat: 28.6315, lng: 77.2167 },
  { id: 'mum-1', name: 'Dadar Junction', city: 'Mumbai', lat: 19.0178, lng: 72.8478 },
  { id: 'mum-2', name: 'Andheri Signal', city: 'Mumbai', lat: 19.1197, lng: 72.8468 },
  { id: 'blr-1', name: 'Silk Board', city: 'Bengaluru', lat: 12.9170, lng: 77.6227 },
  { id: 'blr-2', name: 'MG Road', city: 'Bengaluru', lat: 12.9757, lng: 77.6062 },
  { id: 'chen-1', name: 'T Nagar Signal', city: 'Chennai', lat: 13.0418, lng: 80.2341 },
  { id: 'hyd-1', name: 'Hitech City', city: 'Hyderabad', lat: 17.4435, lng: 78.3772 },
  { id: 'kol-1', name: 'Park Street', city: 'Kolkata', lat: 22.5512, lng: 88.3518 },
  { id: 'pne-1', name: 'Hinjewadi', city: 'Pune', lat: 18.5912, lng: 73.7389 },
  { id: 'ahm-1', name: 'SG Highway', city: 'Ahmedabad', lat: 23.0396, lng: 72.5274 },
  { id: 'jai-1', name: 'MI Road', city: 'Jaipur', lat: 26.9163, lng: 75.8010 },
  { id: 'lko-1', name: 'Hazratganj', city: 'Lucknow', lat: 26.8528, lng: 80.9440 },
  { id: 'chn-1', name: 'Sector 17', city: 'Chandigarh', lat: 30.7415, lng: 76.7684 },
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLane(id: string, name: string): LaneData {
  const cars = randomInt(5, 40);
  const bikes = randomInt(2, 25);
  const buses = randomInt(0, 5);
  const trucks = randomInt(0, 8);
  return {
    id, name,
    vehicleCount: cars + bikes + buses + trucks,
    cars, bikes, buses, trucks,
    speed: randomInt(10, 60),
  };
}

function getDensity(totalVehicles: number): 'high' | 'medium' | 'low' {
  if (totalVehicles > 120) return 'high';
  if (totalVehicles > 60) return 'medium';
  return 'low';
}

export function generateIntersections(): TrafficIntersection[] {
  return cities.map(c => {
    const lanes = [
      generateLane(`${c.id}-L1`, 'North'),
      generateLane(`${c.id}-L2`, 'South'),
      generateLane(`${c.id}-L3`, 'East'),
      generateLane(`${c.id}-L4`, 'West'),
    ];
    const total = lanes.reduce((s, l) => s + l.vehicleCount, 0);
    const density = getDensity(total);
    const emergencyActive = Math.random() < 0.08;
    const signalState = emergencyActive ? 'green' as const : (['red', 'green', 'yellow'] as const)[randomInt(0, 2)];
    const greenTime = density === 'high' ? randomInt(45, 90) : density === 'medium' ? randomInt(30, 45) : randomInt(15, 30);
    return { ...c, lanes, signalState, greenTime, density, emergencyActive };
  });
}

export function generateTrends(count = 12): TrafficTrend[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const t = new Date(now.getTime() - (count - 1 - i) * 5 * 60000);
    return {
      time: t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      lane1: randomInt(10, 60),
      lane2: randomInt(8, 55),
      lane3: randomInt(12, 50),
      lane4: randomInt(5, 45),
    };
  });
}

export function generateV2IVehicles(intersections: TrafficIntersection[]): V2IVehicle[] {
  const vehicles: V2IVehicle[] = [];
  intersections.slice(0, 6).forEach(inter => {
    const count = randomInt(2, 5);
    for (let i = 0; i < count; i++) {
      vehicles.push({
        id: `v2i-${inter.id}-${i}`,
        type: (['car', 'bike', 'bus', 'truck'] as const)[randomInt(0, 3)],
        speed: randomInt(15, 80),
        lat: inter.lat + (Math.random() - 0.5) * 0.01,
        lng: inter.lng + (Math.random() - 0.5) * 0.01,
        heading: randomInt(0, 359),
        signalId: inter.id,
      });
    }
    if (inter.emergencyActive) {
      vehicles.push({
        id: `v2i-${inter.id}-amb`,
        type: 'ambulance',
        speed: randomInt(40, 80),
        lat: inter.lat + (Math.random() - 0.5) * 0.005,
        lng: inter.lng + (Math.random() - 0.5) * 0.005,
        heading: randomInt(0, 359),
        signalId: inter.id,
      });
    }
  });
  return vehicles;
}
