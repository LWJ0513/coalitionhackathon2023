import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "styles/common.scss";

const Loading: React.FC = () => (
  <Box>
    <CircularProgress size="50px" />
  </Box>
);

export default Loading;
