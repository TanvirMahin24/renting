import React from "react";
import styles from "./PiChart.module.css";
import Chart from "react-apexcharts";

const PiChart = ({ pending, approved, rejected }) => {
  console.log(pending, approved, rejected);
  const options = {
    options: {
      labels: ["Pending", "Approved", "Rejected"],
      legend: {
        position: "bottom",
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 1,
      },
    },

    series: [pending, approved, rejected],
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <Chart
        options={options.options}
        series={options.series}
        type="donut"
        width="380"
      />
    </div>
  );
};

export default PiChart;
