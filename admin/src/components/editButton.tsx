import { Button } from "antd";
import { GameData } from "functions_shared";

type EditButtonProps = {
    record: any;
    onOpenModal: (record: GameData) => void;
};

export const EditButton: React.FC<EditButtonProps> = ({ record, onOpenModal }) => {
    return (
        <Button
          type="primary"
          size="small"
          style={{ marginRight: 8 }}
          onClick={() => onOpenModal(record)}
        >
          Edit
        </Button>
    );
};
