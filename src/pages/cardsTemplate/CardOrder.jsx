import React, { useState, useEffect } from 'react';
import {  Form, Input, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const CardOrder = () => {
  const cart = useSelector((state) => state.cart);
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    form.setFieldsValue({
      amount: cart.cartTotalAmount + cart.cartTaxAmount, // Update the 'amount' field value
    });
  }, [cart.cartTotalAmount, form]);
  const { TextArea } = Input;

  return (
    <Form
      form={form}
      name="myForm"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        Width: 850, height: "45vh", marginTop: "40px",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div style={{ display: "flex", flexDirection:"row",marginBottom: "20px" }}>
        <Form.Item
          style={{ width: "50%" }}
          label="Name"
          name="username"
          rules={[{required: true,message: 'Please input your name!', },]}>
          <Input />
        </Form.Item>
        <Form.Item
          style={{ width: "50%" }}
          label="Phone 1"
          name="phone1"
          rules={[{required: true,message: 'Please enter Phone nuber1',},]}><Input /></Form.Item></div>
      <div style={{ display: "flex", flexDirection:"row",marginBottom: "20px" }}>
        <Form.Item
          style={{ width: "50%" }}
          label="Phone 2"
          name="phone2"
          rules={[{required: true,message: 'Please enter Phone number2',},]} >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ width: "50%" }}
          label="Gmail"
          name="email"
          rules={[{required: true,message: 'Please enter Gmail',},]}>
          <Input />
        </Form.Item>
      </div>
      <div style={{ display: "flex", flexDirection:"row", }}>
        <Form.Item label="Address" style={{ width: "50%" }}>
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          style={{ width: "50%" }}
          label="Total Amount"
          name="amount">
          <Input suffix={<DollarOutlined />} disabled={true} />
        </Form.Item>
      </div>
      <div style={{ display: "flex", }}> 
      <Form.Item
       label="Payment Mode"
       style={{ width: "50%" }}>
      <Select
      defaultValue="Online Mode"
      style={{
        width: 220,
      }}
      options={[{value: 'Online Payment',label: 'Online Payment',},{
          value: 'Cash On Delivery',
          label: 'Cash On Delivery', }]} />
      </Form.Item>
      </div>
    </Form>
  )
}

export default CardOrder; 