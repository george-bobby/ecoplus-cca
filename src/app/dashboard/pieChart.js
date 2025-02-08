import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ clerkId }) => {
  const [chartData, setChartData] = useState(null);

  // Fetch the data from the API
  const fetchData = async () => {
    try {
      // console.log("FETCHING DATA");
      const fetchedData = await fetch("/api/fetch").then((res) => res.json());
      // console.log("FETCHED DATA", fetchedData);

      // Find the data for the given clerkId
      const userData = fetchedData.find((item) => item.clerkId === clerkId);
      if (userData) {
        const { categories } = userData;

        // Prepare data for the chart
        const labels = Object.keys(categories);
        const dataValues = Object.values(categories);

        const data = {
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(100, 100, 255, 0.6)",
                "rgba(200, 100, 100, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(100, 100, 255, 1)",
                "rgba(200, 100, 100, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [clerkId]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Pie Chart of Environmental Impact",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", height: "500px" }}>
      {chartData ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p className="text-slate-500">
          No data found. Add data in "Calculator" to show it on "Dashboard".
        </p>
      )}
      {/* {console.log(clerkId)} */}
    </div>
  );
};

export default PieChart;
