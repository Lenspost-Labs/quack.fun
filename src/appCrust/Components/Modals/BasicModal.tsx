import React, { useState } from "react";
import { Modal } from "antd";
const BasicModal: React.FC<BasicModalType> = ({
  isOpen,
  modalOkText,
  modalTitle,
  modalContent,
}: BasicModalType) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        okText={modalOkText}
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default BasicModal;
