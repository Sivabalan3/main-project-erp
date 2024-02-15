import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography, Divider, notification, Space, Skeleton } from 'antd';
import useLanguage from '@/locale/useLanguage';
import NavBar from '@/apps/Header/Navbar';
import Swiper from '@/pages/cardsTemplate/Swiper';
import FooterContainer from '@/apps/Footer/FooterContainer';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/card/cartSlices';
import { useGetAllProductsQuery } from '@/redux/productApilink/productsApi';
import { useSelector } from 'react-redux';
import { getTotals } from '@/redux/card/cartSlices';
import './cardbody.css'

const { Meta } = Card;
const card = () => {
  const [loading, setLoading] = useState(true);
  const translate = useLanguage();
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetAllProductsQuery();
  const { cartTotalQuantity, cart } = useSelector((state) => state.cart);

  const button = {
    width: '100%', marginTop: '20px', height: '40px', textAlign: "center", fontSize: "16px"
  }


  const handleADDToCart = (product) => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  });
  return (
    <>
      <section >
        {/* {contextHolder} */}

        <NavBar />
        <Swiper />

        <div style={{ padding: '0px 20px' }}>

          <h3 className='header'>{translate('Natural Soaps')}</h3>

          <Row style={{ overflowx: 'hidden', width: '100%', marginTop: '30px' }}>
            {data?.slice(0, 4).map((product) => (
              <Col key={product.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} style={{
                padding: "0px 10px"
              }}>
                <Skeleton loading={loading} avatar active> <Card
                  key={product.id}
                  hoverable
                  cover={<img alt={product.name} src={product.img} />}
                >
                  <h6 className='price'>{translate('Price')}: ₹ {product.price}</h6>
                  <h6 style={{ color: "#9834eb" }}>{translate(product.name)}</h6>
                  <Meta description={translate("soap_contents")} />

                  <Button type="primary" block typeof='button' style={button} onClick={() => handleADDToCart(product)}>
                    {translate('buy')}  +
                  </Button>
                </Card></Skeleton>
              </Col>
            ))}
          </Row>
          <h3 className='header'>{translate('Natural Oils')}</h3>

          <Row style={{ overflowx: 'hidden', width: '100%', marginTop: '30px' }}>
            {data?.slice(4, 8).map((product) => (
              <Col key={product.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} style={{
                padding: "0px 10px"
              }}>
                <Skeleton loading={loading} avatar active> <Card
                  key={product.id}
                  hoverable
                  cover={<img alt={product.name} src={product.img} />}>
                  <h6 className='price'>{translate('Price')}: ₹ {product.price}</h6>
                  <h6 style={{ color: "#9834eb" }}>{translate(product.name)}</h6>
                  <Meta description={translate("soap_contents")} />
                  <Button type="primary" block typeof='button' style={button} onClick={() => handleADDToCart(product)}>
                    {translate('buy')}  +
                  </Button>
                </Card></Skeleton>
              </Col>
            ))}
          </Row>
        </div>
        <FooterContainer />
      </section>
    </>
  );
}
export default card;