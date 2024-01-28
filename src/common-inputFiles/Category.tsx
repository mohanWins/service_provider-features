import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack } from "@mui/material";
import ROUTES from "../routes/Rout";
import { showToast } from "../toaster/Toaster";

interface CategoryInputFieldProps {
  handleCloseModal: () => void;
  onFormSubmit: (data: any) => void;
  onUpdateProvider: any;
}

const CategoryInputField: React.FC<CategoryInputFieldProps> = ({
  handleCloseModal,
  onFormSubmit,
  onUpdateProvider,
}) => {
  const initialValues = {
    serviceCategory: "",
  };

  const validationSchema = Yup.object({
    serviceCategory: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Service Category is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);

        try {
          const response = await fetch(ROUTES.ADMIN_ROUTES.CREATE_CATEGORY, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ADMIN_TOKEN: "sanjeev",
            },
            body: JSON.stringify({
              service_category: values.serviceCategory,
            }),
          });
          console.log(response, "responesfhgdnanvsdf");
          onUpdateProvider();
          showToast("Category add successfully", "success");
          console.log("Name updated successfully");
        } catch (error: any) {
          showToast(error.message, "error");
          console.error("Error updating name:", error.message);
        }
      }}
    >
      {({ errors }) => {
        return (
          <Form>
            <Field
              name="serviceCategory"
              type="text"
              as={TextField}
              fullWidth
              variant="outlined"
              margin="normal"
              label="Service Category"
              color={errors.serviceCategory ? "warning" : "primary"}
              helperText={errors.serviceCategory}
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
                Add Category
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

export default CategoryInputField;
