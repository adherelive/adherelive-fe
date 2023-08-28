import { Select, Space } from "antd";

const LabReportsOptions = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      Select Report
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "Hb", label: "Hb" },
          { value: "TLC", label: "TLC" },
          { value: "DLC", label: "DLC" },
        ]}
      />
    </div>
  );
};

export default LabReportsOptions;
