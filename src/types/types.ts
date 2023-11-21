// В types.ts
interface ApiResponse<T> {
  data: T;
}

interface BaggageDetailsProps {
  baggageDetails: Baggage;
}

interface Baggage {
  airline: string;
  baggage_code: string;
  baggage_id: number;
  baggage_status: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  photo: string;
  size: string;
  weight: number;
}

export type { Baggage, ApiResponse, BaggageDetailsProps };
