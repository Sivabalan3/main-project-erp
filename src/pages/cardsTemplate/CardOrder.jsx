import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { postData,PostUserOrderData } from '@/redux/orderuserdetails/OrderUserDetailSlice';

const CardOrder = () => {
  
  const cart = useSelector((state) => state.cart);
  const dispatch=useDispatch()

  const onFinish = (values) => {
    // Dispatch the postData action with the form values
    dispatch(postData(values));
    // Reset the form fields
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const paymentOptions = [
    { value: "online", label: "Online Payment" },
    { value: "cash", label: "Cash On Delivery" },
    { value: "card", label: "Card Payment" },
  ];
  const [form] = Form.useForm(); // Create a form instance

 
  const { TextArea } = Input;
  const generateOrderId = () => {
    // Generate a random number between 0 and 9999
    const number = Math.floor(Math.random() * 10000);
    // Pad the number with zeros to make it 4 digits long
    const padded = number.toString().padStart(4, "0");
    // Return the padded number as the order id
    return padded;
  };
  useEffect(() => {
    form.setFieldsValue({
      amount: cart.cartTotalAmount + cart.cartTaxAmount, // Update the 'amount' field value
      orderid:generateOrderId()
    });
  }, [cart.cartTotalAmount, form]);
  return (
    <Form
    
      form={form}
      name="myForm"
      // initialValues={{ name: "admin" }}
      labelCol={{span: 8, }}
      wrapperCol={{span: 16,}}style={{Width: 850, height: "45vh", marginTop: "40px",}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
      <Form.Item
          style={{ width: "50%" }}
          label="Order Id"
          name="orderid"
          rules={[ { required: true},]}>
          <Input />
        </Form.Item>
        <Form.Item
          style={{ width: "50%" }}
          label="Name"
          name="name"
          rules={[ {required: true,message: 'Please input your name!',},]}><Input />
          </Form.Item> 
          <Form.Item
          style={{ width: "50%" }}
          label="Phone 1"
          name="phone1"
          rules={[ { required: true, message: 'Please enter Phone nuber1',},]}>
          <Input />
        </Form.Item>
        
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}>
        <Form.Item
          style={{ width: "50%" }}
          label="Phone 2"
          name="phone2"
          rules={[{ required: true,  message: 'Please enter Phone number2', },]} >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ width: "50%" }}
          label="Gmail"
          name="gmail"
          rules={[
            {  required: true, message: 'Please enter Gmail', },]}>
          <Input />
        </Form.Item>
      </div>
      <div style={{ display: "flex", flexDirection: "row", }}>
        <Form.Item label="Address" name='address' style={{ width: "50%" }}   rules={[
            {  required: true, message: 'Please enter Address', },]}>
          <Input.TextArea rows={3} />
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
          style={{ width: "50%" }}
          name="paymentoption"
          rules={[{ required: true, message: "Please select Payment Mode" }]}>
          <Select defaultValue="Online Mode" style={{ width: 220 }} options={paymentOptions} value={paymentOptions}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:"250px"}}>
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default CardOrder; 