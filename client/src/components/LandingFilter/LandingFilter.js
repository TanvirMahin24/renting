import { RangeSlider, Select } from "@mantine/core";
import React from "react";
import { Button } from "react-bootstrap";
import styles from "./LandingFilter.module.css";

const LandingFilter = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <Select
          placeholder="House Type"
          data={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          style={{ label: { height: "90px" } }}
        />
        <div className={styles.range}>
          <span className="d-block text-center">Price Range</span>
          <RangeSlider
            mt="xl"
            mb="xl"
            color={"orange"}
            showLabelOnHover={false}
            showTooltip={false}
            step={25}
            label={(value) => (value === 0 ? `1K` : `${(value * 16) / 100}K`)}
            marks={[
              { value: 0, label: "1K" },
              { value: 25, label: "4K" },
              { value: 50, label: "8K" },
              { value: 75, label: "12K" },
              { value: 100, label: "16K" },
            ]}
          />
        </div>
        <Button className="btn_primary">FIND NOW</Button>
      </div>
    </div>
  );
};

export default LandingFilter;
