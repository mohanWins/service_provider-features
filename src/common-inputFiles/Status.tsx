import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RedStatus from "../status-color/RedStatus";
import GreenStatus from "../status-color/GreenStatus";
import YellowStatus from "../status-color/YellowStatus";

import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import ProviderModalContent from "../common-modal/Model";

import ROUTES from "../routes/Rout";

interface StatusInputFieldProps {
  proServeId: any;
  uniqueCode: any;
  serviceId?: any;
}

const Status: React.FC<StatusInputFieldProps> = ({
  proServeId,
  uniqueCode,
  serviceId,
}) => {
  const [status, setStatus] = useState<any>([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  console.log(proServeId, uniqueCode, serviceId, "proServeIdeeeeeeeeeee");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ROUTES.PUBLIC_ROUTES.GET_STATUS_HISTORY +
            uniqueCode +
            "/?service_id=" +
            proServeId?.toString()
        );
        const data = await response.json();
        console.log(data, "proServeIdggggggggg");
        setStatus(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(
    status,

    "dfhhdgdfjs"
  );

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };
  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Refferal = (value: string) => {
    console.log(value, "kkkkkkk");
    setModalText(value);
    setIsModalOpen(true);
  };

  return (
    <>
      <TableContainer sx={{ height: "250px" }}>
        <Table
          sx={{
            minWidth: 650,
            tableLayout: "fixed",
            boxShadow: "5px 2px 5px rgb(224 224 224 / 82%)",
          }}
          stickyHeader
          className="table"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "none", borderRight: "none" }}>
                Date/Time
              </TableCell>
              <TableCell
                sx={{ borderBottom: "none", borderRight: "none" }}
                align="right"
              >
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  {" "}
                  Status
                </Box>
              </TableCell>
              <TableCell
                sx={{ borderBottom: "none", borderRight: "none" }}
                align="right"
              >
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  {" "}
                  Notes
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {status?.slice(0, displayCount).map((row: any) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                {(() => {
                  switch (row.status) {
                    case "success":
                      return (
                        <TableCell>
                          <GreenStatus />
                        </TableCell>
                      );
                    case "failed":
                      return (
                        <TableCell>
                          <RedStatus />
                        </TableCell>
                      );
                    case "Moderate":
                      return (
                        <TableCell>
                          <YellowStatus />
                        </TableCell>
                      );
                    default:
                      return null;
                  }
                })()}
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack>
        <Box>
          <Grid container spacing={2} sx={{ position: "relative" }}>
            {displayCount < status.length ? (
              <>
                <Grid
                  item
                  xs={2}
                  sx={{ position: "absolute", top: "48px", color: "blue" }}
                >
                  <Box
                    onClick={handleShowMore}
                    sx={{ cursor: "pointer", fontSize: "13px" }}
                  >
                    <Button size="small">Show More...</Button>
                  </Box>
                </Grid>
              </>
            ) : (
              <Grid item xs={2} sx={{ position: "absolute", top: "48px" }}>
                <Box sx={{ cursor: "pointer", fontSize: "13px" }}>
                  <Button disabled size="small">
                    Show More...
                  </Button>
                </Box>
              </Grid>
            )}

            <Grid
              item
              xs={5}
              sx={{
                position: "absolute",
                top: "48px",
                left: "160px",
                color: "blue",
              }}
            >
              <Box
                sx={{ cursor: "pointer", fontSize: "13px" }}
                component="span"
                onClick={() => Refferal("Record")}
              >
                <Button size="small"> Record an unsucessfull Refferal</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>

      <ProviderModalContent
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        text={modalText}
        onUpdateProvider={() => {}}
        proServeId={proServeId}
        uniqueCode={uniqueCode}
        statusProId={status?.providers?.id}
        serviceId={serviceId}
      />
    </>
  );
};
export default Status;
