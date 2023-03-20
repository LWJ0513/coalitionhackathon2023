import Typography from "@mui/joy/Typography";
import Person from "@mui/icons-material/Person";

type NumberOfPerson = { current: number; max: number };

const PersonCounter = (num: NumberOfPerson) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <Person fontSize="small" />
      <Typography
        level="body3"
        sx={{ fontWeight: "md", color: "text.secondary" }}
      >
        {num.current} / {num.max}
      </Typography>
    </div>
  );
};

export default PersonCounter;
