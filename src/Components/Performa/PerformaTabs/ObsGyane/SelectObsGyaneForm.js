import React from "react";
import { Select } from "antd";
// import symptoms from "./symptomList.json";

const formOptions = [
  {
    id: 1,
    name: "Lab Reports",
  },
  {
    id: 2,
    name: "USG findings",
  },
  {
    id: 3,
    name: "Clinical Notes",
  },
  {
    id: 4,
    name: "Antenatal Card",
  },
];

const { Option } = Select;

const children = [];

for (let each in formOptions) {
  children.push(
    <Option key={formOptions[each].name}>{formOptions[each].name}</Option>
  );
}

function SelectObsGyaneForm({
  handleFormChanges,
  handleFormSelect,
  hendleFormDeselect,
}) {
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // const handleSelect = (value) => {
  //   console.log(`selected ${value}`);
  // };
  return (
    <div className="mt10 mb10  cdss-select">
      <Select
        mode="tags"
        style={{ width: "100%" }}
        onChange={handleFormChanges}
        tokenSeparators={[","]}
        placeholder="Search for symptoms"
        onSelect={handleFormSelect}
        onDeselect={hendleFormDeselect}
      >
        {children}
      </Select>
    </div>
  );
}

export default SelectObsGyaneForm;
