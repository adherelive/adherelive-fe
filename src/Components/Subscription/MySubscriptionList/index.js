import React, { Fragment, useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector } from "react-redux";
import isEmpty from "../../../Helper/is-empty";

function MySubscriptionList() {
    const [subscriptionList, setSubscriptionList] = useState([]);
    const allSubscriptions = useSelector(
        (state) => state.subscription.subscriptions
    );

    useEffect(() => {
        if (!isEmpty(allSubscriptions)) {
            setSubscriptionList(allSubscriptions);
        } else {
            setSubscriptionList([]);
        }
    }, [allSubscriptions]);

    if (!isEmpty(subscriptionList)) {
        return (
            <Fragment>
                <h3 style={{color: "#1890ff"}} className="mb20 fs20">
                    {" "}
                    My Subscription Plans
                </h3>
                <div
                    style={{display: "flex", flexWrap: "wrap"}}
                    className="flex  wp100"
                >
                    {Object.keys(subscriptionList).map(function (key, index) {
                        return (
                            <SubscriptionCard key={index} data={subscriptionList[key]}/>
                        );
                    })}
                    {/* {!isEmpty(subscriptionList) &&
            subscriptionList.map((data, index) => {
              return <SubscriptionCard />;
            })} */}
                </div>
            </Fragment>
        );
    } else {
        return null;
    }
}

export default MySubscriptionList;
