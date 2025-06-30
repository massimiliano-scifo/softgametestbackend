import HeaderWithButton from "./header";
import { Layout } from 'antd';
import { useState } from 'react';
import { CustomTable } from "./table";
import { SharedModal } from "./modal";
import { GameData } from "functions_shared";
const { Content } = Layout;

const appRoot: React.FC = () => {
    const [modalContent, setModalContent] = useState<GameData>();
    const [modalVisible, setModalVisible] = useState(false);
    const [newItem, setNewItem] = useState(false);

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
            <CustomTable onOpenModal={openModalForEdit} />
        </Content>
        {modalVisible && (
        <SharedModal
          visible={modalVisible}
          onClose={() => { setModalVisible(false); }}
          onSubmit={() => {}}
          content={modalContent}
          newItem={newItem}
        />
        )}
        </Layout>
    );
};

export default appRoot;