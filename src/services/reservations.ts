import { api } from "@/lib/api";

export interface Reservation {
  id: string;
  zoneId: string;
  zoneName: string;
  vehicleNumber: string;
  startTime: string;
  endTime: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  price: number;
  userName: string;
  createdAt: string;
}

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "res-7201",
    zoneId: "zone-2",
    zoneName: "VIP Parking",
    vehicleNumber: "VIP-99-FAST",
    startTime: "2026-06-30T12:00:00Z",
    endTime: "2026-06-30T16:00:00Z",
    status: "approved",
    price: 32.0,
    userName: "Alex Morgan",
    createdAt: "2026-06-29T10:00:00Z",
  },
  {
    id: "res-7202",
    zoneId: "zone-1",
    zoneName: "EV Charging Zone",
    vehicleNumber: "TES-11-CHARG",
    startTime: "2026-06-30T14:30:00Z",
    endTime: "2026-06-30T17:30:00Z",
    status: "pending",
    price: 13.5,
    userName: "Jessica Alba",
    createdAt: "2026-06-30T08:15:00Z",
  },
  {
    id: "res-7203",
    zoneId: "zone-3",
    zoneName: "Premium Parking",
    vehicleNumber: "BMW-55-DRIV",
    startTime: "2026-06-30T09:00:00Z",
    endTime: "2026-06-30T13:00:00Z",
    status: "completed",
    price: 20.0,
    userName: "Marcus Aurelius",
    createdAt: "2026-06-30T04:00:00Z",
  },
  {
    id: "res-7204",
    zoneId: "zone-4",
    zoneName: "Visitor Parking",
    vehicleNumber: "TOY-88-RELI",
    startTime: "2026-06-29T11:00:00Z",
    endTime: "2026-06-29T15:00:00Z",
    status: "cancelled",
    price: 10.0,
    userName: "John Doe",
    createdAt: "2026-06-29T09:30:00Z",
  },
];

let mockReservationsState: Reservation[] = [...INITIAL_RESERVATIONS];

if (typeof window !== "undefined") {
  const cached = localStorage.getItem("sportsync_reservations");
  if (cached) {
    try {
      mockReservationsState = JSON.parse(cached);
    } catch {
      // Use INITIAL_RESERVATIONS
    }
  }
}

const saveLocalReservations = (reservations: Reservation[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sportsync_reservations", JSON.stringify(reservations));
  }
  mockReservationsState = reservations;
};

export const reservationsService = {
  async getReservations(): Promise<Reservation[]> {
    try {
      const response = await api.get<Reservation[]>("/reservations");
      return response.data;
    } catch (error) {
      console.warn("Reservations Service: getReservations failed. Falling back to local state.", error);
      return mockReservationsState;
    }
  },

  async createReservation(reservationData: Omit<Reservation, "id" | "status" | "createdAt">): Promise<Reservation> {
    try {
      const response = await api.post<Reservation>("/reservations", reservationData);
      return response.data;
    } catch (error) {
      console.warn("Reservations Service: createReservation failed. Creating locally.", error);
      const newReservation: Reservation = {
        ...reservationData,
        id: `res-${Math.floor(Math.random() * 9000 + 1000)}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      const updated = [newReservation, ...mockReservationsState];
      saveLocalReservations(updated);
      return newReservation;
    }
  },

  async updateReservationStatus(id: string, status: Reservation["status"]): Promise<Reservation> {
    try {
      const response = await api.put<Reservation>(`/reservations/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.warn(`Reservations Service: updateStatus for ${id} failed. Simulating locally.`, error);
      const updated = mockReservationsState.map(res => {
        if (res.id === id) {
          return { ...res, status };
        }
        return res;
      });
      saveLocalReservations(updated);
      const matched = updated.find(r => r.id === id);
      if (!matched) throw new Error("Reservation not found for status update");
      return matched;
    }
  },

  async cancelReservation(id: string): Promise<boolean> {
    try {
      await api.delete(`/reservations/${id}`);
      return true;
    } catch (error) {
      console.warn(`Reservations Service: cancelReservation for ${id} failed. Simulating locally.`, error);
      const updated = mockReservationsState.map(res => {
        if (res.id === id) {
          return { ...res, status: "cancelled" as const };
        }
        return res;
      });
      saveLocalReservations(updated);
      return true;
    }
  }
};
