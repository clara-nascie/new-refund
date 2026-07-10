import food from "../assets/icons/food.svg";
import others from "../assets/icons/others.svg";
import services from "../assets/icons/services.svg";
import transport from "../assets/icons/transport.svg";
import accommodation from "../assets/icons/accommodation.svg";

export const CATEGORIES_OPTIONS = [
  {
    name: "Alimentação",
    icon: food,
  },
  {
    name: "Transporte",
    icon: transport,
  },
  {
    name: "Serviços",
    icon: services,
  },
  {
    name: "Hospedagem",
    icon: accommodation,
  },
  {
    name: "Outros",
    icon: others,
  },
];

export const CATEGORIES_KEYS = Object.keys(CATEGORIES_OPTIONS) as Array<
  keyof typeof CATEGORIES_OPTIONS
>;
