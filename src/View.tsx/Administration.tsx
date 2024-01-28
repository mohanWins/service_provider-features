import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import { Box } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProviderModalContent from "../common-modal/Model";
import GreenStatus from "../status-color/GreenStatus";
import RedStatus from "../status-color/RedStatus";
import YellowStatus from "../status-color/YellowStatus";
import "./Table.css";
import ROUTES from "../routes/Rout";

export default function CatServ() {
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [proServeId, setProServId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ROUTES.PUBLIC_ROUTES.PUBLIC_DASHBOARD);
        const data = await response.json();

        setCategories(data.categories);
        setProviders(data.providers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCellBackgroundColor = (value: any) => {
    return value ? "rgb(246 255 237)" : "white";
  };
  const handleAddButtonClick = (
    actionText: string,
    uniqueCode: any,
    proServId: any,
    serviceId: any
  ) => {
    console.log(proServId, " proServIdkk");
    setModalText(actionText);
    setIsModalOpen(true);
    setProServId(proServId);
    setUniqueCode(uniqueCode);
    setServiceId(serviceId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
                <TableCell className="test" align="right" key={x?.name}>
                  {x?.provider_name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row: any) => {
              console.log(row, "fgdnfmhgvhgch");
              return (
                <>
                  <TableRow
                    className="AdminstrationTable-background"
                    key={row?.name}
                  >
                    <TableCell className="sticky" component="th" scope="row">
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
                    console.log(x, "servicemap");
                    return (
                      <TableRow key={x?.id}>
                        <TableCell className="sticky">
                          <span style={{ marginLeft: "8px" }}>
                            {x?.service_name}
                          </span>
                        </TableCell>
                        {providers.map((ele: any) => {
                          // const se = ele.providerServices.map(
                          //   (pro: any) => pro.id
                          // );

                          const service = ele.providerServices?.find(
                            (serve: any) => serve.service_id === x.id
                          );
                          console.log(service, "vdhdmvns");
                          if (!service) {
                            return <TableCell></TableCell>;
                          }
                          const status =
                            service.status.toLowerCase() === "active" ? (
                              <GreenStatus />
                            ) : service.status.toLowerCase() === "inactive" ? (
                              <RedStatus />
                            ) : (
                              <YellowStatus />
                            );
                          return (
                            <TableCell
                              style={{
                                cursor: "pointer",

                                backgroundColor:
                                  getCellBackgroundColor(service),
                              }}
                              onClick={() =>
                                handleAddButtonClick(
                                  "Status",
                                  ele.unique_code,

                                  service.id,
                                  service?.service_id
                                )
                              }
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {" "}
                                {status}
                              </Box>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </>
              );
            })}
          </TableBody>
        </Table>

        <ProviderModalContent
          isOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          text={modalText}
          onUpdateProvider={() => {}}
          proServeId={proServeId}
          uniqueCode={uniqueCode}
          serviceId={serviceId}
        />
      </TableContainer>
    </>
  );
}
