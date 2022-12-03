import React, { useState } from "react";
import { Modal, Input } from "antd";

const FactModal = (props) => {
  const [confirmLoadingModal, setConfirmLoadingModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleOk = () => {
    props.addNewFact({
      key: props.arrayLength,
      fact: inputValue,
    });
    setConfirmLoadingModal(true);
    setTimeout(() => {
      setConfirmLoadingModal(false);
    }, 1000);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCloseModal();
    setInputValue("");
  };

  return (
    <Modal
      title="Add a new fact"
      open={props.isModalOpen}
      onOk={handleOk}
      confirmLoading={confirmLoadingModal}
      onCancel={handleCancel}
    >
      <Input.TextArea
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        rows={4}
        placeholder="The new fact is..."
      />
    </Modal>
  );
};

export default FactModal;
