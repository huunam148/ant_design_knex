import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import keycloak from "../../keycloak.js";
import axios from "axios";
import qs from 'qs';

const onFinish = (values) => {
  console.log("Success:", values);
};

// const onFinish = async (values) => {
//   try {
//     await keycloak.login({
//       username: values.username,
//       password: values.password,
//     });
//     console.log("Successfully authenticated");
//   } catch (error) {
//     console.error("Authentication failed:", error);
//   }
// };

// const onFinish = async (values) => {
//   try {
//     const keycloakConfig = {
//       client_id: 'nodeClient',
//       client_secret: 'megRjBvUxJEu6MbreHfPDWMaMidVYu7m',
//       grant_type: 'password',
//       username: values.username,
//       password: values.password,
//     };

//     const response = await axios.post(
//       'http://localhost:8080/realms/ReactNodeProject/protocol/openid-connect/token',
//       qs.stringify(keycloakConfig),  // Use qs.stringify to convert the payload to x-www-form-urlencoded format
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Accept': 'application/json, text/plain, */*',
//           // 'Content-Type': 'application/json; charset=UTF-8'
//         },
//         withCredentials: true,
//       }
//     );

//     console.log('response connect keycloak:', response.data);
//   } catch (error) {
//     console.error('Authentication failed:', error);
//   }
// };

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const App = () => {
  
  useEffect(() => {
    keycloak.init({
      onLoad: 'login-required',
      promiseType: 'native',
      // onLoad: 'check-sso',
      KeycloakResponseType: 'code',
      // checkLoginIframe: false,
      pkceMethod: 'S256'
      })
      .then(auth => {
          if(auth) {
            console.log("token keycloak:", keycloak.token);
          }
      })
      .catch((error) => console.error('Keycloak initialization failed:', error));
  }, []);

  // useEffect(() => {
  //   keycloak.init({
  //     // onLoad: keycloak.onLoad,
  //     KeycloakResponseType: 'code',
  //     checkLoginIframe: false,
  //     pkceMethod: 'S256'
  //     })
  //     .then(auth => {
  //         if(auth) {
  //           console.log("token keycloak:", keycloak.token);
  //         }
  //     })
  //     .catch((error) => console.error('Keycloak initialization failed:', error));
  // }, []);

  return (
    <div className="container">
      <Form
        className="form-login"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="login">Login</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 5,
              message: "Username must be at least 5 characters!",
            },

          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern: /^[A-Za-z\d]{6,}$/,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;


