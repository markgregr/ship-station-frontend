// mockData.ts
import { Ship } from "../types/types";
import image1 from "../../public/1.png";
import image2 from "../../public/2.png";
import image3 from "../../public/3.png";
import image4 from "../../public/4.png";

const mockShipData: Ship[] = [
  {
    shipID: 1,
    shipName: "Танкер 'Морской гигант'",
    shipType: "танкер",
    cargoCapacity: 50000,
    maxDepth: 20,
    maxLength: 200,
    yearBuilt: 2015,
    flag: "Россия",
    classification: "ABS",
    crewCapacity: 25,
    passengerCapacity: 0,
    photo: image1,
  },
  {
    shipID: 2,
    shipName: "Контейнеровоз 'Океанский бриз'",
    shipType: "контейнеровоз",
    cargoCapacity: 80000,
    maxDepth: 22,
    maxLength: 250,
    yearBuilt: 2018,
    flag: "Панама",
    classification: "DNV",
    crewCapacity: 30,
    passengerCapacity: 0,
    photo: image2,
  },
  {
    shipID: 3,
    shipName: "Пассажирское судно 'Звезда морей'",
    shipType: "пассажирское судно",
    cargoCapacity: 20000,
    maxDepth: 18,
    maxLength: 180,
    yearBuilt: 2010,
    flag: "США",
    classification: "LR",
    crewCapacity: 50,
    passengerCapacity: 200,
    photo: image3,
  },
  {
    shipID: 4,
    shipName: "Грузовое судно 'Большой ковчег'",
    shipType: "грузовое судно",
    cargoCapacity: 100000,
    maxDepth: 25,
    maxLength: 300,
    yearBuilt: 2016,
    flag: "Китай",
    classification: "BV",
    crewCapacity: 40,
    passengerCapacity: 0,
    photo: image4,
  },
];

export { mockShipData };
