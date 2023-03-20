import instance from "./api";

const userUrl = (path = "") => {
  return `/user${path}`;
};

const UserService = {
  getMyUserId: async () => await instance.get(userUrl(`/me`)),
};

export default UserService;
