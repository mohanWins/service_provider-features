import React from "react";
import { showToast } from "../toaster/Toaster";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  TextField,
  Box,
  Stack,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import ROUTES from "../routes/Rout";
import { useParams } from "react-router-dom";

interface FormValues {
  serviceType: unknown;
  name: string;
  email: string;
}

interface FormProps {
  open: boolean;
  onClose: () => void;
  onUpdateProvider: () => void;
  providerValue: any;
  categories: any;
  modalText: string;
}

const ServiceCollapseModal: React.FC<FormProps> = ({
  open,
  onClose,
  providerValue,
  onUpdateProvider,
  categories,
  modalText,
}) => {
  const { id } = useParams();

  console.log(id, "gfzdvdhg");
  console.log(modalText, "Categories");
  const formik = useFormik({
    initialValues: {
      name: providerValue ? providerValue.name : "",
      serviceType: "",
    } as FormValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      const category: any = categories.find(
        (c: any) => c.id === providerValue.categoryId
      );
      const catServices: any[] = [];

      category.services.forEach((serv: any) => {
        if (serv.id === providerValue.id) {
          catServices.push({ name: values.name, id: serv.id });
        } else {
          catServices.push(serv);
        }
      });

      try {
        const response = await fetch(ROUTES.ADMIN_ROUTES.EDIT_SERVICE, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ADMIN_TOKEN: "sanjeev",
          },
          body: JSON.stringify({
            service_name: values.name,
            id: `${providerValue.id}`,
            service_category_id: `${values.serviceType}`,
          }),
        });

        if (!response?.ok) {
          throw new Error(`Failed to update name: ${response.status}`);
        } else {
          showToast("Service updated successfully", "success");
          onUpdateProvider();
          onClose();
        }
      } catch (error: any) {
        console.error("Error updating name:", error.message);
        showToast(error.message, "error");
      }
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
          className="serviceModal"
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
                label="Name"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                defaultValue={providerValue.service_name}
              />
              <Box sx={{ marginTop: "10px" }}>
                <TextField
                  id="outlined-select-currency"
                  name="serviceType"
                  select
                  label="Service Category"
                  fullWidth
                  value={formik.values.serviceType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.serviceType &&
                    Boolean(formik.errors.serviceType)
                  }
                  helperText={
                    formik.touched.serviceType && formik.errors.serviceType
                  }
                  variant="outlined"
                >
                  {categories?.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.service_category}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

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

export default ServiceCollapseModal;
