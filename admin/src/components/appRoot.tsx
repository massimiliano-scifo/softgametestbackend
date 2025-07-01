import HeaderWithButton from "./header";
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { CustomTable } from "./table";
import { SharedModal } from "./modal";
import { GameData, gameDataConverter } from "functions_shared";
import { HttpService } from "../services/HttpService";
const { Content } = Layout;

const appRoot: React.FC = () => {
    const [modalContent, setModalContent] = useState<GameData>();
    const [modalVisible, setModalVisible] = useState(false);
    const [newItem, setNewItem] = useState(false);
    const [tableData, setTableData] = useState<GameData[]>([]);
    const httpService = new HttpService();

    // Fetch data on mount
    useEffect(() => {
      async function fetchGames() {
        const games = await httpService.getGames();
        setTableData(games.map(gameDataConverter.fromObject));
      }
      fetchGames();
    }, []);

    // Handle add/edit submit
    const handleModalSubmit = async (game: GameData) => {
      let updatedGame: GameData;
      if (newItem) {
        const id = await httpService.createGame(game);
        updatedGame = { ...game, id };
        setTableData(prev => [updatedGame, ...prev]);
      } else {
        await httpService.updateGame(game);
        updatedGame = game;
        setTableData(prev => prev.map(item => (item.id === updatedGame.id ? updatedGame : item)));
      }
      
      setModalVisible(false);
      setModalContent(undefined);
    };

    // Handle delete from table
    const handleDelete = async (id: string) => {
      await httpService.deleteGame(id);
      setTableData(prev => prev.filter(item => item.id !== id));
    };

    const openModalForEdit = (record: GameData) => {
        setModalContent(record);
        setNewItem(false);
        setModalVisible(true);
      };
    
      const openModalForCreate = () => {
        setModalContent(undefined);
        setNewItem(true);
        setModalVisible(true);
      };

    return (
        <Layout>
        <HeaderWithButton onOpenModal={openModalForCreate} />
        <Content>
            <CustomTable data={tableData} onOpenModal={openModalForEdit} onDelete={handleDelete} />
        </Content>
        {modalVisible && (
        <SharedModal
          visible={modalVisible}
          onClose={() => { setModalVisible(false); }}
          content={modalContent}
          newItem={newItem}
          onSubmit={handleModalSubmit}
        />
        )}
        </Layout>
    );
};

export default appRoot;