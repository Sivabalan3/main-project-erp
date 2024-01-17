import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography, Divider, notification, Space, Skeleton } from 'antd';
import useLanguage from '@/locale/useLanguage';
import NavBar from '@/apps/Header/Navbar';
import Swiper from '@/pages/cardsTemplate/Swiper';
import cardDatas from './Carddatas';
import FooterContainer from '@/apps/Footer/FooterContainer';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/card/cartSlices';
import { useGetAllProductsQuery } from '@/redux/productApilink/productsApi';
import { useSelector } from 'react-redux';
import { getTotals } from '@/redux/card/cartSlices';
const { Meta } = Card;
const card = () => {
  const [loading, setLoading] = useState(true);
  const translate = useLanguage();
  const { Title } = Typography;
  const button = {
    width: '100%', marginTop: '20px', height: '40px', textAlign: "center", fontSize: "16px"
  }
  const titles = {
    marginLeft: "17px"
  }
  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch()
  const handleADDToCart = (product) => {
    dispatch(addToCart(product))
  }
  const { data, error, isLoading } = useGetAllProductsQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);
  const { cartTotalQuantity ,cart} = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  });
  return (
    <>
      <section >
        {/* {contextHolder} */}

        <NavBar/>
        <Swiper />

        <div style={{ padding: '0px 20px' }}>
    
          <Title style={titles} level={2}>{translate('natural soaps')} </Title>
         
          <Row style={{ overflowx: 'hidden', width: '100%', marginTop: '30px' }}>
            {data?.map((product) => (
              <Col key={product.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} style={{
                padding: "0px 10px"
              }}>
                <Skeleton loading={loading} avatar active> <Card
                  key={product.id}
                  hoverable
                  cover={<img alt={product.name} src={product.img} />}
                >
                  <Meta title={translate('natural soaps')} description={translate("soap_contents")} />
                  <Button type="primary" block typeof='button' style={button} onClick={() => handleADDToCart(product)}>
                    {translate('buy')}  +
                  </Button>
                </Card></Skeleton>
              </Col>
            ))}
          </Row>
       <Title style={titles} level={2}>{translate('Natural Oils')}</Title>

          <Row style={{ overflowx: 'hidden', width: '100%', marginTop: '30px' }}>
            {cardDatas.oilImages.map((oil,index) => (
              <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 6 }} style={{
                padding: "0px 10px"
              }} >
                <Card
                  key={oil.id}
                  hoverable
                  cover={<img alt="example" src={oil.imgs} />}
                >
                  <Meta title={translate('natural oils')} description={translate("soap_contents")} />
                  <Button type="primary" style={button}>
                    Buy+
                  </Button>

                </Card>
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