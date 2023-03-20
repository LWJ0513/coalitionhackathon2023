import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import LoginButton from "components/login/LoginButton";

const Login = (): JSX.Element => {
  return (
    <CssVarsProvider>
      <main
        style={{
          height: "92%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          sx={{
            width: 300,
            height: 200,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div style={{ height: 150 }}>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <LoginButton />
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Login;
