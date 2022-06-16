import { RangeSlider, Select } from "@mantine/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./LandingFilter.module.css";

const LandingFilter = ({ categories }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 100]);

  const handleSubmit = () => {
    navigate(`/search?category=${selectedCategory}&price=${selectedPrice}`);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <Select
            placeholder="House Type"
            data={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            onChange={(e) => setSelectedCategory(e)}
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
              step={20}
              label={(value) => (value === 0 ? `1K` : `${(value * 25) / 100}K`)}
              marks={[
                { value: 0, label: "1K" },
                { value: 20, label: "5K" },
                { value: 40, label: "10K" },
                { value: 60, label: "15K" },
                { value: 80, label: "20K" },
                { value: 100, label: "25K" },
              ]}
              onChange={setSelectedPrice}
            />
          </div>
          <Button className="btn_primary" onClick={() => handleSubmit()}>
            FIND NOW
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingFilter;
