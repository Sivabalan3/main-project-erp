// import React,{useState} from 'react';
// import { Table,Button,Typography,Tooltip } from 'antd';
// import { ArrowLeftOutlined, DeleteOutlined} from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { decreaseCart, removeFromCart } from '@/redux/card/cartSlices';
// import { useDispatch } from 'react-redux';


// const AddTocart = () => {

//   const cart = useSelector(state => state.cart);
//   const Dispatch=useDispatch()
//   const handleRemoveCart=(cartItem)=>{
//     Dispatch(removeFromCart(cartItem))
//   }
//   const handleDecreaseCart=(cartItem)=>[
//     Dispatch(decreaseCart(cartItem))
//   ]
//   const dataSource = cart.cartItems?.map((cartItem, index) => ({
//     key: cartItem.id,
//     name: cartItem.name,
//     price: cartItem.price,
//     quantity: cartItem.cartQuantity,
//     image: cartItem.img,

//   }));
//   const columns = [
//     {
//       title: 'Products',
//       dataIndex: 'name',
//       key: 'key', 
//       render: (text) => <h1>{text}</h1>,
//     },
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       key: 'key',
//       render: (image) => <img src={image} alt={name} style={{width:"100px",height:"100px",borderRadius:"10px"}}/>,
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'key',
//       render: (text) => <h1>{text}</h1>,
//     },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       key: 'key',
//       render: (quantity,cartItem) => (
//         <div>
//           {/* <Button onClick={()=>handleDecreaseCart(cartItem)}>-</Button>
//           <span style={{ margin: '0 10px' }}>{quantity}</span>
//           <Button onClick={() => console.log('Increase')}>+</Button> */}
//           <Tooltip title="Delete Product" color={'red'} >
//           <Button type="primary" icon={<DeleteOutlined />} style={{marginLeft:"30px"}} onClick={()=>handleRemoveCart(cartItem) }data-id={cartItem.id}/>
//           </Tooltip>
//         </div>
//       ),
//     },
//     {
//       title: 'Total',
//       dataIndex: 'price',
//       key: 'key',
//        render: (text) => <h1>{text}</h1>,
//     },

//   ];
//   const button = {
//     fontSize: "26px"
//   }
//   const titles = {
//     marginLeft: "17px"
//   }
//   const { Title } = Typography;

// return(
// <>
// <Link to='/' style={button}><ArrowLeftOutlined  /> Home</Link>

// <Table dataSource={dataSource} columns={columns}   bordered rowKey="key"/>
// <div className="right-container">
// <Title style={titles} level={2}>SubTotal(s){cart.cartTotalAmount}</Title>

// <Title style={titles} level={4}>Amount</Title>
// <Button type="primary" style={{width:"190px",height:"40px",marginLeft:"17px"}}>
//   Check out
//     </Button>
//     </div>
// </>
// )
// }
// export default AddTocart;
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Button, Tooltip, Result, Modal, Steps } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart, decreaseCart, getTotals, clearCart } from '@/redux/card/cartSlices';
import Navbar from '../../apps/Header/Navbar'
import './table.css'
import useLanguage from '@/locale/useLanguage';
import CardOrder from './CardOrder';
import DownloadReceipt from './DownloadReceipt';
import { printAndDownload } from './DownloadReceipt';
import StripeForm from './StripeForm';
import StripeForms from './StripeForm';

const { Step } = Steps;

const AddTocart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const translate = useLanguage();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: 'Shipping',
      content: <CardOrder setCurrent={setCurrent} current={current} />,
    },
    {
      title: 'Payment',
      content: <StripeForms />,
    },
    {
      title: 'Confirm',
      content: <DownloadReceipt />,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>{translate('Shopping Cart')}</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">

            <Result
              icon={<SmileOutlined />}
              title="Your cart is currently empty!"

            />
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">{translate('Product')}</h3>
              <h3 className="price">{translate('Price')}</h3>
              <h3 className="quantity">{translate('Quantity')}</h3>
              <h3 className="total">{translate('Total')}</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={cartItem.img} alt={cartItem.name} />
                      <div>
                        <h3>{translate(cartItem.name)}</h3>
                        {/* <p>{cartItem.desc}</p> */}
                        {/* <button  >
                        Remove
                      </button> */}
                        <Tooltip title="Remove" color={'red'}>
                          <Button danger size={'small'} onClick={() => handleRemoveFromCart(cartItem)}>
                            {translate('Remove')}
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="cart-product-price">₹{cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      ₹{cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              {/* <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button> */}
              <Button danger size={'large'} onClick={() => handleClearCart()}>
                {translate('Clear Cart')}
              </Button>
              <div className="cart-checkout">

                <div className="subtotal">
                  <span>{translate("Subtotal")}</span>
                  <span className="amount">₹ {cart.cartTotalAmount}</span>
                </div>
                <div className="subtotal">
                  <span>{translate('Tax')}</span>
                  <span className="amount">₹ {cart.cartTaxAmount}</span>
                </div>
                <div className="subtotal">
                  <span>{translate('Grand Total')}</span>
                  <span className="amount">₹ {cart.cartTotalAmount + cart.cartTaxAmount}</span>
                </div>
                <p>{translate("Taxes and shipping calculated at checkout")}</p>
                <button onClick={() => setOpen(true)}>{translate('Check out')}</button>
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>{translate("Continue Shopping")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Shopping Cart"
        centered
        style={{ textAlign: "center", marginTop: "40px" }}
        visible={open}
        width={1024}
        height={500}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          ),
          current < steps.length - 1 && (
            <Button key="next" type="primary" onClick={next}>
              Next
            </Button>
          ),

          current === steps.length - 1 && (
            <Button key="done" type="primary" onClick={() => {
              printAndDownload();
              setOpen(false);
            }}
            >
              Done
            </Button>
          ),

        ]}
      >
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content" style={{height:'40vh'}}>{steps[current].content}</div>
      </Modal>
    </>
  )
}
export default AddTocart;