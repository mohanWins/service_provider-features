import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "../components/toaster/Toaster";

import {
  Button,
  Dialog,
  TextField,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ROUTES from "../api/endpoints/endPoint";

interface FormValues {
  name: string;
  email: string;
}

interface FormProps {
  open: boolean;
  onClose: () => void;
  onUpdateProvider: () => void;
  providerValue: any;
  modalText: string;
}

const CollapseModal: React.FC<FormProps> = ({
  open,
  onClose,
  providerValue,
  onUpdateProvider,
  modalText,
}) => {
  // const notify = () => toast("Wow so easy!");
  console.log(providerValue, "providerValue");
  const formik = useFormik({
    initialValues: {
      name: providerValue ? providerValue.name : "",
      email: providerValue ? providerValue.email : "",
    } as FormValues,
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Name is required"),
    //   email: Yup.string()
    //     .email("Invalid email address")
    //     .required("Email is required"),
    // }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(ROUTES.ADMIN_ROUTES.EDIT_PROVIDER, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ADMIN_TOKEN: "sanjeev",
          },
          body: JSON.stringify({
            id: providerValue.id.toString(),
            provider_name: values.name,
            email_list: values.email,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update name: ${response.status}`);
        } else {
          onUpdateProvider();
          showToast("Provider updated successfully", "success");
        }

        console.log("Name updated successfully");
        onClose();
      } catch (error: any) {
        console.error("Error updating name:", error.message);
        showToast(error.message, "error");
      }

      onClose();
    },
  });

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box
          sx={{
            width: 564,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                marginTop: "15px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  paddingBottom: "10px",
                  color: "#575656",
                  fontSize: "25px",
                }}
              >
                {modalText}
              </Typography>

              <Divider />
              <TextField
                size="medium"
                label="Name"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                defaultValue={providerValue.provider_name}
              />
              <TextField
                size="medium"
                label="Email"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                defaultValue={providerValue.email_list}
                multiline
              />

              <Stack
                spacing={2}
                direction="row-reverse"
                sx={{ paddingTop: "20px", paddingBottom: "15px" }}
              >
                <Button variant="outlined" size="small" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" size="small" type="submit">
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default CollapseModal;
