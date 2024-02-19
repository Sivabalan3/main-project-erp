import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { postData, PostUserOrderData } from '@/redux/orderuserdetails/OrderUserDetailSlice';
import { selectCreatedItem } from '@/redux/crud/selectors';
import { crud } from '@/redux/crud/actions';


const CardOrder = ({ setCurrent, current,config, formElements, withUpload = false }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const paymentOptions = [
    { value: "online", label: "Online Payment" },
    { value: "cash", label: "Cash On Delivery" },
  ];
  const orderstatus=[
    {label:'Pending',value:'pending'},
    {label:'Shipping',value:'shipping'},
    {label:'Deliverd',value:'deliverd'}
  ]
  const generateOrderId = () => {
    const number = Math.floor(Math.random() * 10000);
    const padded = number.toString().padStart(4, "0");
    return padded;
  };

  useEffect(() => {
    form.setFieldsValue({
      totalamount: cart.cartTotalAmount + cart.cartTaxAmount,
      orderid: generateOrderId(),
      orderstatus: 'pending',
    });
  }, [cart.cartTotalAmount, form]);

  let  entity = 'people';
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  
  const onSubmit = (fieldsValue) => {
    // Manually trim values before submission
    let nextStep = current + 1;
    if (fieldsValue.paymentoption === 'cash') {
      nextStep = 2;
    } else if (fieldsValue.paymentoption === 'online') {
      nextStep = 1;
    }
    setCurrent(nextStep);
    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});

    dispatch(crud.create({ entity, jsonData: trimmedValues, withUpload }));
  };
  useEffect(() => {
    if (isSuccess) {
     
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);
  return (
    <Form
      form={form}
      name="myForm"
      onFinish={onSubmit}
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
            name="email"
            rules={[{ required: true, message: 'Please input your Gmail!' }]}
          >
            <Input placeholder="Enter your Gmail" />
          </Form.Item>
 
          <Form.Item
            label="Total Amount"
            name="totalamount"
          >
            <Input suffix={<DollarOutlined />} disabled={true} placeholder="Enter Amount" />
          </Form.Item> 
          <Form.Item
            label="Order Status"
            name="orderstatus"
            // rules={[{ required: true, message: "Please select order Status" }]}
          >
            <Select defaultValue="Pending" options={orderstatus} value={orderstatus} disabled/>
          </Form.Item>
        </div>

        <div style={{ flex: '50%', padding: '10px' }}>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'Please input your First Name' }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please input your Last Name' }]}
          >
            <Input placeholder="Enter Last Name" />
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