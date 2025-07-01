import { GameData, gameDataConverter } from "functions_shared";
import { HttpService } from "../services/HttpService";
import { Button, Checkbox, Table } from "antd";
import { EditButton } from "./editButton";
import { useEffect, useState } from "react";

type TableProps = {
    data: GameData[];
    onOpenModal: (record: GameData) => void;
    onDelete: (id: string) => void;
};

export const CustomTable: React.FC<TableProps> = ({ data, onOpenModal, onDelete }) => {
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
                onClick={() => onDelete(record.id)}
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

