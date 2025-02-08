import React, { useState, useEffect } from "react";
import { FaTree, FaMobileAlt, FaCar, FaGasPump } from "react-icons/fa";

const iconMapping = {
  "Smartphones Charged": <FaMobileAlt className="text-blue-500 text-xl" />,
  "Distance Driven": <FaCar className="text-gray-500 text-xl" />,
  "Trees Needed (1 Year)": <FaTree className="text-green-500 text-xl" />,
  "Gallons of Gasoline": <FaGasPump className="text-yellow-500 text-xl" />,
};

const EquivalenciesTable = ({ clerkId }) => {
  const [equivalencies, setEquivalencies] = useState(null);

  const fetchEquivalencies = async () => {
    try {
      const fetchedData = await fetch("/api/fetch").then((res) => res.json());
      const userData = fetchedData.find((item) => item.clerkId === clerkId);

      if (userData && userData.equivalencies) {
        setEquivalencies(userData.equivalencies);
      } else {
        console.error("No data found for the given clerkId or equivalencies");
      }
    } catch (error) {
      console.error("Error fetching equivalencies data:", error);
    }
  };

  useEffect(() => {
    if (clerkId) fetchEquivalencies();
  }, [clerkId]);

  if (!equivalencies) {
    return (
      <p className="text-slate-500">
        No data found. Add data in "Calculator" to show it on "Dashboard".
      </p>
    ); // Show loading indicator while fetching data
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4 text-zinc-600">Equivalencies</h2>
      <table className="table-auto border-collapse border border-green-500 w-full text-zinc-700">
        <thead>
          <tr>
            <th className="border border-green-500 px-4 py-2">Icon</th>
            <th className="border border-green-500 px-4 py-2">Category</th>
            <th className="border border-green-500 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(equivalencies).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-green-500 px-4 py-2 text-center">
                {iconMapping[key] || <span className="text-gray-500">N/A</span>}
              </td>
              <td className="border border-green-500 px-4 py-2">{key}</td>
              <td className="border border-green-500 px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquivalenciesTable;
