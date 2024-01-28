// ServiceInputField.tsx
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Stack, MenuItem, Box } from "@mui/material";
import ROUTES from "../routes/Rout";

import { showToast } from "../toaster/Toaster";

interface ServiceInputFieldProps {
  handleCloseModal: () => void;
  onFormSubmit: (data: any) => void;
  onUpdateProvider: any;
}

const ServiceInputField: React.FC<ServiceInputFieldProps> = ({
  handleCloseModal,
  onFormSubmit,
  onUpdateProvider,
}) => {
  const [first, setfirst] = useState<any>();

  const initialValues = {
    serviceName: "",
    serviceType: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ROUTES.ADMIN_ROUTES.GET_CATEGORIES, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ADMIN_TOKEN: "sanjeev",
          },
        });

        const data = await response.json();

        setfirst(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object({
    serviceName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Service Name is required"),

    serviceType: Yup.string().required("Service Type is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);

          console.log(values, "valuese");

          try {
            setSubmitting(false);

            const response = fetch(ROUTES.ADMIN_ROUTES.CREATE_SERVICE, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ADMIN_TOKEN: "sanjeev",
              },
              body: JSON.stringify({
                service_name: values.serviceName,
                service_category_id: `${values.serviceType}`,
              }),
            });
            onUpdateProvider();
            showToast("Service Add successfully", "success");
            console.log("Name updated successfully");
          } catch (error: any) {
            showToast(error.message, "error");
            console.error("Error updating name:", error.message);
          }
        }}
      >
        {({ errors, handleChange, values }) => {
          return (
            <Form>
              <Field
                name="serviceName"
                type="text"
                as={TextField}
                fullWidth
                variant="outlined"
                margin="normal"
                label="Service Name"
                color={errors.serviceName ? "warning" : "primary"}
                helperText={errors.serviceName}
                FormHelperTextProps={{ sx: { color: "red" } }}
              />
              <Box sx={{ marginTop: "10px" }}>
                <TextField
                  id="outlined-select-currency"
                  name="serviceType"
                  select
                  label="Service Category"
                  fullWidth
                  defaultValue="Select Category"
                  helperText={errors.serviceType}
                  variant="outlined"
                  color={errors.serviceType ? "warning" : "primary"}
                  FormHelperTextProps={{ sx: { color: "red" } }}
                  value={values.serviceType}
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                >
                  {first?.category?.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.service_category}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

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
                  Add Service
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
    </>
  );
};

export default ServiceInputField;
