import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { postData, PostUserOrderData } from '@/redux/orderuserdetails/OrderUserDetailSlice';


const CardOrder = ({ setCurrent, current }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let nextStep = current + 1;
    if (values.paymentoption === 'cash') {
      nextStep = 2;
    } else if (values.paymentoption === 'online') {
      nextStep = 1;
    }
    dispatch(postData(values));
    form.resetFields();
    setCurrent(nextStep);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const paymentOptions = [
    { value: "online", label: "Online Payment" },
    { value: "cash", label: "Cash On Delivery" },
  ];

  const generateOrderId = () => {
    const number = Math.floor(Math.random() * 10000);
    const padded = number.toString().padStart(4, "0");
    return padded;
  };

  useEffect(() => {
    form.setFieldsValue({
      amount: cart.cartTotalAmount + cart.cartTaxAmount,
      orderid: generateOrderId()
    });
  }, [cart.cartTotalAmount, form]);

  return (
    <Form
      form={form}
      name="myForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ flex: '50%', padding: '10px' }}>
          <Form.Item
            label="Order ID"
            name="orderid"
          >
            <Input placeholder="Enter your orderid" />
          </Form.Item>

          <Form.Item
            label="Phone 1"
            name="phone1"
            rules={[{ required: true, message: 'Please input your phone number' }]}
          >
            <Input placeholder="Enter your phone Number" />
          </Form.Item>

          <Form.Item
            label="Gmail"
            name="gmail"
            rules={[{ required: true, message: 'Please input your Gmail!' }]}
          >
            <Input placeholder="Enter your Gmail" />
          </Form.Item>

          <Form.Item
            label="Total Amount"
            name="amount"
          >
            <Input suffix={<DollarOutlined />} disabled={true} placeholder="Enter Amount" />
          </Form.Item>
        </div>

        <div style={{ flex: '50%', padding: '10px' }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your Name' }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            label="Phone 2"
            name="phone2"
            rules={[{ required: true, message: 'Please input your phone number2!' }]}
          >
            <Input placeholder="Enter mobile number 2" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your Address!' }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>

          <Form.Item
            label="Payment Mode"
            name="paymentoption"
            rules={[{ required: true, message: "Please select Payment Mode" }]}
          >
            <Select defaultValue="Online Mode" options={paymentOptions} value={paymentOptions} />
          </Form.Item>
        </div>
      </div>

      <Form.Item >
        <Button type="primary" htmlType="submit" style={{ width: 200, marginLeft: '-100px' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>


  )
}

export default CardOrder; 