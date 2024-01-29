import { Box, Stack } from "@mui/material";
import Found from "../notFound/Images/Found.png";

const DataNotFound = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
      >
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <img style={{ height: "200px" }} src={Found} />
          </div>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "50px",
              fontFamily: "fangsong",
              marginTop: "20px",
              color: " #5c5b5b",
            }}
          >
            Oops!
          </span>

          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "50px",
              fontFamily: "fangsong",
              marginTop: "20px",
              color: " #5c5b5b",
            }}
          >
            Data not found !
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default DataNotFound;
