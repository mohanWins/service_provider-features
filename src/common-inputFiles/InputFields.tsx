import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import ServiceInputField from "./ServiceInputField";
import CategoryInputField from "./Category";
import RecordInputField from "./Record";
import StatusInputField from "./StustusInputField";
import ProviderInputField from "./Provider";
import ROUTES from "../routes/Rout";
import ProviderStatusInputField from "./ProviderStatusInputField";
import { showToast } from "../toaster/Toaster";

interface CommonInputFieldProps {
  id: string;
  label: string;
  multiline?: boolean;
  maxRows?: number;
  text?: string;
  handleCloseModal: () => void;
  onFormSubmit: (data: any) => void;
  onUpdateProvider: (data?: any) => void;
  modalText: any;
  proServeId: any;
  uniqueCode: any;
  statusProId: any;
  serviceId?: any;
}

const CommonInputField: React.FC<CommonInputFieldProps> = ({
  text,
  handleCloseModal,
  onFormSubmit,
  onUpdateProvider,
  modalText,
  proServeId,
  uniqueCode,
  statusProId,
  serviceId,
}) => {
  const initialValues = {
    providerName: "",
    emailList: "",
  };
  console.log(proServeId, "serviceIdllllll");
  const validationSchema = Yup.object({
    providerName: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Service Name is required"),
    emailList: Yup.string()
      .email("Invalid email address")
      .required("Email List is required"),
  });

  const [data, setData] = useState<any[]>([]);
  const [emailList, setEmailList] = useState<any[]>([]);
  const [inputData, setInputData] = useState<any>("");
  const [viewChips, setViewChips] = useState(false);

  useEffect(() => {
    setEmailList([data.map((e: any) => e.emailList)]);
  }, [data]);

  function handleMultipleEmail(value: any, errors: any) {
    const newId = inputData && data.length + 1;
    if (value !== "" && !errors) {
      setData([...data, { id: newId, emailList: value }]);
      setInputData("");
    }
    setViewChips(true);
  }

  function handleDelete(value: any) {
    setData((chips) => chips.filter((chip) => chip.id !== value.id));
  }

  return (
    <Box sx={{ marginTop: "15px", paddingLeft: "20px", paddingRight: "20px" }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{ paddingBottom: "10px", color: "#575656", fontSize: "25px" }}
      >
        {text}
      </Typography>

      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          try {
            const response = fetch(ROUTES.ADMIN_ROUTES.CREATE_PROVIDER, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ADMIN_TOKEN: "sanjeev",
              },
              body: JSON.stringify({
                email_list: emailList.join(),
                provider_name: values.providerName,
              }),
            });
            console.log(response);
            onUpdateProvider();
            showToast("Provider add successfully", "success");
          } catch (error: any) {
            showToast(error.message, "error");
          }

          setSubmitting(false);
          handleCloseModal();
        }}
      >
        {({ errors, handleChange }) => {
          switch (text) {
            case "Service":
              return (
                <>
                  <ServiceInputField
                    handleCloseModal={handleCloseModal}
                    onFormSubmit={onFormSubmit}
                    onUpdateProvider={onUpdateProvider}
                  />
                </>
              );
            case "Provider":
              return (
                <ProviderInputField
                  inputData={inputData}
                  setInputData={setInputData}
                  handleMultipleEmail={handleMultipleEmail}
                  data={data}
                  viewChips={viewChips}
                  handleDelete={handleDelete}
                  errors={errors}
                  handleChange={handleChange}
                  handleCloseModal={handleCloseModal}
                  onUpdateProvider={onUpdateProvider}
                />
              );
            case "Category":
              return (
                <CategoryInputField
                  handleCloseModal={handleCloseModal}
                  onFormSubmit={onFormSubmit}
                  onUpdateProvider={onUpdateProvider}
                />
              );

            case "Status":
              return (
                <StatusInputField
                  handleCloseModal={handleCloseModal}
                  proServeId={proServeId}
                  uniqueCode={uniqueCode}
                  serviceId={serviceId}
                />
              );
            case "Record":
              return (
                <RecordInputField
                  handleCloseModal={handleCloseModal}
                  onFormSubmit={onFormSubmit}
                  onUpdateProvider={onUpdateProvider}
                  proServeId={proServeId}
                  statusProId={statusProId}
                  serviceId={serviceId}
                />
              );
            case "Edit status":
              return (
                <>
                  <ProviderStatusInputField
                    handleCloseModal={handleCloseModal}
                    onFormSubmit={onFormSubmit}
                    onUpdateProvider={onUpdateProvider}
                    modalText={modalText}
                  />
                </>
              );

            default:
              return null;
          }
        }}
      </Formik>
    </Box>
  );
};

export default CommonInputField;
