import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
//import PatientDetails from "../../Containers/Patient/details";

// const PatientDetailsComp = (props) => {
//     const {match: {params: {patient_id} = {}} = {}} = props;
//     return <PatientDetails patient_id={patient_id}/>;
// };

export default class APIDocs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path={"/api-docs"}
                        />
                        {/*<Route exact path={PATH.PATIENT.PA} component={Patient} />*/}
                    </Switch>
                </Router>
            </Fragment>
        );
    }
}
