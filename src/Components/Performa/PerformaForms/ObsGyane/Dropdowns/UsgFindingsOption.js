import { Select, Space } from "antd";

const UsgFindingsOption = ({ addFields, setInputFields }) => {
  const handleChange = (value) => {
    addFields(value);
    console.log(`selected ${value}`);
  };

  return (
    <div className="labreport_options">
      <h2>Select Report</h2>
      <Select
        // defaultValue="lucy"
        style={{ width: 120, marginBottom: "10px", marginLeft: "20px" }}
        onChange={handleChange}
        options={[
          { value: "1st Trimester", label: "1st Trimester" },
          { value: "2nd Trimester", label: "2nd Trimester" },
          { value: "3rd Trimester", label: "3rd Trimester" },
        ]}
      />
    </div>
  );
};

export default UsgFindingsOption;
