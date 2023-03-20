import { useNavigate } from "react-router-dom";
import { PartyInfo } from "pages/party";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Divider } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import format from "date-fns/format";
import { differenceInHours, differenceInMinutes } from "date-fns";
import PersonCounter from "./PersonCounter";
import TimeCounter from "./TimeCounter";
import { Link } from "react-router-dom";

type PartyProps = {
  party: PartyInfo; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

// flex 사용법
// https://oneroomtable.tistory.com/entry/flex-%EC%86%8D%EC%84%B1-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-%EC%A2%8C%EC%B8%A1-%EC%9A%B0%EC%B8%A1-%EC%A4%91%EC%95%99-%EC%A0%95%EB%A0%AC-%EB%93%B1

// { title }: PartyInfo => PartyInfo 객체에서 title(string) 변수만 가져오겠다
// { party }: PartyProps => wrapper PartyProps 객체에서 party(PartyInfo) 객체를 가져오겠다.
const PartyCard = ({ party }: PartyProps): JSX.Element => {
  const navigate = useNavigate();

  const timer = (createdDate: Date): string => {
    // 서버 시간 차이로 차감
    const diffHours: number = differenceInHours(new Date(), createdDate) - 9;
    const diffMinutes: number =
      differenceInMinutes(new Date(), createdDate) - 9 * 60;
    if (diffHours === 0) return diffMinutes + " minutes ago";
    else if (diffHours < 24) return diffHours + " hours ago";
    else return Math.floor(diffHours / 24) + " days ago";
  };

  return (
    // <Link to={`/party/${party.id}`}>
    <Card
      variant="outlined"
      sx={
        new Date() > party.due_date
          ? { width: 320, marginTop: 1, bgcolor: "#999999" }
          : { width: 320, marginTop: 1, bgcolor: "#ffffff" }
      }
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography level="h1" fontSize="md" sx={{ mb: 0.5 }}>
          {party.title}
        </Typography>
        <Typography level="body2" sx={{ marginLeft: "auto" }}>
          {party.writer}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          alignItems: "center",
          height: "32px",
        }}
      >
        <PersonCounter current={party.current} max={party.max} />
        <Typography sx={{ color: "#aaaaaa" }}>|</Typography>
        <TimeCounter dueDate={party.due_date} />
        {new Date() > party.due_date ? (
          ""
        ) : (
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
            onClick={() => {
              navigate(`/party/${party.id}`);
            }}
          >
            more
          </Button>
        )}
      </Box>
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
        }}
      >
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary" }}
        >
          # {party.category}
        </Typography>
        <Typography
          level="body3"
          sx={{
            fontWeight: "md",
            color: "text.secondary",
            marginLeft: "auto",
          }}
        >
          {timer(party.create_at)}
        </Typography>
      </CardOverflow>
    </Card>
    // </Link>
  );
};

export default PartyCard;
