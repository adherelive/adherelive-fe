import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setPerformaTabsId } from "../../../modules/performa";
import ObsGyane from "../PerformaTabs/ObsGyane/ObsGyane";
import BasicInfo from "../PerformaTabs/BasicInfo/BasicInfo";
import MentalHealth from "../PerformaTabs/MentalHealth/MentalHealth";

const { TabPane } = Tabs;

const defaultActiveKeyValue = 0;

function PerformaTabs() {
  const dispatch = useDispatch();
  const [activeKey, setActiveKeyValue] = useState(0);

  const { performaTabs, performaTabId } = useSelector(
    (state) => state.performa
  );

  const setActiveKey = (value) => {
    setActiveKeyValue(value);
    dispatch(setPerformaTabsId(value));
  };

  const handleBack = () => {
    dispatch(setPerformaTabsId(0));
  };

  return (
    <div className="performa_tabs_container">
      {performaTabId !== 0 && (
        <p onClick={handleBack} className="translate-text pointer mr10">
          Back to Treatment plan
        </p>
      )}

      <Tabs
        defaultActiveKey={defaultActiveKeyValue}
        onChange={setActiveKey}
        activeKey={performaTabId}
      >
        {performaTabs?.map((data) => {
          return (
            <TabPane tab={`${data.tabName}`} key={`${data.key}`}>
              {data.tabName === "Basic Profile" ? (
                <BasicInfo />
              ) : data.tabName === "Obs gyne" ? (
                <ObsGyane />
              ) : data.tabName === "Mental Health" ? (
                <MentalHealth />
              ) : (
                ""
              )}
            </TabPane>
          );
        })}

        {/* <TabPane tab="Mental Health" key="2">
          hello
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default PerformaTabs;
