import React from "react";
import styles from "./ListingPiChart.module.css";
import Chart from "react-apexcharts";

const ListingPiChart = ({ pending, approved, rejected }) => {
  console.log(pending, approved, rejected);
  const options = {
    options: {
      labels: ["Pending", "Approved", "Rejected"],
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: undefined,
          useSeriesColors: false,
        },
        markers: {
          fillColors: ["#fc7259", "#1db954", "#dc3545"],
        },
      },
      fill: {
        colors: ["#fc7259", "#1db954", "#dc3545"],
      },
      markers: {
        colors: ["#fc7259", "#1db954", "#dc3545"],
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
        width="400px"
      />
    </div>
  );
};

export default ListingPiChart;
