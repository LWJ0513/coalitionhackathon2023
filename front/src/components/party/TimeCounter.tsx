import Typography from "@mui/joy/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import format from "date-fns/format";

type DueDate = { dueDate: Date };

const TimeCounter = (date: DueDate) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <AccessTimeIcon fontSize="small" />
      <Typography
        level="body3"
        sx={{ fontWeight: "md", color: "text.secondary" }}
      >
        ~ {format(date.dueDate, "MM-dd eee HH:mm")}
      </Typography>
    </div>
  );
};

export default TimeCounter;
