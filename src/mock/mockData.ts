// mockData.ts
import { Baggage } from "../types/types";
import image1 from "../../public/1.png";
import image2 from "../../public/2.png";
import image3 from "../../public/3.png";
import image4 from "../../public/4.png";

const mockBaggageData: Baggage[] = [
  {
    airline: "S7 Airline",
    baggage_code: "ABC222",
    baggage_id: 1,
    baggage_status: "ативен",
    baggage_type: "сумка",
    owner_name: "Гревцов Марк Алексеевич",
    pasport_details: "2517988765",
    photo: image1,
    size: "30x45x30",
    weight: 8,
  },
  {
    airline: "NordWind",
    baggage_code: "AAA123",
    baggage_id: 2,
    baggage_status: "ативен",
    baggage_type: "чемодан",
    owner_name: "Кабанец Владимир Михайлович",
    pasport_details: "2517321444",
    photo: image2,
    size: "40x55x60",
    weight: 15,
  },
  {
    airline: "Аэрофлот",
    baggage_code: "BBB123",
    baggage_id: 3,
    baggage_status: "ативен",
    baggage_type: "рюкзак",
    owner_name: "Петров Василий Алексеевич",
    pasport_details: "2517234876",
    photo: image3,
    size: "30x35x40",
    weight: 5,
  },
  {
    airline: "Уральские авиалинии",
    baggage_code: "CCC123",
    baggage_id: 4,
    baggage_status: "ативен",
    baggage_type: "большой чемодан",
    owner_name: "Аюшиев Тимур Олегович",
    pasport_details: "2517555432",
    photo: image4,
    size: "80x65x60",
    weight: 5,
  },
];

export { mockBaggageData };
