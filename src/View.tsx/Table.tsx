import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GreenStatus from "../status-color/GreenStatus";
import RedStatus from "../status-color/RedStatus";
import YellowStatus from "../status-color/YellowStatus";
import "./Table.css";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ROUTES from "../routes/Rout";
import { useParams } from "react-router-dom";
import ProviderModalContent from "../common-modal/Model";
import { showToast } from "../toaster/Toaster";

export default function AccessibleTable() {
  const [providers, setProviders] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    txt: "",
    data: {},
    status: "",
    notes: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const { id } = useParams();

  console.log(id, "pro");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          ROUTES.PROVIDER_ROUTES.PROVIDER_DASHBOARD + id,

          {
            headers: {
              ADMIN_TOKEN: "sanjeev",
            },
          }
        );
        const data = await response.json();

        const data1 = modifyProvider(data.providers);

        setProviders(data1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isUpdated]);
  console.log(providers, "providers");

  const handleAddButtonClick = (
    actionText: string,
    svcId: number,
    catId: number,
    status: any,
    notes: any
  ) => {
    setModalText({
      txt: actionText,
      data: {
        svcId,
        catId,
      },
      status: status,
      notes: notes,
    });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function modifyProvider(data: any) {
    if (!data.length) {
      return;
    }

    const provider = data[0].provider;

    const duplicatedServiceCategories: any[] = [];
    const servicesArr: any[] = [];
    console.log(provider, "duplicatedServiceCategories");
    data.forEach((svc: any) => {
      svc.service.serviceCategory.is_enabled = svc.is_enabled;
      svc.service.service_notes = svc.notes;
      duplicatedServiceCategories.push(svc.service.serviceCategory);

      const eachSvc = { ...svc.service };
      delete eachSvc.serviceCategory;
      eachSvc.status = svc.status;
      eachSvc.is_enabled = svc.is_enabled;
      console.log(data, "poiuy");
      servicesArr.push(eachSvc);
    });

    const setOfUniqueIds = new Set();
    const uniqueCategories: any[] = [];
    duplicatedServiceCategories.forEach((cat) => {
      const key = cat.id;

      if (!setOfUniqueIds.has(key)) {
        setOfUniqueIds.add(key);
        cat.services = servicesArr.filter(
          (s) => s.service_category_id === cat.id
        );
        uniqueCategories.push(cat);
      }
    });

    return {
      ...provider,
      categories: uniqueCategories,
    };
  }

  async function handleSubmit(values: any) {
    try {
      const response = await fetch(
        ROUTES.PROVIDER_ROUTES.EDIT_PROVIDER_SERVICE,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            ADMIN_TOKEN: "sanjeev",
          },
          body: JSON.stringify({
            provider_id: providers.id?.toString(),
            service_id: (modalText.data as any).svcId?.toString(),
            status: values.status,
            notes: values.notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update name: ${response.status}`);
      } else {
        console.log(`Error updating name: ${response.status}`);
        setIsUpdated((p) => !p);
        showToast("Status update successfully", "success");
      }

      console.log("Name updated successfully");
    } catch (error: any) {
      console.error("Error updating name:", error.message);
      showToast(error.message, "error");
    }
  }
  return (
    <TableContainer
      component={Paper}
      style={{
        maxWidth: "100%",
        maxHeight: 750,
        border: " 2px solid rgb(224 224 224 / 82%)",
        boxShadow: "2px 7px 5px rgb(224 224 224 / 82%)",
        borderRadius: "10px",
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader
        className="table"
        aria-label="simple table"
        style={{
          tableLayout: "fixed",
          boxShadow: "5px 2px 5px rgb(224 224 224 / 82%)",
        }}
      >
        <TableHead>
          <TableRow>
            <Box
              component={TableCell}
              className="borderTable"
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                boxShadow: "5px 2px 5px rgb(224 224 224 / 82%)",
                color: " #575656",
              }}
              align="left"
            >
              {providers?.provider_name}
            </Box>
            <Box
              component={TableCell}
              className="borderTable"
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                boxShadow: "5px 2px 5px rgb(224 224 224 / 82%)",
                color: " #575656",
              }}
              align="left"
            >
              Status
            </Box>
            <Box
              component={TableCell}
              className="borderTable"
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                boxShadow: "5px 2px 5px rgb(224 224 224 / 82%)",
                color: " #575656",
              }}
              align="left"
            >
              Notes
            </Box>
          </TableRow>
        </TableHead>

        <TableBody>
          {providers?.categories.map((row: any) => (
            <>
              <TableRow
                sx={{
                  border: 1,
                }}
                key={row?.service_category}
              >
                <TableCell className="table-background" sx={{ ml: 2 }}>
                  {row?.service_category}
                </TableCell>
                <TableCell
                  className="table-background"
                  sx={{ ml: 2 }}
                ></TableCell>
                <TableCell
                  className="table-background"
                  sx={{ ml: 2 }}
                ></TableCell>
              </TableRow>

              {row?.services?.map((x: any) => (
                <TableRow
                  sx={{
                    border: 1,
                  }}
                  key={x?.id}
                >
                  <TableCell sx={{ ml: 2 }}>{x?.service_name}</TableCell>

                  <TableCell
                    onClick={() =>
                      handleAddButtonClick(
                        "Edit status",
                        x.id,
                        row.id,
                        x.status,
                        x?.service_notes
                      )
                    }
                  >
                    {x?.status.toLowerCase() === "active" ? (
                      <GreenStatus />
                    ) : x?.status.toLowerCase() === "inactive" ? (
                      <RedStatus />
                    ) : (
                      <YellowStatus />
                    )}
                  </TableCell>
                  <TableCell>{x?.service_notes}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>

      <Stack
        spacing={2}
        direction="row"
        justifyContent="right"
        sx={{ p: 4 }}
      ></Stack>

      <ProviderModalContent
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        text={modalText.txt}
        onUpdateProvider={handleSubmit}
        modalText={modalText}
        proServeId={undefined}
        uniqueCode={undefined}
      />
    </TableContainer>
  );
}
