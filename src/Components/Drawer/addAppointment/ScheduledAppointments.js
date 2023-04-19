import React, { useState, Fragment, useEffect } from "react";
import { injectIntl } from "react-intl";
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
} from "antd";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";

import moment from "moment";

// import messages from "./message";
import Footer from "../../Drawer/footer";
import Form from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "../../../Helper/is-empty";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  DayView,
  Appointments,
  //   AppointmentTooltip,
  AppointmentForm,
  //
  //   WeekView,
  //   MonthView,
  //   ViewSwitcher,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Item: FormItem } = Form;

const appointments = [
  { title: "Medical test", startDate: "2023-04-23T10:00" },
  {
    title: "Blood Test",
    startDate: "2023-04-23T10:30",
    endDate: "2023-04-23T11:30",
  },
  { title: "Consultation", startDate: "2023-04-23T12:35" },
];

function Index({
  visible,
  onCloseDrawer,
  scheduleDate,
  setTimeHandlerOnClick,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentData, setAppointmentData] = useState([
    { title: "Medical test", startDate: "2023-04-23T10:00" },
    {
      title: "Blood Test",
      startDate: "2023-04-23T10:30",
      endDate: "2023-04-23T11:30",
    },
  ]);
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

  const { submitting } = values;

  const currentDateChange = (currentData) => {
    // console.log("currentData", currentData);
    setCurrentDate(new Date(currentData));
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
          <Paper>
            <Scheduler data={appointmentData}>
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={currentDateChange}
              />
              <DayView startDayHour={7.5} endDayHour={22.5} />
              {/* <WeekView startDayHour={7.5} endDayHour={22.5} />
              <MonthView /> */}
              <Appointments />
              <AppointmentForm
                visible={false}
                onAppointmentDataChange={onCellClick}
              />
              <Toolbar />
              {/* <ViewSwitcher /> */}
              <DateNavigator />
              <TodayButton />
            </Scheduler>
          </Paper>
        </div>
        <div className="add-patient-footer">
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
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
