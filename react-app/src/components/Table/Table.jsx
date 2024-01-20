import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import axios from "axios";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = ({ customers, fetchData }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const formattedData = customers.map((customer, index) => ({
      key: index.toString(),
      customer_id: customer.customer_id,
      customer_name: customer.customer_name,
      phone_number: customer.phone_number,
      email: customer.email,
    }));
    setData(formattedData);
  }, [customers]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      customer_id: "",
      customer_name: "",
      phone_number: "",
      email: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        // console.log('edit editingKey', editingKey);
        console.log("edit data:", newData[editingKey]);
        const customerId = newData[editingKey].customer_id;
        console.log("customerId:", customerId);
        const response = await axios.put(
          `http://localhost:8000/customers/${customerId}`,
          newData[editingKey]
        );
        console.log("put method: ", response);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const customerId = newData[index].customer_id;
        const response = await axios.delete(
          `http://localhost:8000/customers/${customerId}`
        );
        console.log("delete method:", response);
        newData.splice(index, 1);
        setData(newData);
      }
    } catch (error) {
      console.error("Error deleting record:", error.message);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "customer_id",
      width: "5%",
      editable: false,
    },
    {
      title: "Name",
      dataIndex: "customer_name",
      width: "20%",
      editable: true,
    },
    {
      title: "tel",
      dataIndex: "phone_number",
      width: "20%",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: "30%",
      editable: true,
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return customers.length >= 1 ? (
          editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <span
                style={{
                  color: "#1677ff",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.color = "#8dc2ff")}
                onMouseOut={(e) => (e.target.style.color = "#1677ff")}
                onClick={cancel}
              >
                Cancel
              </span>
            </span>
          ) : (
            <span>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Typography.Link>

              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <span
                  style={{
                    color: "#1677ff",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#8dc2ff")}
                  onMouseOut={(e) => (e.target.style.color = "#1677ff")}
                >
                  Delete
                </span>
              </Popconfirm>
            </span>
          )
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === "phone_number" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handlerAddCustomer = async (values) => {
    try {
      // console.log("customer profile:", values);
      const response = await axios.post(
        `http://localhost:8000/customers/`,
        values
      );
      console.log("post customer", response);
      fetchData();
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    handlerAddCustomer(values);
    // console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginBottom: "10px" }}
      >
        Add <PlusOutlined style={{ fontSize: "16px" }} />
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <h2>Add Customers</h2>
          </div>
        }
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          name="addCustomer"
          labelCol={{ span: 7 }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer Name"
            name="customer_name"
            rules={[
              { required: true, message: "Please input the customer name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  handleCancel();
                }}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  );
};

export default App;
