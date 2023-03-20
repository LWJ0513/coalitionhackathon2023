import Loading from "components/common/Loading";

const Logout = () => {
  localStorage.removeItem("accessToken");
  alert("로그아웃 되었습니다.");
  window.location.href = "/login";
  return (
    <div className="redirect-container">
      <div className="redirect-box">
        <Loading />
        <h3>로그아웃 중입니다...</h3>
      </div>
    </div>
  );
};

export default Logout;
