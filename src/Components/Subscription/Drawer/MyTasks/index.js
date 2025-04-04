import React, { Fragment, useEffect, useState } from "react";
import { Drawer, Radio, Select, } from "antd";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";
import moment from "moment";

// import messages from "./message";
import isEmpty from "../../../../Helper/is-empty";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function Index({onCloseDrawer, visible, myTaskData}) {
    const [values, setValues] = useState(false);
    const [myTask, setMyTask] = useState({});

    const onSubmit = () => {
        onCloseDrawer();
    };

    useEffect(() => {
        setMyTask(myTaskData);
    }, [myTaskData]);

    // formatMessage = (data) => this.props.intl.formatMessage(data);

    const onClose = () => {};

    const renderMyTasksForService = () => {
        console.log("myTask", myTask);

        let mysTaskArray = [];

        for (let task in myTask) {
            mysTaskArray.push(myTask[task]);
        }

        if (!isEmpty(mysTaskArray)) {
            return mysTaskArray.map((task, index) => {
                let time = "";
                if (!isEmpty(task.appointment_time)) {
                    time = ` ${moment(task.appointment_time).format("Do MMM")} (${moment(
                        task.appointment_time
                    ).format("LT")}) - `;
                } else {
                    time = "Unsheduled - ";
                }
                return (
                    <div key={index} className="wp100">
                        <h3 style={{fontWeight: "bold"}}>Once-Off Service</h3>
                        <div
                            className="p18 mb10"
                            style={{border: "1px solid lightgrey", height: "250px"}}
                        >
                            {" "}
                            <h3 style={{fontWeight: "bold"}}>
                                {task.details.service_offering_name}
                            </h3>
                            <h4>Sessions and Timings</h4>
                            <ul style={{listStyle: "auto"}}>
                                <li>
                                    <p>
                                        {/* 11th Feb (2:45pm) -{" "} */}
                                        {time}
                                        <span
                                            style={{
                                                color:
                                                    task.activity_status === "completed" ? "aqua" : "red",
                                            }}
                                        >
                      {task.activity_status === "notstarted"
                          ? "Not started"
                          : task.activity_status === "inprogress"
                              ? "In Progress"
                              : "Completd"}
                    </span>
                                    </p>
                                </li>
                                {/* <li>
              <p>
                12th Feb (2:45pm) - <span style={{ color: "aqua" }}>DONE</span>
              </p>
            </li> */}
                            </ul>
                        </div>
                    </div>
                );
            });
        } else {
            return "No tasks found";
        }
    };

    const renderSubscriptionSessions = (taskData) => {
        let mysTaskArray = [];

        for (let task in myTask) {
            mysTaskArray.push(myTask[task]);
        }

        let filteredTasks =
            !isEmpty(mysTaskArray) &&
            mysTaskArray.filter((task) => task.details.id === taskData.details.id);

        if (!isEmpty(filteredTasks)) {
            return filteredTasks.map((data, index) => {
                let time = "";
                if (!isEmpty(data.appointment_time)) {
                    time = ` ${moment(data.appointment_time).format("Do MMM")} (${moment(
                        data.appointment_time
                    ).format("LT")}) -`;
                } else {
                    time = "Unsheduled -";
                }
                return (
                    <li key={index}>
                        <p>
                            {time}
                            <span
                                style={{
                                    color: data.activity_status === "completed" ? "aqua" : "red",
                                }}
                            >
                {" "}
                                {data.activity_status === "notstarted"
                                    ? "Not started"
                                    : data.activity_status === "inprogress"
                                        ? "In Progress"
                                        : "Completd"}
              </span>
                        </p>
                    </li>
                );
            });
        }
    };

    const renderMyTasksForSubscription = () => {
        let myTaskArray = [];
        let subscriptionName = "";

        //Making array from objects
        for (let task in myTask) {
            myTaskArray.push(myTask[task]);
            subscriptionName = myTask[task].serviceSubscriptionDetails.notes;
        }

        console.log("myTask", myTaskArray);

        //getting common task id from all tasks

        const idArr = myTaskArray.map((obj) => obj.details.id); // Extract the id values
        console.log("idArr", idArr);

        // finding unique ids from that

        let uniqueIdArr = [...new Set(idArr)];

        console.log("uniqueIdArr", uniqueIdArr);

        let finalTasks = [];
        uniqueIdArr.forEach((ele) => {
            let filteredElement = myTaskArray.filter((el) => el.details.id === ele);
            finalTasks.push(filteredElement[0]);
        });

        console.log("finalTasks", finalTasks);

        return (
            <div className="wp100">
                <h3 style={{fontWeight: "bold"}}>
                    {subscriptionName} subscription plan
                </h3>
                {!isEmpty(finalTasks) &&
                    finalTasks.map((task, index) => {
                        return (
                            <div
                                key={index}
                                className="p18 mb10"
                                style={{border: "1px solid lightgrey", height: "250px"}}
                            >
                                {" "}
                                <h3 style={{fontWeight: "bold"}}>
                                    {task.details.service_offering_name}
                                </h3>
                                <h4>Sessions and Timings</h4>
                                <ul style={{listStyle: "auto"}}>
                                    {renderSubscriptionSessions(task)}
                                </ul>
                            </div>
                        );
                    })}
            </div>
        );
    };

    const {submitting} = values;

    let service_subscription_id = "";

    if (!isEmpty(myTask)) {
        for (let task in myTask) {
            service_subscription_id = myTask[task].service_subscription_id;
        }
    }

    return (
        <Fragment>
            <Drawer
                title={"My tasks"}
                placement="right"
                maskClosable={false}
                headerStyle={{
                    position: "sticky",
                    zIndex: "9999",
                    top: "0px",
                }}
                destroyOnClose={true}
                onClose={onCloseDrawer}
                visible={visible} // todo: change as per state, -- WIP --
                width={400}
            >
                {!isEmpty(service_subscription_id)
                    ? renderMyTasksForSubscription()
                    : renderMyTasksForService()}
                {/* <Footer
            onSubmit={this.onSubmit}
            onClose={this.onClose}
            // submitText={this.formatMessage(messages.submit)}
            submitText={"Submit"}
            submitButtonProps={{}}
            cancelComponent={null}
            submitting={submitting}
          /> */}
            </Drawer>
        </Fragment>
    );
}

export default Index;
