import axios from "axios";

const apiURL =
  "http://42gether-env.eba-vuhv3mur.ap-northeast-2.elasticbeanstalk.com";

const instance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    } else if (error.response.status === 403) {
      alert("설정 권한이 없습니다.");
    } else if (error.response.status === 404) {
      // 백엔드에서 404 에러를 띄워주고, page not found HTML 까지 응답으로 보내주는 방법이 있음
      alert("존재하지 않는 페이지입니다.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
