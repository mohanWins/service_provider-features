import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Paper, Stack, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ProviderModalContent from "../common-modal/Model";
import "./Table.css";
import CollapseModal from "../common-modal/ProviderCollapseModal";
import CatServCollapseModal from "../common-modal/CatServeCollapseModal";
import ServiceCollapseModal from "../common-modal/ServicesCollapseModal";
import ROUTES from "../routes/Rout";
import { showToast } from "../toaster/Toaster";

export default function CatServ() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [providerValue, setProviderValue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [open, setOpen] = useState(false);
  const [catServModal, setCatServModal] = useState(false);
  const [ServModal, setServModal] = useState(false);
  const [updateProvider, setUpdateProvider] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setCatServModal(false);
    setServModal(false);
  };

  // const categoryApiUrl = "http://localhost:8000/categories";
  // const providerApiUrl = "http://localhost:8000/providers";

  // const { data: categoriess } = useApiData<Category[]>(categoryApiUrl);

  // console.log(categoriess, "categoriess");
  // const { data: providerss } = useApiData<Provider[]>(providerApiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ROUTES.ADMIN_ROUTES.GET_ADMIN_DASHBOARD,

          {
            headers: {
              ADMIN_TOKEN: "sanjeev",
            },
          }
        );
        const data = await response.json();
        setProviders(data.providers);
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updateProvider]);

  const getCellBackgroundColor = (value: any) => {
    return value ? "rgb(253 255 250 / 78%)" : "white";
  };
  const handleAddButtonClick = (actionText: string) => {
    setModalText(actionText);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckChange = async (
    providerId: any,
    serviceId: any,
    providerServiceId: any,
    state: boolean
  ) => {
    try {
      const response = await fetch(ROUTES.ADMIN_ROUTES.ASSIGN_SERVICE, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          ADMIN_TOKEN: "sanjeev",
        },
        body: JSON.stringify({
          id: providerServiceId?.toString(),
          provider_id: providerId?.toString(),
          service_id: serviceId?.toString(),
          is_enabled: state,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update name: ${response.status}`);
      } else {
        onUpdateProvider();
        showToast("Status updated successfully", "success");
      }
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const getProviderName = (value: any, actionText: string) => {
    setOpen(true);
    setProviderValue(value);
    setModalText(actionText);
  };
  const getCatName = (value: any, actionText: string) => {
    setCatServModal(true);
    setProviderValue(value);
    setModalText(actionText);
  };
  const getServName = (
    value: any,
    id: any,
    service: any,
    modalText: string
  ) => {
    setModalText(modalText);
    setServModal(true);
    setProviderValue({ ...value, categoryId: id, service: service });
  };

  const onUpdateProvider = () => {
    setUpdateProvider(!updateProvider);
  };
  console.log(categories, "categories");
  return (
    <>
      <TableContainer
        style={{
          maxWidth: "100%",
          maxHeight: 750,
          border: " 2px solid rgb(224 224 224 / 82%)",
          boxShadow: "rgba(224, 224, 224, 0.82) 5px 9px 9px",
          borderRadius: "10px",
        }}
      >
        <Table stickyHeader className="table" aria-label="simple table">
          <TableHead sx={{ boxShadow: "5px 2px 5px  #aaaaaa" }}>
            <TableRow sx={{ height: 10 }}>
              <TableCell className="stickyHeader">
                {" "}
                Category/Services{" "}
              </TableCell>
              {providers?.map((x: any) => (
                <Tooltip title="Change provider name">
                  <TableCell
                    onClick={() => {
                      getProviderName(x, "Edit provider");
                    }}
                    className="test"
                    align="right"
                    key={x?.name}
                    sx={{ cursor: "pointer" }}
                  >
                    {x?.provider_name}
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {categories?.map((row: any) => {
              return (
                <>
                  <TableRow
                    className="AdminstrationTable-background"
                    key={row?.name}
                  >
                    <TableCell
                      className="sticky"
                      component="th"
                      scope="row"
                      onClick={() => {
                        getCatName(row, "Update Category");
                      }}
                    >
                      {row?.service_category}
                    </TableCell>
                    {providers?.map(() => (
                      <TableCell
                        sx={{
                          backgroundColor: "rgb(224 224 224 / 82%)",
                        }}
                      />
                    ))}
                  </TableRow>

                  {row?.services.map((x: any) => {
                    return (
                      <TableRow key={x?.id}>
                        <TableCell
                          className="sticky"
                          onClick={() =>
                            getServName(
                              x,
                              row.id,
                              row.services,
                              "Update Service"
                            )
                          }
                        >
                          <span style={{ marginLeft: "8px" }}>
                            {x?.service_name}
                          </span>
                        </TableCell>

                        {providers.map((ele: any) => {
                          const service = ele?.providerServices?.find(
                            (serve: any) => serve?.service_id === x?.id
                          );

                          if (service && service?.is_enabled) {
                            return (
                              <>
                                <TableCell
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: getCellBackgroundColor(
                                      service?.is_enabled
                                    ),
                                  }}
                                  align="center"
                                >
                                  {
                                    <Tooltip title="Turn to inactive">
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                        onClick={() =>
                                          handleCheckChange(
                                            ele.id,
                                            x.id,
                                            service?.id,
                                            false
                                          )
                                        }
                                      >
                                        <CheckIcon color="success" />
                                      </Box>
                                    </Tooltip>
                                  }
                                </TableCell>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <TableCell
                                  onClick={() =>
                                    handleCheckChange(
                                      ele.id,
                                      x.id,
                                      service?.id,
                                      true
                                    )
                                  }
                                >
                                  {" "}
                                  <Tooltip title="Turn to active">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <CheckIcon color="disabled" />
                                    </Box>
                                  </Tooltip>
                                </TableCell>
                              </>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </>
              );
            })}

            {ServModal && (
              <Paper>
                <ServiceCollapseModal
                  providerValue={providerValue}
                  open={ServModal}
                  onClose={handleClose}
                  onUpdateProvider={onUpdateProvider}
                  categories={categories}
                  modalText={modalText}
                  // id={"rmpedgylrn"}
                />
              </Paper>
            )}
            {catServModal && (
              <Paper>
                <CatServCollapseModal
                  providerValue={providerValue}
                  open={catServModal}
                  onClose={handleClose}
                  onUpdateProvider={onUpdateProvider}
                  modalText={modalText}
                />
              </Paper>
            )}
            {open && (
              <Paper>
                <CollapseModal
                  providerValue={providerValue}
                  open={open}
                  onClose={handleClose}
                  onUpdateProvider={onUpdateProvider}
                  modalText={modalText}
                />
              </Paper>
            )}
          </TableBody>
        </Table>

        <Stack
          spacing={2}
          direction="row"
          sx={{ p: 5 }}
          className="Button-footer"
        >
          <Button
            sx={{ width: "181px", height: "40px" }}
            variant="contained"
            onClick={() => handleAddButtonClick("Provider")}
          >
            Add Provider
          </Button>
          <Button
            sx={{ width: "170px", height: "40px" }}
            variant="contained"
            onClick={() => handleAddButtonClick("Category")}
          >
            Add Category
          </Button>
          <Button
            sx={{ width: "170px", height: "40px" }}
            variant="contained"
            onClick={() => handleAddButtonClick("Service")}
          >
            Add Services
          </Button>
        </Stack>

        <ProviderModalContent
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          text={modalText}
          onUpdateProvider={onUpdateProvider}
          proServeId
          uniqueCode
        />
      </TableContainer>
    </>
  );
}
