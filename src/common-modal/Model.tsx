import React from "react";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonInputField from "../common-inputFiles/InputFields";

import { grey } from "@mui/material/colors";

interface ProviderModalContentProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  onUpdateProvider: (data?: any) => void;
  text?: string;
  modalText?: any;
  proServeId: any;
  uniqueCode: any;
  statusProId?: any;
  serviceId?: any;
}

const ProviderModalContent: React.FC<ProviderModalContentProps> = ({
  isOpen,
  handleCloseModal,
  onUpdateProvider,
  text,
  modalText,
  proServeId,
  uniqueCode,
  statusProId,
  serviceId,
}) => {
  if (!isOpen) {
    return null;
  }
  console.log(proServeId, "serviceIdkkkmm");
  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
    handleCloseModal();
  };

  const ModalContent = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 2,
      }}
    >
      <Button
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
        onClick={handleCloseModal}
      >
        <CloseIcon sx={{ color: grey[500] }} />
      </Button>

      <CommonInputField
        id="common-input"
        label="Email"
        text={text}
        handleCloseModal={handleCloseModal}
        onFormSubmit={handleFormSubmit}
        onUpdateProvider={onUpdateProvider}
        modalText={modalText}
        proServeId={proServeId}
        uniqueCode={uniqueCode}
        statusProId={statusProId}
        serviceId={serviceId}
      />
    </Box>
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {ModalContent}
    </Modal>
  );
};

export default ProviderModalContent;
