import React from 'react';
import { Modal } from 'antd';
import { GameForm } from './gameForm';
import { GameData } from 'functions_shared';

type SharedModalProps = {
  visible: boolean;
  newItem: boolean;
  onClose: () => void;
  onSubmit: (game: GameData) => void;
  content: GameData | undefined;
};

export const SharedModal: React.FC<SharedModalProps> = ({ visible, onClose, content, newItem, onSubmit }) => (
  
  <Modal open={visible} onCancel={onClose} footer={null} >
    <GameForm
      newItem={newItem}
      initialValues={content}
      onCancel={onClose}
      onSubmit={onSubmit}
    />
  </Modal>
);