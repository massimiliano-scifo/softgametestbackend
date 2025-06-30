import React from 'react';
import { Modal } from 'antd';
import { GameForm } from './gameForm';
import { GameData } from 'functions_shared';

type SharedModalProps = {
  visible: boolean;
  newItem: boolean;
  onClose: () => void;
  onSubmit: (values: GameData) => void;
  content: GameData | undefined;
};

export const SharedModal: React.FC<SharedModalProps> = ({ visible, onClose, onSubmit, content, newItem }) => (
  <Modal open={visible} onCancel={onClose} footer={null} >
    <GameForm
      newItem={newItem}
      initialValues={content}
      onCancel={onClose}
    />
  </Modal>
);