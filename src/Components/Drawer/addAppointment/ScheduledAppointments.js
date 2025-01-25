import React, {Fragment, useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {
    Drawer,
    Icon,
    Select,
    Input,
    message,
    Button,
    Spin,
    Radio,
    DatePicker,
    Space,
} from "antd";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";
import moment from "moment";

// import messages from "./message";
import Footer from "../../Drawer/footer";
import Form from "antd/es/form";
import {useDispatch, useSelector} from "react-redux";
import isEmpty from "../../../Helper/is-empty";
import Paper from "@mui/material/Paper";
import {
    AppointmentForm,
    Appointments,
    //   AppointmentTooltip,
    //   WeekView,
    //   MonthView,
    //   ViewSwitcher,
    DateNavigator,
    DayView,
    Scheduler,
    TodayButton,
    Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import {ViewState} from "@devexpress/dx-react-scheduler";
import {getAppointmentsDataForDay} from "../../../modules/appointments/index";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Item: FormItem} = Form;

const appointments = [
    {
        title: "Medical test",
        startDate: new Date("2023-05-24T11:40:29.000Z"),
        endDate: new Date("2023-05-24T12:10:29.000Z"),
    },
    {
        title: "Blood Test",
        startDate: "2023-05-23T10:30",
        endDate: "2023-05-23T11:30",
    },
];

function Index({
                   visible,
                   onCloseDrawer,
                   scheduleDate,
                   setTimeHandlerOnClick,
                   loading,
                   loadingHandler,
               }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointmentData, setAppointmentData] = useState([]);
    const allAppointments = useSelector(
        (state) => state.subscription.appointmentsForDay
    );
    //   const currentDate = "2019-06-23";

    useEffect(() => {
        let newData = [...appointmentData];
        // newData.push({ title: "Consultation", startDate: "2023-04-23T12:35" });
        // setAppointmentData(newData);

        // console.log(moment(scheduleDate).format("YYYY-MM-DD"));
        // let date = moment(scheduleDate).format("YYYY-MM-DD");
        // console.log("date", `${date}`);
        if (!isEmpty(scheduleDate)) {
            setCurrentDate(new Date(scheduleDate));
        }
    }, [scheduleDate]);

    useEffect(() => {
        // alert("asdsd");
        if (!isEmpty(allAppointments)) {
            console.log("allAppointments", allAppointments);
            let newArray = [];

            for (const key in allAppointments) {
                if (allAppointments.hasOwnProperty(key)) {
                    // console.log(`${key}: ${allAppointments[key]}`);

                    let obj = {
                        title: allAppointments[key].basic_info.details.type_description,
                        startDate: new Date(allAppointments[key].basic_info.start_time),
                        endDate: new Date(allAppointments[key].basic_info.end_time),
                    };
                    newArray.push(obj);
                }
            }

            setAppointmentData(newArray);
        }
    }, [allAppointments]);

    const onCellClick = (data) => {
        setTimeHandlerOnClick(data);
        // console.log(data);
        // this.setState({
        //   bookCalenderModel: true,
        //   bookOnCellClickData: data,
        // });
    };

    const dispatch = useDispatch();
    const [values, setValues] = useState({
        submitting: false,
    });

    const onSubmit = () => {
        alert("asdsd");
    };

    // formatMessage = (data) => this.props.intl.formatMessage(data);

    const onClose = () => {};

    const {submitting} = values;

    const currentDateChange = (currentData) => {
        // console.log("currentData", currentData);
        loadingHandler(true);
        let formatDate = moment(currentData).format("DD-MM-YYYY");
        const response = dispatch(getAppointmentsDataForDay(formatDate));
        setCurrentDate(new Date(currentData));
        if (response) {
            loadingHandler(false);
        }
    };

    return (
        <Fragment>
            <Drawer
                title={"Scheduled Appointments"}
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
                width={700}
            >
                <div className="App">
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Spin tip="Fetching Appointments..." spinning={loading}>
                            <Paper>
                                <Scheduler data={appointmentData}>
                                    <ViewState
                                        currentDate={currentDate}
                                        onCurrentDateChange={currentDateChange}
                                    />
                                    <DayView startDayHour={7.5} endDayHour={22.5}/>
                                    {/* <WeekView startDayHour={7.5} endDayHour={22.5} />
                                    <MonthView /> */}
                                    <Appointments/>
                                    <AppointmentForm
                                        visible={false}
                                        onAppointmentDataChange={onCellClick}
                                    />
                                    <Toolbar/>
                                    {/* <ViewSwitcher /> */}
                                    <DateNavigator/>
                                    <TodayButton/>
                                </Scheduler>
                            </Paper>
                        </Spin>
                    </Space>
                </div>
                <div className="add-patient-footer">
                    <Button onClick={onCloseDrawer} style={{marginRight: 8}}>
                        {/* {this.formatMessage(messages.cancel)} */}
                        Cancel
                    </Button>
                    <Button
                        // onClick={onSubmit}
                        onClick={onCloseDrawer}
                        type="primary"
                        // icon={submitting ? <PoweroffOutlined /> : null}
                        loading={submitting}
                    >
                        {/* {this.formatMessage(messages.submit)} */}
                        Submit
                    </Button>
                </div>
            </Drawer>
        </Fragment>
    );
}

export default Index;
