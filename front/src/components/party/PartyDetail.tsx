import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/joy";
import { Divider } from "@mui/material";
import PersonCounter from "./PersonCounter";
import TimeCounter from "./TimeCounter";
import { Button } from "@mui/material";
import { IconButton } from "@mui/joy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PartyService from "api/PartyService";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "components/common/Loading";

// TODO : type을 관리하는 파일에 모아서 관리하기 + naming
export type PartyDetailInfo = {
  id: number;
  title: string;
  content: string;
  category: string;
  max: number;
  current: number;
  due_date: Date;
  create_at: Date;
  writer: string;
  participator: string[];
  status: boolean;
};

const PartyDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const id: number = parseInt(location.pathname.split("/")[2]);
  const intraId = useSelector((state: any) => state.intraId);

  const [detail, setDetail] = useState<PartyDetailInfo>({
    id: 0,
    title: "",
    content: "",
    category: "",
    max: 0,
    current: 0,
    due_date: new Date(),
    create_at: new Date(),
    writer: "",
    participator: [],
    status: true,
  });
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isWriter, setIsWriter] = useState<boolean>(false);

  const getPartyDetail = async () => {
    const response = await PartyService.getPartyDetail(id); // 없는 페이지일 경우 404를 받도록?
    setDetail({
      ...response.data,
      due_date: new Date(response.data.due_date),
      create_at: new Date(response.data.create_at),
    });
    if (intraId === response.data.writer) setIsWriter(true);
    else setIsWriter(false);
    for (const index in response.data.participator) {
      if (response.data.participator[index] === intraId)
        return setIsCheck(true);
    }
    return setIsCheck(false);
  };

  // async화 하기
  useEffect(() => {
    getPartyDetail();
  }, [isCheck]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <IconButton
          variant="plain"
          onClick={() => {
            navigate("/");
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      {detail.writer === "" ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "80%",
            height: "100%",
          }}
        >
          <Typography sx={{ fontSize: "30px", marginY: 3 }}>
            {detail.title}
          </Typography>
          <PersonCounter current={detail.current} max={detail.max} />
          <TimeCounter dueDate={detail.due_date} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <AccountCircleIcon />
            <Typography
              level="body2"
              sx={{ fontWeight: "md", color: "text.secondary" }}
            >
              {detail.writer}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <GroupsIcon />
            <Typography
              level="body2"
              sx={{ fontWeight: "md", color: "text.secondary" }}
            >
              {detail.participator.map((item) => item + " ")}
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box sx={{ marginY: 1, height: "30%" }}>
            <Typography sx={{ fontSize: "20px" }}>{detail.content}</Typography>
          </Box>
          {isCheck ? (
            <Button
              variant="contained"
              color="error"
              disabled={isWriter}
              onClick={async () => {
                const response =
                  await PartyService.cancelParticipatePartyDetail(id);
                setIsCheck(false);
              }}
            >
              참여 취소할래요
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={isWriter}
              onClick={async () => {
                const response = await PartyService.participatePartyDetail(id);
                setIsCheck(true);
              }}
            >
              참여할래요
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default PartyDetail;
