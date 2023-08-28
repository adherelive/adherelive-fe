import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setPerformaTabsId } from "../../../modules/performa";
import ObsGyane from "../PerformaTabs/ObsGyane/ObsGyane";

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
        <button onClick={handleBack}>Back to Treatment plan</button>
      )}

      <Tabs
        defaultActiveKey={defaultActiveKeyValue}
        onChange={setActiveKey}
        activeKey={performaTabId}
      >
        {performaTabs?.map((data) => {
          return (
            <TabPane tab={`${data.tabName}`} key={`${data.key}`}>
              <ObsGyane />
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
