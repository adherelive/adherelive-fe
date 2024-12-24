import React, {useState} from "react";
import SelectObsGyaneForm from "./SelectObsGyaneForm";
import isEmpty from "../../../../Helper/is-empty";
import LabReports from "../../PerformaForms/ObsGyane/LabReports";
import UsgFindings from "../../PerformaForms/ObsGyane/UsgFindings";
import ClinicalNotes from "../../PerformaForms/ObsGyane/ClinicalNotes";
import ObstctricHistorySection from "../BasicInfo/ObstctricHistorySection";

function ObsGyane() {
    const [finalSelectedForms, setSelectedForms] = useState([]);

    const handleFormChanges = (value) => {
        console.log(`selected ${value}`);
    };

    const handleFormSelect = (value) => {
        console.log(`selected ${value}`);
        if (!isEmpty(value)) {
            let data = [...finalSelectedForms];
            let formObject = {
                formName: value,
            };
            data.push(formObject);
            setSelectedForms(data);
        }
    };

    const hendleFormDeselect = (value) => {
        console.log(`deselected ${value}`);
        let data = [...finalSelectedForms];
        var filteredArray = data.filter((ele) => ele.formName !== value);

        setSelectedForms(filteredArray);
    };

    console.log("finalSelectedForms", finalSelectedForms);

    return (
        <div>
            <SelectObsGyaneForm
                handleFormChanges={handleFormChanges}
                handleFormSelect={handleFormSelect}
                hendleFormDeselect={hendleFormDeselect}
            />
            {finalSelectedForms.map((form, index) => {
                if (form.formName === "Lab Reports") {
                    return <LabReports key={index}/>;
                } else if (form.formName === "USG findings") {
                    return <UsgFindings key={index}/>;
                } else if (form.formName === "Clinical Notes") {
                    return <ClinicalNotes key={index}/>;
                } else if (form.formName === "Antenatal Card") {
                    return <ObstctricHistorySection key={index}/>;
                }
            })}
        </div>
    );
}

export default ObsGyane;
