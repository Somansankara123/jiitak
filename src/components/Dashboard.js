import React from "react";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { arr1 } from "../utils.js/constant";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const Dashboard = () => {
  const barChartData = {
    labels: ["10代", "20代", "30代", "40代", "50代", "60代", "70代", "90代以上"],
    datasets: [
      {
        label: "性別・年代比",
        data: [400, 800, 900, 1000, 600, 300, 100, 50],
        backgroundColor: "#FFB74D",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "性別・年代比",
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-row h-screen">
      
      <div className="w-10 h-5 sm:w-52 bg-white shadow-md">
        <Sidebar />
      </div>

      
      <div className="flex-1 bg-gray-100 ml-2 sm:p-6 overflow-y-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {arr1.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="bg-white pl-2 pt-4 p-5 text-black shadow-md rounded-md"
            >
              <h3 className="text-sm sm:text-lg font-medium">{item.l1}</h3>
              <p className="text-sm mt-1">{item.l2||<br></br>}</p>
              <p className="text-lg sm:text-2xl font-semibold mt-2 pt-2">{item.l4}</p>
              <div className="flex justify-between  mb-4 py-4">
                <p className="text-sm mt-1">{item.l3}</p>
                <p
                  className={`text-sm mt-1 font-medium ${item.change.includes("-") ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}
                >
                  {item.change}
                </p>
              </div>
            </div>
          ))}

          
          <div className="bg-white p-6   text-white col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Bar data={barChartData} options={barChartOptions} className="" />
          </div>

          {arr1.slice(4).map((item, index) => (
            <div
            key={index}
            className="bg-white pl-2 pt-4  text-black shadow-md rounded-md "
          >
            <h3 className="text-sm sm:text-lg font-medium">{item.l1}</h3>
            <p className="text-sm mt-1">{item.l2||<br></br>}</p>
            <p className="text-lg sm:text-2xl font-semibold mt-2 pt-2">{item.l4}</p>
            <div className="flex justify-between mt-2   mb-4">
              <p className="text-sm mt-1 ">{item.l3}</p>
              <p
                className={`text-sm mt-1 font-medium   ${item.change.includes("-") ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}
              >
                {item.change}
              </p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
