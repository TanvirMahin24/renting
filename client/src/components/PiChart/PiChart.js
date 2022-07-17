import React from "react";
import styles from "./PiChart.module.css";
import Chart from "react-apexcharts";

const PiChart = ({ pending, approved, rejected }) => {
  console.log(pending, approved, rejected);
  const options = {
    options: {
      labels: ["Pending", "Approved", "Rejected"],
    },
    series: [pending, approved, rejected],
  };

  return (
    <div>
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
