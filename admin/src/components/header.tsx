import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

type HeaderWithButtonProps = {
    onOpenModal: () => void;
};

const HeaderWithButton: React.FC<HeaderWithButtonProps> = ({ onOpenModal }) => {
    return (
        <>
        <div
        style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        }}>

            <h1 style={{ margin: 0 }}>Admin</h1>
            <Button type="primary" color="green" variant="solid" onClick={onOpenModal}>
            <PlusOutlined /> Add
            </Button>
        </div>
        
        </>
    );
};

export default HeaderWithButton;