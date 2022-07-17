import React from "react";
//import styles from "./lineChart.module.css";
import Chart from "react-apexcharts";
import moment from "moment";

const LineChart = ({ data }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = {
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5,
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#fc7259",
        shadeTo: "dark",
        shadeIntensity: 0.65,
      },
    },
  };

  let monthArrayCurrentProjects = [];
  let collectionsDataCurrentProjects = [];
  let totalRunningOrders = 0;
  if (data !== null && data.length > 0) {
    data.forEach((element) => {
      let month = `${moment(element.createdAt).format("MMMM")} ${moment(
        element.createdAt
      ).format("YYYY")}`;
      if (!monthArrayCurrentProjects.includes(month)) {
        monthArrayCurrentProjects.push(month);
        collectionsDataCurrentProjects.push(0);
      }
      collectionsDataCurrentProjects[monthArrayCurrentProjects.indexOf(month)] =
        collectionsDataCurrentProjects[
          monthArrayCurrentProjects.indexOf(month)
        ] + 1;
      totalRunningOrders = totalRunningOrders + 1;
    });
  }

  return (
    <div>
      <Chart
        options={{
          chart: {
            id: "running-order-sell",
          },
          xaxis: {
            categories: monthArrayCurrentProjects,
          },
          ...options,
        }}
        series={[
          {
            name: "Booking Request",
            data: collectionsDataCurrentProjects,
          },
        ]}
        type="line"
      />
    </div>
  );
};

export default LineChart;
