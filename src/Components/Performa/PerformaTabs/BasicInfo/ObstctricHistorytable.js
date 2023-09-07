import React from "react";
import { Table, Input } from "antd";

const ObstctricHistorytable = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (_, record) => (
        <Input
          className={"ant-legacy-form-item-children"}
          // name={record.value}
          placeholder="eg. 1"
          // value={record.value} // Assuming 'column2' holds the input value
          onChange={(e) => handleInputChange(e, record.key)} // Provide a function to handle input changes
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "G",
      value: "Input Data 1-2",
    },
    {
      key: "2",
      title: "P",
      value: "Input Data 2-2",
    },
    {
      key: "3",
      title: "L",
      value: "Input Data 3-2",
    },
    {
      key: "4",
      title: "A",
      value: "Input Data 3-2",
    },
    {
      key: "5",
      title: "E",
      value: "Input Data 3-2",
    },
  ];

  const handleInputChange = (e, key) => {
    // Implement your logic to handle input changes and update the 'data' array
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, column2: e.target.value };
      }
      return item;
    });
    // Update the 'data' array with the new data
    // You can use state management tools like useState to manage the 'data' array
    // Example: setData(newData);
  };

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default ObstctricHistorytable;
