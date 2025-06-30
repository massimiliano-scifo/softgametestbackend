import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout, Table } from 'antd';
import data from '../../games.json';
import { GameData } from './classes/GameData';
const { Header, Content } = Layout;

const dataSource = data.map(item => { return {
  id: item.id,
  name: item.name,
  releaseYear: item.releaseYear,
  publisher: item.publisher,
  players: item.players,
  expansions: item.expansions,
  type: item.type,
  baseGame: item.baseGame,
  standalone: item.standalone
} as GameData});

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
