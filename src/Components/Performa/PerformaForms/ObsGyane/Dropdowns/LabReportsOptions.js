import { Select } from "antd";

const LabReportsOptions = ({addFields, setInputFields}) => {
    const handleChange = (value) => {
        addFields(value);
        console.log(`selected ${value}`);
    };

    return (
        <div className="labreport_options">
            <h2>Select Report</h2>
            <Select
                // defaultValue="lucy"
                style={{width: 120, marginBottom: "10px", marginLeft: "20px"}}
                onChange={handleChange}
                options={[
                    {value: "Hb", label: "Hb"},
                    {value: "TLC", label: "TLC"},
                    {value: "DLC", label: "DLC"},
                    {value: "LFT", label: "LFT"},
                ]}
            />
        </div>
    );
};

export default LabReportsOptions;
