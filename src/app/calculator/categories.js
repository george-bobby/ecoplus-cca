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

// EPA and IPCC-based conversion factors
const categories = [
  {
    id: "transportation",
    title: "Transportation",
    icon: Car,
    info: "Based on EPA emissions standards for average vehicle efficiency",
    questions: [
      {
        id: "carMiles",
        label: "Distance driven by car per week (KM)",
        factor: 0.404,
        source: "EPA average vehicle emissions",
      }, // kg CO2 per mile
      {
        id: "flightHours",
        label: "Hours of flight travel per year",
        factor: 90,
        source: "IPCC aviation metrics",
      }, // kg CO2 per hour
      {
        id: "publicTransport",
        label: "Public transport trips per week",
        factor: 2.61,
        source: "European Environment Agency",
      }, // kg CO2 per trip
    ],
  },

  {
    id: "energyUse",
    title: "Energy Use",
    icon: Flame,
    info: "Based on national averages for energy consumption and production sources",
    questions: [
      {
        id: "electricityUsage",
        label: "kWh of electricity used per month",
        factor: 0.92,
        source: "U.S. EPA average electricity emissions",
      },
      {
        id: "gasHeating",
        label: "Cubic meters of natural gas used per month",
        factor: 2.03,
        source: "EPA natural gas emissions",
      },
      {
        id: "waterHeating",
        label: "Gallons of water heated per month",
        factor: 0.18,
        source: "Energy Information Administration",
      },
    ],
  },
  {
    id: "foodConsumption",
    title: "Food Consumption",
    icon: Sandwich,
    info: "Emissions based on dietary choices and food production methods",
    questions: [
      {
        id: "meatMeals",
        label: "Meat-based meals per week",
        factor: 7.2,
        source: "FAO livestock emissions",
      },
      {
        id: "vegetarianMeals",
        label: "Vegetarian meals per week",
        factor: 2.0,
        source: "UNEP diet study",
      },
      {
        id: "foodWaste",
        label: "Food waste in kg per week",
        factor: 2.5,
        source: "U.S. EPA waste study",
      },
    ],
  },
  {
    id: "wasteManagement",
    title: "Waste Management",
    icon: Package,
    info: "Includes landfill emissions and waste disposal methods",
    questions: [
      {
        id: "landfillWaste",
        label: "Kilograms of waste sent to landfill per week",
        factor: 1.98,
        source: "EPA landfill methane emissions",
      },
      {
        id: "recycledWaste",
        label: "Kilograms of recycled waste per week",
        factor: 0.5,
        source: "Recycling impact study",
      },
      {
        id: "composting",
        label: "Kilograms of composted organic waste per week",
        factor: 0.7,
        source: "EPA composting study",
      },
    ],
  },
  {
    id: "waterUsage",
    title: "Water Usage",
    icon: Droplet,
    info: "Energy required for water extraction, treatment, and heating",
    questions: [
      {
        id: "showerTime",
        label: "Minutes spent in shower per day",
        factor: 0.01,
        source: "EPA water heating data",
      },
      {
        id: "laundryLoads",
        label: "Laundry loads per week",
        factor: 1.2,
        source: "Energy efficiency reports",
      },
      {
        id: "dishwashing",
        label: "Dishwasher loads per week",
        factor: 0.9,
        source: "Energy Star reports",
      },
    ],
  },
  {
    id: "socialActivities",
    title: "Social Activities",
    icon: Users,
    info: "Carbon footprint from recreational and entertainment activities",
    questions: [
      {
        id: "streamingHours",
        label: "Hours of streaming content per week",
        factor: 0.05,
        source: "Digital energy consumption study",
      },
      {
        id: "restaurantVisits",
        label: "Restaurant meals per month",
        factor: 10,
        source: "Food service emissions data",
      },
      {
        id: "concertsEvents",
        label: "Live event attendances per year",
        factor: 20,
        source: "Event industry emissions report",
      },
    ],
  },
  {
    id: "shopping",
    title: "Shopping & Online Purchases",
    icon: ShoppingBag,
    info: "Emissions related to purchasing and shipping of products",
    questions: [
      {
        id: "onlineOrders",
        label: "Online purchases per month",
        factor: 5,
        source: "Logistics carbon emissions study",
      },
      {
        id: "inStorePurchases",
        label: "In-store purchases per month",
        factor: 3,
        source: "Retail energy report",
      },
      {
        id: "packagingWaste",
        label: "Kilograms of packaging waste per month",
        factor: 2.3,
        source: "EPA packaging waste report",
      },
    ],
  },
  {
    id: "buildingMaintenance",
    title: "Building & Home Maintenance",
    icon: Building,
    info: "Energy use from home improvements and ongoing maintenance",
    questions: [
      {
        id: "renovationProjects",
        label: "Home renovation projects per year",
        factor: 500,
        source: "Construction carbon study",
      },
      {
        id: "applianceReplacements",
        label: "New appliances purchased per year",
        factor: 150,
        source: "Appliance manufacturing emissions",
      },
      {
        id: "energyEfficiency",
        label: "Energy-efficient upgrades per year",
        factor: -100,
        source: "Energy conservation data",
      },
    ],
  },
];

export default categories;
