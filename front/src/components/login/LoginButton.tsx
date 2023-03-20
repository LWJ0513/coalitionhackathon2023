import Button from "@mui/joy/Button";

const LoginButton = (): JSX.Element => {
  // const requestLogin = (): void => {
  //   window.location.href = "http://localhost:8080/oauth2/authorization";
  // };
  const requestLogin = (): void => {
    window.location.href =
      "http://42gether-env.eba-vuhv3mur.ap-northeast-2.elasticbeanstalk.com/oauth2/authorization";
  };

  return (
    <>
      <Button
        onClick={requestLogin}
        sx={{ textTransform: "none", marginTop: 1 }}
      >
        Sign in with 42
      </Button>
    </>
  );
};

export default LoginButton;
