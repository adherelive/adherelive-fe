import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default (props) => {
  const { color = null } = props;
  return <Spin {...props} indicator={antIcon} style={{ color }} />;
};
