import React from 'react';
import { Form, Input, InputNumber, Button, Checkbox } from 'antd';
import { GameData } from 'functions_shared';

type GameFormProps = {
  initialValues?: GameData;
  onCancel: () => void;
  onSubmit: (game: GameData) => void;
};

export const GameForm: React.FC<GameFormProps> = ({ initialValues, onCancel, onSubmit}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit({ ...initialValues, ...values });
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleOk}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the game name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Year"
        name="releaseYear"
        rules={[{ required: true, message: 'Please input the release year!' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1900} max={2100} />
      </Form.Item>
      <Form.Item
        label="Publisher"
        name="publisher"
        rules={[{ required: true, message: 'Please input the publisher!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Min Players"
        name={['players', 'min']}
        rules={[{ required: true, message: 'Please input the min players!' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} max={10} />
      </Form.Item>
      <Form.Item
        label="Max Players"
        name={['players', 'max']}
      >
        <InputNumber style={{ width: '100%' }} min={1} />
      </Form.Item>
      <Form.Item
        label="Expansions"
        name="expansions"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Please input the type!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Standalone"
        name="standalone"
      >
        <Checkbox defaultChecked={initialValues?.standalone} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Submit
        </Button>
          <Button onClick={onCancel}>
            Cancel
          </Button>
      </Form.Item>
    </Form>
  );
};