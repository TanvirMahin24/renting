import { RangeSlider, Select, Switch } from "@mantine/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterListings } from "../../actions/Listing.action";
import districts from "../../constants/Districts";
import divisions from "../../constants/Divisions";
import styles from "./SearchFilter.module.css";

const SearchFilter = ({ categories, filterListings }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [district, setDistrict] = useState(undefined);
  const [division, setDivision] = useState(undefined);
  const [sublet, setSublet] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState([0, 100]);

  const handleSubmit = () => {
    filterListings(
      selectedPrice[0] * 300,
      selectedPrice[1] * 300,
      selectedCategory,
      district,
      division,
      sublet
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={`d-flex justify-content-center align-items-center flex-column ${styles.shadow}`}
        >
          <div className={styles.filter}>
            <Select
              placeholder="House Type"
              data={[
                { label: "All", value: "" },
                ...categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
              onChange={(e) => setSelectedCategory(e)}
              classNames={{
                input: `${styles.select} ${styles.input} bg-white form-control`,
                label: styles.label,
                selected: styles.selected,
                dropdown: styles.dropdown2,
              }}
              variant="filled"
              radius="xs"
              size="md"
              shadow={"lg"}
            />
            <div className={styles.range}>
              <span className="d-block text-center">Price Range</span>
              <RangeSlider
                mt="xl"
                mb="xl"
                color={"orange"}
                showLabelOnHover={false}
                showTooltip={false}
                step={10}
                label={(value) =>
                  value === 0 ? `1K` : `${(value * 30) / 100}K`
                }
                classNames={{
                  markLabel: styles.mark_label,
                }}
                marks={[
                  { value: 0, label: "1K" },
                  { value: 10, label: "3K" },
                  { value: 20, label: "6K" },
                  { value: 30, label: "9K" },
                  { value: 40, label: "12K" },
                  { value: 50, label: "15K" },
                  { value: 60, label: "18K" },
                  { value: 70, label: "21K" },
                  { value: 80, label: "24K" },
                  { value: 90, label: "27K" },
                  { value: 100, label: "30K" },
                ]}
                onChange={setSelectedPrice}
              />
            </div>
          </div>

          <div className={styles.filter}>
            <Select
              placeholder="District"
              data={[
                { label: "All", value: "" },
                ...districts.map((dis) => ({
                  value: dis.id,
                  label: `${dis.name} (${dis.bn_name})`,
                })),
              ]}
              searchable
              nothingFound="No district found"
              classNames={{
                input: `${styles.select} ${styles.input} form-control`,
                label: styles.label,
                selected: styles.selected,
                dropdown: styles.dropdown2,
              }}
              variant="filled"
              radius="xs"
              size="md"
              shadow={"lg"}
              defaultValue={district}
              onChange={(e) => {
                setDistrict(e);
              }}
              style={{ label: { height: "60px" } }}
            />
            <Select
              placeholder="Division"
              data={[
                { label: "All", value: "" },
                ...divisions.map((dis) => ({
                  value: dis.id,
                  label: `${dis.name} (${dis.bn_name})`,
                })),
              ]}
              searchable
              nothingFound="No division found"
              classNames={{
                input: `${styles.select} ${styles.input} form-control`,
                label: styles.label,
                selected: styles.selected,
                dropdown: styles.dropdown2,
              }}
              variant="filled"
              radius="xs"
              size="md"
              shadow={"lg"}
              defaultValue={division}
              onChange={(e) => {
                setDivision(e);
              }}
            />
            <div className="pb-md-0 pb-3">
              <Switch
                checked={sublet}
                label="Sublet"
                onChange={(event) => setSublet(event.currentTarget.checked)}
              />
            </div>
            <div className="text-center">
              <Button className="btn_primary" onClick={() => handleSubmit()}>
                FIND NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { filterListings })(SearchFilter);
