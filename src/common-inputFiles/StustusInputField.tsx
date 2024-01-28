// StatusInputField.tsx
import React from "react";
import { Button, Stack } from "@mui/material";
import Status from "./Status";

interface StatusInputFieldProps {
  handleCloseModal: () => void;
  proServeId: any;
  uniqueCode: any;
  serviceId?: any;
}

const StatusInputField: React.FC<StatusInputFieldProps> = ({
  handleCloseModal,
  proServeId,
  uniqueCode,
  serviceId,
}) => {
  console.log(proServeId, "khjhjvhh");
  return (
    <>
      <Status
        proServeId={proServeId}
        uniqueCode={uniqueCode}
        serviceId={serviceId}
      />

      <Stack
        spacing={2}
        direction="row-reverse"
        sx={{ paddingTop: "42px", paddingBottom: "25px" }}
      >
        <Button
          sx={{
            width: "181px",
            height: "40px",
          }}
          variant="outlined"
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Stack>
    </>
  );
};

export default StatusInputField;
