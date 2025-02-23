import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined  } from '@ant-design/icons';
import { generatePrescriptionUrl } from '../../../Helper/urls/patients';


const GeneratePrescriptionButton = ({selectedCarePlanId}) => {
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      // Handle generate in Hindi
      window.open(`${generatePrescriptionUrl(selectedCarePlanId)}/hi`, '_blank');
    } else if (e.key === '2') {
      // Handle generate in English
      window.open(`${generatePrescriptionUrl(selectedCarePlanId)}/en`, '_blank');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Generate in Hindi</Menu.Item>
      <Menu.Item key="2">Generate in English</Menu.Item>
    </Menu>
  );

  return (
    <Button
      type="ghost"
      className="flex align-center justify-space-evenly"
    >
      <span className="fs14">
            Prescription
      </span>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type="link"
          icon={<DownOutlined />}
          className="ml14"
        >
          {/* You can add any label you want for dropdown trigger */}
        </Button>
      </Dropdown>
    </Button>
  );
};

export default GeneratePrescriptionButton;
