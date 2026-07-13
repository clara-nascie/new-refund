import food from "../assets/icons/food.svg";
import others from "../assets/icons/others.svg";
import services from "../assets/icons/services.svg";
import transport from "../assets/icons/transport.svg";
import accommodation from "../assets/icons/accomodation.svg";

export const CATEGORIES = {
  food: {
    name: "Alimentação",
    icon: food,
  },
  transportation: {
    name: "Transporte",
    icon: transport,
  },
  services: {
    name: "Serviços",
    icon: services,
  },
  accommodation: {
    name: "Hospedagem",
    icon: accommodation,
  },
  others: {
    name: "Outros",
    icon: others,
  },
};

export const CATEGORIES_OPTIONS = Object.values(CATEGORIES);

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;

