import { useEffect, useState } from "react";
import PartyCard from "components/party/PartyCard";
import CreateModal from "components/party/CreateModal";
import Stack from "@mui/joy/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/joy";
import { IconButton } from "@mui/joy";
import PartyService from "api/PartyService";
import Loading from "components/common/Loading";

export type PartyInfo = {
  id: number;
  title: string;
  category: string;
  max: number;
  current: number;
  due_date: Date;
  create_at: Date;
  writer: string;
  status: boolean;
};

const Party = (): JSX.Element => {
  const [list, setList] = useState<PartyInfo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getPartyList = async () => {
    const response = await PartyService.getPartyList();
    setList(
      response.data.map((item: any) => ({
        ...item,
        due_date: new Date(item.due_date),
        create_at: new Date(item.create_at),
      }))
    );
  };

  useEffect(() => {
    getPartyList();
  }, [list]);

  return (
    <Box sx={{ height: "100%", width: "90%" }}>
      <Stack sx={{ overflow: "auto", px: 1, height: "90%" }}>
        {list.map((item, index) => (
          <PartyCard key={index} party={item} />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          aria-label="delete"
          variant="plain"
          sx={{}}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>
      <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};

export default Party;
