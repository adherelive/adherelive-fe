import React from "react";
import { Select } from "antd";
// import { diagnosisList } from "./diagnosisList.json";
import { useSelector } from "react-redux";
import isEmpty from "../../../Helper/is-empty";

const { Option } = Select;

function CustomDiagnosisEdit({
  diagnosis,
  handleDiagnosisChanges,
  onDiagnosisSearchHanlder,
}) {
  const { diagnosisList = [] } = useSelector((state) => state.cdss);

  const children = [];

  for (let each in diagnosisList) {
    children.push(
      <Option key={diagnosisList[each]}>{diagnosisList[each]}</Option>
    );
  }

  let finalDaignosis = diagnosis.split(",");
  console.log(finalDaignosis.length);
  if (finalDaignosis.length > 1) {
    finalDaignosis = diagnosis.split(",");
  } else {
    if (diagnosis.length > 0) {
      finalDaignosis = diagnosis;
    } else {
      finalDaignosis = [];
    }
  }

  return (
    <div className="mt10 mb10 cdss-select">
      <Select
        mode="tags"
        style={{ width: "100%" }}
        onChange={handleDiagnosisChanges}
        tokenSeparators={[","]}
        placeholder="Search for diagnosis"
        onSearch={onDiagnosisSearchHanlder}
        value={finalDaignosis}
      >
        {children}
      </Select>
    </div>
  );
}

export default CustomDiagnosisEdit;
