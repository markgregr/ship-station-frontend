// mockData.ts
import { Ship } from "../types/types";
import image1 from "../../public/ship1.png";
import image2 from "../../public/ship2.png";
import image3 from "../../public/ship3.png";
import image4 from "../../public/ship4.png";

const mockShipData: Ship[] = [
  {
    ship_id: 1,
    ship_name: "Танкер 'Морской гигант'",
    ship_type: "танкер",
    cargo_capacity: 50000,
    max_depth: 20,
    max_length: 200,
    year_built: 2015,
    flag: "Россия",
    classification: "ABS",
    crew_capacity: 25,
    passenger_capacity: 0,
    photo: image1,
  },
  {
    ship_id: 2,
    ship_name: "Контейнеровоз 'Океанский бриз'",
    ship_type: "контейнеровоз",
    cargo_capacity: 80000,
    max_depth: 22,
    max_length: 250,
    year_built: 2018,
    flag: "Панама",
    classification: "DNV",
    crew_capacity: 30,
    passenger_capacity: 0,
    photo: image2,
  },
  {
    ship_id: 3,
    ship_name: "Пассажирское судно 'Звезда морей'",
    ship_type: "пассажирское судно",
    cargo_capacity: 20000,
    max_depth: 18,
    max_length: 180,
    year_built: 2010,
    flag: "США",
    classification: "LR",
    crew_capacity: 50,
    passenger_capacity: 200,
    photo: image3,
  },
  {
    ship_id: 4,
    ship_name: "Грузовое судно 'Большой ковчег'",
    ship_type: "грузовое судно",
    cargo_capacity: 100000,
    max_depth: 25,
    max_length: 300,
    year_built: 2016,
    flag: "Китай",
    classification: "BV",
    crew_capacity: 40,
    passenger_capacity: 0,
    photo: image4,
  },
];

export { mockShipData };
