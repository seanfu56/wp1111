import React from "react";
import { Modal, Form, Input } from "antd";

type ChatModalProps = {
  open: boolean;
  onCreate: (s: string) => void;
  onCancel: () => void;
};

const ChatModal = ({ open, onCreate, onCancel }: ChatModalProps) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new chat room"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values.name);
          })
          .catch((e) => {
            window.alert(e);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Error: Please enter the name of the person to chat!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChatModal;
