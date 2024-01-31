// В types.ts
interface ApiResponse<T> {
  data: T;
}

interface ShipDetailsProps {
  shipDetails: Ship;
}

interface Ship {
  ship_id: number;
  ship_name: string;
  ship_type: string;
  cargo_capacity: number;
  max_depth: number;
  max_length: number;
  year_built: number;
  flag: string;
  classification: string;
  crew_capacity: number;
  passenger_capacity: number;
  photo: string;
}

export type { Ship, ApiResponse, ShipDetailsProps };
