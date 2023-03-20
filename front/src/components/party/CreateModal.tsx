import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import { Typography } from "@mui/joy";
import { Button } from "@mui/material";
import ModalInput from "./ModalInput";
import PartyService from "api/PartyService";
import { useNavigate } from "react-router-dom";

type HandleIsOpen = { isOpen: boolean; setIsOpen: Function };
export type PartyForm = {
  title: string | null;
  content: string | null;
  max: number | null;
  due_date: Dayjs | null;
  category: string | null;
};

const CreateModal = (props: HandleIsOpen): JSX.Element => {
  const navigate = useNavigate();
  const [partyForm, setPartyForm] = useState<PartyForm>({
    title: "",
    content: "",
    max: 2,
    due_date: dayjs(new Date()),
    category: "",
  });
  const createParty = async () => {
    if (partyForm.title === "") return alert("제목을 입력해주세요!");
    if (partyForm.content === "") return alert("내용을 입력해주세요!");
    if (!partyForm.due_date || partyForm.due_date < dayjs(new Date()))
      return alert("현재 이후의 날짜를 선택해주세요!");
    if (partyForm.category === "") return alert("카테고리를 선택해주세요!");
    const newPartyForm = {
      ...partyForm,
      due_date: partyForm.due_date.format("YYYY-MM-DDTHH:mm:ss.000"),
    };

    const response = await PartyService.createParty(newPartyForm);
    navigate(`/party/${response.data.id}`);
  };

  return (
    <Modal
      open={!!props.isOpen}
      onClose={() => props.setIsOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalDialog
        aria-labelledby="layout-modal-title"
        aria-describedby="layout-modal-description"
        layout="fullscreen"
        sx={{
          height: "700px",
          width: "450px",
          margin: "0 auto",
          gap: 2,
        }}
      >
        <ModalClose />
        <Typography id="layout-modal-title" component="h2">
          모임 추가
        </Typography>
        <Divider />
        <TextField
          placeholder="제목"
          onChange={(e) => {
            if (e) {
              const target = e.target as HTMLInputElement;
              setPartyForm({ ...partyForm, title: target.value });
            }
          }}
        />
        <TextField
          placeholder="내용을 작성해주세요"
          multiline
          rows={5}
          onChange={(e) => {
            if (e) {
              const target = e.target as HTMLInputElement;
              setPartyForm({ ...partyForm, content: target.value });
            }
          }}
        />
        <ModalInput
          partyForm={partyForm}
          setPartyForm={setPartyForm}
          type="max"
        />
        <ModalInput
          partyForm={partyForm}
          setPartyForm={setPartyForm}
          type="due_date"
        />
        <ModalInput
          partyForm={partyForm}
          setPartyForm={setPartyForm}
          type="category"
        />
        <Button variant="contained" onClick={createParty} sx={{ marginTop: 5 }}>
          생성
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default CreateModal;
