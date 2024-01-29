import { Box, Stack } from "@mui/material";
import error from "../notFound/Images/error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Stack sx={{ display: "flex", justifyContent: "center" }}>
          <div>
            {" "}
            <img src={error} />
          </div>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
              fontFamily: "sans-serif",
              marginTop: "20px",
              color: " #5c5b5b",
            }}
          >
            Oops !
          </span>

          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "40px",
              fontFamily: "sans-serif",
              marginTop: "10px",
              color: " #5c5b5b",
            }}
          >
            Something went wrong !
          </span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              fontFamily: "sans-serif",
              marginTop: "20px",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              {" "}
              Back to home
            </Link>
          </span>
        </Stack>
      </Box>
    </>
  );
};

export default NotFound;
