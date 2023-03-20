import { Routes, Route } from "react-router-dom";
import Home from "pages/index";
import Party from "pages/party";
import PartyDetail from "components/party/PartyDetail";
import Mypage from "pages/mypage";
import Logout from "pages/logout";

const MainRoute = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/party" element={<Party />} />
        <Route path="/party/:no" element={<PartyDetail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default MainRoute;

// const BodyContainer = styled.div`
//   margin-left: 150px;
//   width: calc(100% - 150px);
//   overflow-y: scroll;
// `;
