import instance from "./api";

const partyUrl = (path = "") => {
  return `/party${path}`;
};

const PartyService = {
  getPartyList: async () =>
    await instance.get(partyUrl(``), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }),
  createParty: async (body: any) =>
    await instance.post(partyUrl(`/create`), body),
  getPartyDetail: async (id: number) => await instance.get(partyUrl(`/${id}`)),
  editPartyDetail: async (id: number, body: any) =>
    await instance.post(partyUrl(`/${id}/edit`), body),
  deletePartyDetail: async (id: number) =>
    await instance.get(partyUrl(`/${id}/delete`)),
  participatePartyDetail: async (id: number) =>
    await instance.get(partyUrl(`/${id}/participate`)),
  cancelParticipatePartyDetail: async (id: number) =>
    await instance.get(partyUrl(`/${id}/participate/cancel`)),
};

export default PartyService;
