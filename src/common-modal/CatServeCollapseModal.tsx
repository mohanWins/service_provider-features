import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  TextField,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ROUTES from "../routes/Rout";
import { showToast } from "../toaster/Toaster";

interface FormValues {
  name: string;
  email: string;
}

interface FormProps {
  open: boolean;
  onClose: () => void;
  onUpdateProvider: () => void;
  providerValue: any;
  modalText: any;
}

const CatServCollapseModal: React.FC<FormProps> = ({
  open,
  onClose,
  providerValue,
  onUpdateProvider,
  modalText,
}) => {
  const formik = useFormik({
    initialValues: {
      name: providerValue ? providerValue.name : "",
    } as FormValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      onClose();

      try {
        const response = await fetch(ROUTES.ADMIN_ROUTES.EDIT_CATEGORY, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ADMIN_TOKEN: "sanjeev",
          },
          body: JSON.stringify({
            service_category: values.name,
            id: `${providerValue.id}`,
          }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to update name: ${response.status}`);
        } else {
          onUpdateProvider();
          showToast("Category updated successfully", "success");
        }

        console.log("Name updated successfully");
        onClose();
      } catch (error: any) {
        showToast(error.message, "error");
        console.error("Error updating name:", error.message);
      }
    },
  });

  return (
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
              sx={{ paddingBottom: "10px", color: "#575656", fontSize: "25px" }}
            >
              {modalText}
            </Typography>

            <Divider />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              defaultValue={providerValue.service_category}
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
  );
};

export default CatServCollapseModal;
