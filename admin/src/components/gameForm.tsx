import React from 'react';
import { Form, Input, InputNumber, Button, Checkbox } from 'antd';
import { GameData } from 'functions_shared';
import { HttpService } from '../services/HttpService';

type GameFormProps = {
  initialValues?: GameData;
  newItem: boolean;
  onCancel: () => void;
};

export const GameForm: React.FC<GameFormProps> = ({ initialValues, newItem, onCancel}) => {
  const [form] = Form.useForm();
  
  const handleSubmit = async (formData: GameData) => {

    const gameData: GameData = {
      name: formData.name,
      releaseYear: formData.releaseYear,
      publisher: formData.publisher,
      id: initialValues?.id || "",
      players: { min : formData.players.min, max : formData.players.max },
      expansions: formData.expansions,
      type: formData.type
    }
    const httpService = new HttpService();
    console.log(newItem, gameData);
    if (newItem) {
      return await httpService.createGame(gameData);
    } else {
      return await httpService.updateGame(gameData);
    }
  }
  

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
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
        rules={[{ required: true, message: 'Please input the max players!' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} max={10} />
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