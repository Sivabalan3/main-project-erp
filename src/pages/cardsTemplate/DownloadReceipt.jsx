import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Table,List ,Button} from 'antd';
import { FaIndianRupeeSign } from "react-icons/fa6";
import './table.css'
import jsPDF from 'jspdf'
const DownloadReceipt = () => {
  const data = useSelector((state) => state.data)
    const cart = useSelector(state => state.cart);
      const dataSource = cart.cartItems?.map((cartItem, index) => ({
    key: cartItem.id,
    name: cartItem.name,
    price: cartItem.price,
    quantity: cartItem.cartQuantity,
    image: cartItem.img,
    total:cartItem.price * cartItem.cartQuantity
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
              dataIndex: 'total',
              key: 'key',
               render: (text) => <p>{text}</p>,
            },
            
  ];
  //Customer Details
  const customercolumns = [
    {
      title: 'OrderId',
      dataIndex: 'orderid',
          
    },
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
    {
      title: 'Payment Mode',
      dataIndex: 'payment',
    },
  ];
  const customerdata = [
    {
      key: '1',
      orderid:"3232",
      name: 'John Brown',
      phone1: 845358389532,
      phone2: 845358389532,
      gmail:'joker@gmail.com',
      address: 'New York No. 1 Lake Park',
      payment:"Online"
    },
  ];
  const list = [
    <div style={{display:'flex',flexDirection:"column",alignItems:"end" ,justifyContent:"start",width:"100%"}}>
    <p>Sub Total : <FaIndianRupeeSign />
  {cart.cartTotalAmount}</p>
    <p>Tax : <FaIndianRupeeSign />
 {cart.cartTaxAmount}</p>
    <p>Grand Total :  <FaIndianRupeeSign /> {cart.cartTotalAmount + cart.cartTaxAmount}</p>
    <p>Taxes And Shipping Calculated At Checkout</p>
    <p>Verified By : Shoping Cart (Id:35466467)</p>
   
    </div>
  ];
  
return(
  <>
  <div style={{overflow:"scroll",height:"100%"}} id='table'>
  <Divider>Order Details</Divider>
  <Table columns={customercolumns} dataSource={customerdata} size="small" pagination={false} bordered />
  <Divider>Order Products</Divider>
    <Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
    <List
      size="small"
      header={<h3>Payment</h3>}
    //   footer={<div>Footer</div>}
      bordered
      dataSource={list}
      renderItem={(item) => 
      <div>
      <List.Item>{item}</List.Item>
      {/* <Button type="primary" onClick={printAndDownload}>
      Download Receipt
    </Button> */}
      </div>
      }
    
    />
      
  </div>
  </>
)
};
export const printAndDownload = () => {
  var pdf = new jsPDF('p', 'pt', 'a4');
  var source = document.getElementById('table');
  // Border
  pdf.setLineWidth(2);
  pdf.setDrawColor(0);
  
  // Set the watermark width to 2 points
  // pdf.setLineWidth(2)
  // pdf.text('Shopping Cart', pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height / 2, {
  //   angle: -45,
  //   align: 'center',
  //   valign: 'middle'
  // })
  pdf.addImage('https://cdn-icons-png.flaticon.com/512/5129/5129557.png', 'PNG', pdf.internal.pageSize.width / 2 - 50, pdf.internal.pageSize.height / 2 - 50, 100, 100, undefined, 'FAST', -45)
  pdf.rect(10, 10, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40, 'S');
  pdf.html(source, {
    x: 65,
    y: 25,
    html2canvas: {
      scale: 0.5,
      width: 120
    },
    
    callback: function (pdf) {
      pdf.save('Order.pdf');
    }
  });
  
}
export default DownloadReceipt;