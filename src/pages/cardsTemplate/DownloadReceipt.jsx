import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Table,List } from 'antd';
import './table.css'

const DownloadReceipt = () => {
    const cart = useSelector(state => state.cart);
      const dataSource = cart.cartItems?.map((cartItem, index) => ({
    key: cartItem.id,
    name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.cartQuantity,
    image: cartItem.img,
  }));
 
  const columns = [
    {
              title: 'Products',
              dataIndex: 'name',
              key: 'key', 
              render: (text) => <p>{text}</p>,
     },
     {
              title: 'Price',
              dataIndex: 'price',
              key: 'key',
              render: (text) => <p>{text}</p>,
      },
      {
              title: 'Quantity',
              dataIndex: 'quantity',
              key: 'key',
              render: (text) => <p>{text}</p>
    },
    {
              title: 'Total',
              dataIndex: 'price',
              key: 'key',
               render: (text) => <p>{text}</p>,
            },
            
  ];
  //Customer Details
  const customercolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
          
    },
    {
      title: 'Phone 1',
      dataIndex: 'phone1',
    },
    {
        title: 'Phone 2',
        dataIndex: 'phone2',
      },
      {
        title: 'Gmail',
        dataIndex: 'gmail',
      },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const customerdata = [
    {
      key: '1',
      name: 'John Brown',
      phone1: 845358389532,
      phone2: 845358389532,
      gmail:'joker@gmail.com',
      address: 'New York No. 1 Lake Park',
    },
  ];
  const list = [
    <div style={{display:'flex',flexDirection:"column",alignItems:"start" ,justifyContent:"start",width:"100%"}}>
    <p>Sub Total : ₹  {cart.cartTotalAmount}</p>
    <p>Tax : ₹ {cart.cartTaxAmount}</p>
    <p>Grand Total : ₹ {cart.cartTotalAmount + cart.cartTaxAmount}</p>
    <p>Taxes And Shipping Calculated At Checkout</p>
    </div>
  ];
return(
  <>
  <div style={{overflow:"scroll",height:"100%"}}>
  <Divider>Order Details</Divider>
  <Table columns={customercolumns} dataSource={customerdata} size="small" pagination={false}  />
  <Divider>Order Products</Divider>
    <Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
    <List
      size="small"
      header={<h3>Payment</h3>}
    //   footer={<div>Footer</div>}
      bordered
      dataSource={list}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </div>
  </>
)
};
export default DownloadReceipt;