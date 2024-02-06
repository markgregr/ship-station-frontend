// В types.ts
interface ApiResponse<T> {
  data: T;
}

interface ShipDetailsProps {
  shipDetails: Ship;
}

interface Ship {
  flag: string;
  ship_name: string;
  ship_id: number;
  ship_status: string;
  ship_type: string;
  classification: string;
  pasport_details: string;
  photo: string;
  crew_capacity: number;
  cargo_capacity: number;
}

export type { Ship, ApiResponse, ShipDetailsProps };
