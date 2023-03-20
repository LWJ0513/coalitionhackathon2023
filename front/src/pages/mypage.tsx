import { Typography } from "@mui/joy";
import { Box, Divider } from "@mui/material";

const Mypage = (): JSX.Element => {
  return (
    <Box
      sx={{
        width: "90%",
        height: "100%",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        overflow: "auto",
        padding: 3,
      }}
    >
      <Typography sx={{ height: "30%" }}>내가 만든 모임</Typography>
      <Divider />
      <Typography sx={{ height: "30%" }}>내가 챰여한 모임</Typography>
    </Box>
  );
};

export default Mypage;
