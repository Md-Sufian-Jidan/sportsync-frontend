import { api } from "@/lib/api";

export interface ParkingZone {
  id: string;
  name: string;
  availableSpots: number;
  totalSpots: number;
  pricePerHour: number;
  description: string;
  features: string[];
}

const INITIAL_ZONES: ParkingZone[] = [
  {
    id: "zone-1",
    name: "EV Charging Zone",
    availableSpots: 12,
    totalSpots: 20,
    pricePerHour: 4.5,
    description: "Equipped with high-speed DC charging stations. Priority access for electric vehicles.",
    features: ["Level 3 Charging", "CCTV Monitored", "Underground"],
  },
  {
    id: "zone-2",
    name: "VIP Parking",
    availableSpots: 3,
    totalSpots: 10,
    pricePerHour: 8.0,
    description: "Spacious premium spots located closest to main exit gates with dedicated valet access.",
    features: ["Closest to Exit", "Wider Spaces", "Valet Included", "24/7 Security"],
  },
  {
    id: "zone-3",
    name: "Premium Parking",
    availableSpots: 28,
    totalSpots: 50,
    pricePerHour: 5.0,
    description: "Covered, well-lit spaces offering top security and quick entry pathways.",
    features: ["Covered Parking", "Well Lit", "Fast Pathway"],
  },
  {
    id: "zone-4",
    name: "Visitor Parking",
    availableSpots: 64,
    totalSpots: 120,
    pricePerHour: 2.5,
    description: "General parking areas ideal for long-term and short-term standard visitors.",
    features: ["Outdoor", "Budget Friendly", "Self Service"],
  },
];

let mockZonesState: ParkingZone[] = [...INITIAL_ZONES];

if (typeof window !== "undefined") {
  const cached = localStorage.getItem("sportsync_zones");
  if (cached) {
    try {
      mockZonesState = JSON.parse(cached);
    } catch {
      // Use fallback INITIAL_ZONES
    }
  }
}

const saveLocalZones = (zones: ParkingZone[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sportsync_zones", JSON.stringify(zones));
  }
  mockZonesState = zones;
};

export const zonesService = {
  async getZones(): Promise<ParkingZone[]> {
    try {
      const response = await api.get<ParkingZone[]>("/zones");
      return response.data;
    } catch (error) {
      console.warn("Zones Service: getZones failed. Falling back to local state.", error);
      return mockZonesState;
    }
  },

  async getZoneById(id: string): Promise<ParkingZone> {
    try {
      const response = await api.get<ParkingZone>(`/zones/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`Zones Service: getZoneById for ${id} failed.`, error);
      const zone = mockZonesState.find(z => z.id === id);
      if (!zone) throw new Error("Zone not found");
      return zone;
    }
  },

  async createZone(zoneData: Omit<ParkingZone, "id">): Promise<ParkingZone> {
    try {
      const response = await api.post<ParkingZone>("/zones", zoneData);
      return response.data;
    } catch (error) {
      console.warn("Zones Service: createZone failed. Performing local insert.", error);
      const newZone: ParkingZone = {
        ...zoneData,
        id: `zone-${Math.floor(Math.random() * 9000 + 1000)}`,
      };
      const updated = [...mockZonesState, newZone];
      saveLocalZones(updated);
      return newZone;
    }
  },

  async updateZone(id: string, zoneData: Partial<Omit<ParkingZone, "id">>): Promise<ParkingZone> {
    try {
      const response = await api.put<ParkingZone>(`/zones/${id}`, zoneData);
      return response.data;
    } catch (error) {
      console.warn(`Zones Service: updateZone ${id} failed. Performing local update.`, error);
      const updatedZones = mockZonesState.map(zone => {
        if (zone.id === id) {
          return { ...zone, ...zoneData };
        }
        return zone;
      });
      saveLocalZones(updatedZones);
      const updated = updatedZones.find(z => z.id === id);
      if (!updated) throw new Error("Zone not found for update");
      return updated;
    }
  },

  async deleteZone(id: string): Promise<boolean> {
    try {
      await api.delete(`/zones/${id}`);
      return true;
    } catch (error) {
      console.warn(`Zones Service: deleteZone ${id} failed. Performing local deletion.`, error);
      const filtered = mockZonesState.filter(zone => zone.id !== id);
      saveLocalZones(filtered);
      return true;
    }
  }
};
