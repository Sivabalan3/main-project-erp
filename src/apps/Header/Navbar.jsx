import React, { useState } from "react";
import { Layout, Input } from "antd";

import {
RiseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SelectLanguage from "@/components/SelectLanguage";
import UpgradeButton from "./UpgradeButton";

const { Header } = Layout;
const { Search } = Input;
const ResponsiveNav = () => {
  const [visible, setVisible] = useState(true);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="superNav  bg-light">
        {/* <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 centerOnMobile">
            <div  className="me-3 border-0 bg-light">
              <option value="en-us">EN-US</option>
            </div>
            <span className="d-none d-lg-inline-block d-md-inline-block d-sm-inline-block d-xs-none me-3"><strong>info@somedomain.com</strong></span>
            <span className="me-3"><i className="fa-solid fa-phone me-1 text-warning"></i> <strong>1-800-123-1234</strong></span>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
            <span className="me-3"><i className="fa-solid fa-truck text-muted me-1"></i><a className="text-muted" href="/">Shipping</a></span>
            <span className="me-3"><i className="fa-solid fa-file  text-muted me-2"></i><a className="text-muted" href="/">Policy</a></span>
          </div>
        </div>
      </div> */}
      </div>
      <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
        <div className="container">
          <div className="d-lg-none">
            <UpgradeButton />
          </div>

          <a className="navbar-brand" href="/"><RiseOutlined /> <strong>SHOPING CART</strong></a>
          <button onClick={showDrawer} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
            <div className="input-group">
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            </div>
          </div>
          <div className={visible ? " collapse navbar-collapse" : "navbar-collapse"} id="navbarNavDropdown">
            <div className="ms-auto d-none d-lg-block">
              <div className="input-group">
                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
              </div>
            </div>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link className="nav-link mx-2 text-uppercase active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">Catalog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-2 text-uppercase" href="/">Services</a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item d-none d-lg-block">
                <Link className="nav-link mx-2 text-uppercase" to="/addtocart"><UpgradeButton /></ Link>
              </li>
              <li className="nav-item sm-none">
                <div className="nav-link mx-2 text-uppercase"><SelectLanguage /></div>
              </li>
              <li className="nav-item sm-none mt-2">
                <Link className="nav-link mx-2 text-uppercase" to="/login">Login</Link>
              </li>
              <li className="nav-item sm-none mt-2">
                <Link className="nav-link mx-2 text-uppercase" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNav;
