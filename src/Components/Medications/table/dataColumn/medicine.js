import React from "react";
import TabletIcon from "../../../../Assets/images/tabletIcon3x.png";
import InjectionIcon from "../../../../Assets/images/injectionIcon3x.png";
import SyrupIcon from "../../../../Assets/images/pharmacy.png";
import {SYRUP, TABLET} from "../../../../constant";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
    const {medicationTemplateData, medicationData, medicinesNames} =
    props || {};

    const {basic_info: {name} = {}} = medicationTemplateData || {};
    const {
        basic_info: {
            details: {medicine_type = "1", medicine_id = ""} = {},
        } = {},
    } = medicationData || {};

    console.log("medicinesNames", props);

    let finalName = name;
    if (isEmpty(medicationTemplateData)) {
        let filterMedicineName = medicinesNames.filter(
            (ele) => ele.id === medicine_id
        );
        if (!isEmpty(filterMedicineName)) {
            finalName = filterMedicineName[0].name;
        }
    }

    console.log("finalNamefinalName", finalName);

    return (
        <div className="flex direction-row justify-space-around align-center">
            <img
                className="w20 mr10"
                src={
                    medicine_type === TABLET
                        ? TabletIcon
                        : medicine_type === SYRUP
                            ? SyrupIcon
                            : InjectionIcon
                }
                alt="medicine icon"
            />
            <p className="mb0">{finalName ? `${finalName}` : "--"}</p>
        </div>
    );
};
