import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axios from "axios";
import './style.css';

const { Header, Content, Footer } = Layout;
const items = new Array(5).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/customers`);
      setData(response.data.data);
      // console.log('data show: ', response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout style={{minHeight: '100vh',}} className='container-layout'>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <img src= {logo01} alt="logo" className='header-logo' /> */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
        {data.map((item, index) => {
          return (
            <div key={index} className="container_cus">
              <h4>{item.CusID}</h4>
              <p>{item.YARD_ID}</p>
              <p>{item.ROWGUID}</p>
            </div>
          );
        })}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;