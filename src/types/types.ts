// В types.ts
interface ApiResponse<T> {
  data: T;
}

interface ShipDetailsProps {
  shipDetails: Ship;
}

interface Ship {
  airline: string;
  ship_code: string;
  ship_id: number;
  ship_status: string;
  ship_type: string;
  owner_name: string;
  pasport_details: string;
  photo: string;
  size: string;
  weight: number;
}

export type { Ship, ApiResponse, ShipDetailsProps };
