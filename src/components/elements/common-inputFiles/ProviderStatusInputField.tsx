import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack, Select, MenuItem } from "@mui/material";
import {
  CheckCircleOutline,
  RemoveCircleOutline,
  HelpOutline,
} from "@mui/icons-material";

interface RecordInputFieldProps {
  handleCloseModal: () => void;
  onFormSubmit: (data: any) => void;
  onUpdateProvider: (data: any) => void;
  modalText: any;
}

const RecordInputField: React.FC<RecordInputFieldProps> = ({
  handleCloseModal,
  onFormSubmit,
  onUpdateProvider,
  modalText,
}) => {
  const initialValues = {
    notes: modalText.notes.toLowerCase(),
    status: modalText.status.toLowerCase(),
  };

  const validationSchema = Yup.object({
    notes: Yup.string().required("Notes is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);

        onUpdateProvider(values);
      }}
    >
      {({ errors, values }) => (
        <Form>
          <Field
            name="notes"
            type="text"
            as={TextField}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Notes"
            multiline
            rows={4}
            color={errors.notes ? "warning" : "primary"}
            helperText={errors.notes}
            FormHelperTextProps={{ sx: { color: "red" } }}
          />

          <Field
            name="status"
            as={Select}
            fullWidth
            variant="outlined"
            margin="normal"
            label="Status"
            value={values?.status}
            color={errors.status ? "warning" : "primary"}
            helperText={errors.status}
            FormHelperTextProps={{ sx: { color: "red" } }}
          >
            <MenuItem value="active">
              <div style={{ display: "flex" }}>
                {" "}
                <CheckCircleOutline sx={{ color: "green", marginRight: 1 }} />
                <span>Active</span>{" "}
              </div>
            </MenuItem>
            <MenuItem value="inactive">
              <div style={{ display: "flex" }}>
                <RemoveCircleOutline sx={{ color: "red", marginRight: 1 }} />
                <span> Inactive</span>
              </div>
            </MenuItem>
            <MenuItem value="moderate">
              <div style={{ display: "flex" }}>
                <HelpOutline sx={{ color: "orange", marginRight: 1 }} />
                <span> Moderate</span>
              </div>
            </MenuItem>
          </Field>

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
              Save
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
      )}
    </Formik>
  );
};

export default RecordInputField;
