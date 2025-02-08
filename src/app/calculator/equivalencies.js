import {
  Car,
  Home,
  Sandwich,
  ShoppingBag,
  Droplet,
  Users,
  Package,
  Building,
  Heart,
  Info,
  TreeDeciduous,
  Flame,
  Lightbulb,
} from "lucide-react";

const equivalencies = [
  { name: "Smartphones Charged", factor: 0.005, icon: ShoppingBag }, // kg CO2 per charge
  { name: "Distance Driven", factor: 0.404, icon: Car }, // kg CO2 per mile
  { name: "Trees Needed (1 Year)", factor: 21, icon: TreeDeciduous }, // kg CO2 absorbed per tree per year
  { name: "Gallons of Gasoline", factor: 8.887, icon: Flame }, // kg CO2 per gallon
];

export default equivalencies;
