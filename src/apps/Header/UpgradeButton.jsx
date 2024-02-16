import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Popover, Button, Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import Notifications from '@/components/Notification';
import { RocketOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { selectAuth } from '@/redux/auth/selectors';

export default function UpgradeButton() {
  const { isLoggedIn } = useSelector(selectAuth);
  const { cartTotalQuantity ,cart} = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  const translate = useLanguage();
  const Navigate=useNavigate("/register")
  const Content = () => {
    return (
      <>
        <p>{translate('Do you need help on customize of this app')}</p>
       <Link to="/addTocart"> <Button
          type="primary"
          // onClick={() => {
          //   window.open(`/addTocart`);
          // }}
        >
          {translate('add To cart')}
        </Button></Link>
      </>
    );
  };

  return (
    // <Popover content={<Content />} title={translate('Customize this application')} trigger="click">
    <Link to={isLoggedIn?"/addTocart":"/login"}>
      <Badge count={cartTotalQuantity} size="medium" >
        <Avatar
          icon={<ShoppingCartOutlined />}
          style={{
            color: '#f56a00',
            backgroundColor: '#FFF',
            float: 'right',
            marginTop: '5px',
            cursor: 'pointer',
          }}
        />
        {/* <ShoppingCartOutlined style={{ fontSize: '26px',cursor: 'pointer', marginTop: '5px', backgroundColor: '#FFF',
            float: 'right',}} /> */}
      </Badge>
      </Link>
    //  </Popover>
  );
}

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );
