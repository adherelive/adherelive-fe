import React, { Fragment } from "react";
import DeactivateSubscriptionWarn from "../Modal/DeactivateSubscriptionWarn";
import isEmpty from "../../../Helper/is-empty";

function SubscriptionCard({ data }) {
  return (
    <Fragment>
      <div
        style={{
          border: "1px solid darkgray",
          // marginRight: "30px",
          height: "300px",
          marginBottom: "20px",
          backgroundColor: "#f0f0f0",
        }}
        className="wp30 p20 mr28"
      >
        <div className="flex wp100">
          <div className="wp50">
            {" "}
            <div style={{ border: "1px solid darkgray" }} className="wp70 p10">
              <span>{data.notes}</span>
            </div>
          </div>
          <div className="wp50">
            <p>{data.description}</p>
          </div>
        </div>
        <div className="service-section mb10 mt20">
          {!isEmpty(data.services) &&
            Object.keys(data.services).map(function (key, index) {
              return (
                <div
                  key={data.services[key].id}
                  style={{ border: "1px solid darkgray" }}
                  className="p10 wp70 mb10"
                >
                  {`${data.services[key].service_frequency} * ${data.services[key].serviceDetails.service_offering_name}`}
                </div>
              );
            })}
        </div>
        <div style={{ display: "flex" }} className="fees-section">
          <div
            style={{ border: "1px solid darkgray" }}
            className="p10 wp30 mb10"
          >
            Rs. {data.service_charge_per_month}
          </div>
          <DeactivateSubscriptionWarn data={data} />
        </div>
      </div>
    </Fragment>
  );
}

export default SubscriptionCard;
