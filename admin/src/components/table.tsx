import { GameData, gameDataConverter } from "functions_shared";
import { HttpService } from "../services/HttpService";
import { Button, Checkbox, Table } from "antd";
import { EditButton } from "./editButton";
import { useEffect, useState } from "react";

type TableProps = {
    onOpenModal: (record: GameData) => void;
};

export const CustomTable: React.FC<TableProps> = ({ onOpenModal }) => {
    const dataSource: GameData[] = [];
    const [data, setData] = useState<GameData[]>([]);
    const httpService = new HttpService();
    
    const handleDelete = async (id: string) => {
        await httpService.deleteGame(id);
        setData(data.filter(item => item.id !== id));
    }

    useEffect(() => {
    async function getToken() {
      const games = await httpService.getGames();
      const data = games;
      for (const item of games) {
        dataSource.push(gameDataConverter.fromObject(item));
      }
      setData(data);
    }
    getToken();
    }, []);
    
    const tableColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
        { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
        { title: 'Min Players', dataIndex: ['players', 'min'], key: 'players.min' },
        { title: 'Max Players', dataIndex: ['players', 'max'], key: 'players.max' },
        { title: 'Expansions', dataIndex: 'expansions', key: 'expansions', 
          render: (_: any, record: GameData) => {return record.expansions?.join(', ') || '-' } 
        },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Standalone', dataIndex: 'standalone', key: 'standalone',
          render: (_: any, record: GameData) => (
            <Checkbox
              checked={record.standalone}
            />
          ),
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_: any, record : GameData) => (
            <>
              <EditButton record={record} onOpenModal={onOpenModal} />
              <Button
                type="default"
                danger
                size="small"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </>
          ),
        },
    ];

    return (
        <Table dataSource={data} columns={tableColumns} />
    );
};

