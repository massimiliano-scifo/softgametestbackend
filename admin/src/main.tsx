import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout, Table } from 'antd';
import { GameData, gameDataConverter } from 'functions_shared';
import { HttpService } from './services/HttpService';
const { Header, Content } = Layout;

// I would prefer to use dependency injection here
const service = new HttpService();
const dataSource: GameData[] = [];
for (const item of await service.getGames()) {
  dataSource.push(gameDataConverter.fromFirestore(item));
}

const tableColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
  { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
]

const root = document.getElementById('root');
if (!root) {
  throw new Error('No root element found to mount the app');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Layout>
      <Header style={{ color: 'white', fontSize: '20px' }}>Admin</Header>
      <Content>
        <Table dataSource={dataSource} columns={tableColumns} />
      </Content>
    </Layout>
  </React.StrictMode>,
);
