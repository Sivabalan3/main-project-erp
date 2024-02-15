import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import CardOrder from './CardOrder';
import DownloadReceipt from './DownloadReceipt';
import { printAndDownload } from './DownloadReceipt';

const steps = [
  {
    title: 'Shipping Address',
    content: <CardOrder />
  },
  {
    title: 'Payment',
    content: "payment",
  },
  {
    title: 'Download Receipt',
    content: <DownloadReceipt />,
  },
];
const CardConfirmSteps = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    // lineHeight: '60px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    height: "40vh",
    overflow: 'scroll'

  };
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Confirm Order</h3>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 14,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={printAndDownload}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default CardConfirmSteps;