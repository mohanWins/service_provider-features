import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack } from "@mui/material";
import ROUTES from "../routes/Rout";
import { showToast } from "../toaster/Toaster";

interface RecordInputFieldProps {
  handleCloseModal: () => void;
  onFormSubmit: (data: any) => void;
  onUpdateProvider: any;
  proServeId: any;
  statusProId?: any;
  serviceId?: any;
}

const RecordInputField: React.FC<RecordInputFieldProps> = ({
  handleCloseModal,
  onFormSubmit,
  onUpdateProvider,
  proServeId,
  statusProId,
  serviceId,
}) => {
  console.log(serviceId, statusProId, "serviceIdpppppppppppp");
  const initialValues = {
    name: "",
    orgnization: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Name is required"),
    orgnization: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Organization is required"),
    notes: Yup.string().required("Notes is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values, proServeId, statusProId, "hfyhghj");
        onFormSubmit(values);
        setSubmitting(false);
        try {
          const response = await fetch(
            ROUTES.PUBLIC_ROUTES.POST_UNSUCCESSFUL_REFERRAL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ADMIN_TOKEN: "sanjeev",
              },
              body: JSON.stringify({
                provider_id: statusProId?.toString(),
                service_id: serviceId?.toString(),
                notes: values.notes,
                staff_name: values.name,
                staff_org: values.orgnization,
              }),
            }
          );
          console.log(response);
          if (!response.ok) {
            throw new Error(`Failed to update name: ${response.status}`);
          } else {
            onUpdateProvider();
            showToast("Refferal send  successfully", "success");
          }

          handleCloseModal();
        } catch (error: any) {
          showToast(error.message, "error");
          console.error("Error updating name:", error.message);
        }
      }}
    >
      {({ errors }) => {
        console.log(errors);

        return (
          <Form>
            <Field
              name="name"
              type="text"
              as={TextField}
              fullWidth
              variant="outlined"
              margin="normal"
              label="Name"
              color={errors.name ? "warning" : "primary"}
              helperText={errors.name}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />

            <Field
              name="orgnization"
              type="text"
              as={TextField}
              fullWidth
              variant="outlined"
              margin="normal"
              label="Organization"
              color={errors.orgnization ? "warning" : "primary"}
              helperText={errors.orgnization}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />

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
        );
      }}
    </Formik>
  );
};

export default RecordInputField;
