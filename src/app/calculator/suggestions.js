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

const suggestions = {
  transportation: [
    {
      text: "Try carpooling or using public transport for your commute",
      impact: "Can reduce emissions by up to 50%",
    },
    {
      text: "Consider walking or cycling for short trips under 2 kms",
      impact: "Eliminates emissions completely for these trips",
    },
    {
      text: "Maintain proper tire pressure to improve fuel efficiency",
      impact: "Can improve efficiency by 3%",
    },
  ],
  energyUse: [
    {
      text: "Switch to LED bulbs in your most-used rooms",
      impact: "Reduces lighting energy use by 75%",
    },
    {
      text: "Use a programmable thermostat to optimize heating/cooling",
      impact: "Can save up to 10% on energy",
    },
    {
      text: "Unplug electronics when not in use to avoid phantom power",
      impact: "Saves 5-10% on electricity",
    },
  ],
  foodConsumption: [
    {
      text: "Try having one meatless day per week",
      impact: "Reduces food emissions by ~15%",
    },
    {
      text: "Plan meals to reduce food waste",
      impact: "Can reduce food waste by 25%",
    },
    {
      text: "Buy local and seasonal produce when possible",
      impact: "Reduces transport emissions",
    },
  ],
  wasteManagement: [
    {
      text: "Start composting kitchen scraps",
      impact: "Reduces methane emissions",
    },
    {
      text: "Implement a recycling system at home",
      impact: "Reduces landfill waste by 30%",
    },
    {
      text: "Use reusable containers instead of disposable ones",
      impact: "Reduces packaging waste",
    },
  ],
  waterUsage: [
    {
      text: "Install low-flow showerheads",
      impact: "Reduces water usage by 40%",
    },
    {
      text: "Fix any leaking faucets",
      impact: "Saves up to 3,000 gallons per year",
    },
    {
      text: "Collect rainwater for garden use",
      impact: "Reduces treated water usage",
    },
  ],
  socialActivities: [
    {
      text: "Choose venues closer to home for events",
      impact: "Reduces transport emissions",
    },
    {
      text: "Opt for virtual meetings when possible",
      impact: "Eliminates travel emissions",
    },
    {
      text: "Support eco-friendly restaurants and venues",
      impact: "Promotes sustainable practices",
    },
  ],
  shopping: [
    {
      text: "Combine multiple online orders",
      impact: "Reduces delivery emissions",
    },
    {
      text: "Choose eco-friendly packaging options",
      impact: "Reduces packaging waste",
    },
    {
      text: "Shop locally when possible",
      impact: "Reduces transport emissions",
    },
  ],
  buildingMaintenance: [
    {
      text: "Add weather stripping to doors and windows",
      impact: "Improves energy efficiency",
    },
    {
      text: "Install a smart power strip",
      impact: "Reduces standby power usage",
    },
    {
      text: "Regular HVAC maintenance",
      impact: "Improves system efficiency by 15%",
    },
  ],
};

export default suggestions;
