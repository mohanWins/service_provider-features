import React, { ChangeEvent } from "react";
import "./inputfilds.css";
import { Field, Form } from "formik";
import { Button, Chip, Paper, Stack, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/system";

interface ProviderInputFieldProps {
  inputData: string;
  handleCloseModal: () => void;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  handleMultipleEmail: (value: string, errors: string | undefined) => void;
  data: Array<{ id: number; emailList: string }>;
  viewChips: boolean;
  handleDelete: (value: { id: number; emailList: string }) => void;
  errors: {
    providerName?: string;
    emailList?: string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUpdateProvider: any;
}

const ProviderInputField: React.FC<ProviderInputFieldProps> = ({
  inputData,
  handleCloseModal,
  setInputData,
  handleMultipleEmail,
  data,
  viewChips,
  handleDelete,
  errors,
  handleChange,
  onUpdateProvider,
}) => {
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  return (
    <Form>
      <Field
        name="providerName"
        type="text"
        as={TextField}
        fullWidth
        variant="outlined"
        margin="normal"
        label="Provider Name"
        color={errors.providerName ? "warning" : "primary"}
        helperText={errors.providerName}
        FormHelperTextProps={{ sx: { color: "red" } }}
      />
      <div style={{ position: "relative" }}>
        <Field
          name="emailList"
          type="text"
          as={TextField}
          fullWidth
          variant="outlined"
          margin="normal"
          label="Add Email"
          value={inputData}
          onChange={(e: any) => {
            setInputData(e.target.value);
            handleChange(e);
          }}
          color={errors.emailList ? "warning" : "primary"}
          helperText={errors.emailList}
          FormHelperTextProps={{ sx: { color: "red" } }}
        />

        <Button
          onClick={() => handleMultipleEmail(inputData, errors.emailList)}
          style={{
            position: "absolute",
            top: "26px",
            right: "2px",
            cursor: "pointer",
          }}
        >
          <AddCircleIcon color="primary" />
        </Button>
      </div>

      {viewChips && data?.length > 0 ? (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            m: 0,
            mt: 3,
          }}
          className="emailChips"
          variant="outlined"
          component="ul"
        >
          {data &&
            data?.map((value: any) => {
              if (value.emailList !== "") {
                return (
                  <ListItem key={value.id}>
                    <Chip
                      label={value.emailList}
                      onDelete={() => handleDelete(value)}
                    />
                  </ListItem>
                );
              }
            })}
        </Paper>
      ) : (
        ""
      )}
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
          variant="contained"
          type="submit"
        >
          Add Provider
        </Button>
        <Button
          sx={{
            width: "181px",
            height: "40px",
          }}
          variant="outlined"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </Stack>
    </Form>
  );
};

export default ProviderInputField;
