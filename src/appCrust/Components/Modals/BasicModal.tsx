import React, { useContext } from "react";
import { Modal } from "antd";
import { AppContext, AppContextProps } from "src/contexts/AppContext";

const BasicModal: React.FC<BasicModalType> = ({
  modalOkText,
  modalTitle,
  modalContent,
}: BasicModalType) => {
  
  const { isBasicModalOpen, setIsBasicModalOpen } = useContext<AppContextProps>(AppContext);

  const handleOk = () => {
    setIsBasicModalOpen(false);
  };

  const handleCancel = () => {
    setIsBasicModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        okText={modalOkText}
        title={modalTitle}
        open={isBasicModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default BasicModal;
