import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

interface ChipData {
  id: number;
  emailList: string;
  data?: any[];
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(data: any) {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([]);

  useEffect(() => {
    const chips = data.data;
    setChipData(chips);
  }, [data]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData?.map((data) => {
        return (
          <ListItem key={data.id}>
            <Chip label={data.emailList} onDelete={handleDelete(data)} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
