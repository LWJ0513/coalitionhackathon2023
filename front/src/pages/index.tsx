import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import qs from "query-string";
import Loading from "components/common/Loading";
import instance from "api/api";
import "styles/index.scss";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const params: qs.ParsedQuery<string> = qs.parse(window.location.search);

  const getAccessToken = async () => {
    if (Object.keys(params).length !== 0) {
      if (typeof params.token === "string")
        localStorage.setItem("accessToken", params.token);
      else throw new Error("Value must be a string");
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${params.token}`;
    }
    navigate("/party");
  };

  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <div className="redirect-container">
      <div className="redirect-box">
        <Loading />
        <h3>로그인 중입니다...</h3>
      </div>
    </div>
  );
};

export default Home;
