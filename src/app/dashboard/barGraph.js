import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ clerkId }) => {
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetch");
      const fetchedData = await response.json();

      // Find the data for the given clerkId
      const userData = fetchedData.find((item) => item.clerkId === clerkId);

      if (userData) {
        setDataArray(Object.values(userData.monthlyData)); // Get monthly data values
        setLoading(false);
      } else {
        console.error("No data found for the given clerkId");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clerkId) {
      fetchData();
    }
  }, [clerkId]);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Carbon Footprint",
        data: dataArray,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <p className="text-slate-500">
        No data found. Add data in "Calculator" to show it on "Dashboard".
      </p>
    );
  }

  return (
    <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Carbon Footprint by Month",
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarGraph;
