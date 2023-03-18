import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Box } from "@mui/material";
import Slider from "@mui/joy/Slider";
import { Typography } from "@mui/joy";

type HandleState = {
  state: number | Dayjs | string | null;
  setState: Function;
  type: string;
};

const ModalInput = (props: HandleState) => {
  const marks = [];
  for (let i = 2; i <= 10; i++) marks.push({ value: i, label: `${i}` });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Typography sx={{ display: "flex", alignItems: "center" }}>
        {props.type === "maxCount" ? "모집 인원" : ""}
        {props.type === "dueDate" ? "모집 마감" : ""}
        {props.type === "category" ? "카테고리" : ""}
      </Typography>
      <Box style={{ width: 300, margin: "0 auto" }}>
        {props.type === "maxCount" ? (
          <Slider
            aria-label="Small steps"
            defaultValue={2}
            marks={marks}
            step={1}
            min={2}
            max={10}
            valueLabelDisplay="auto"
            onChange={(e) => {
              if (e) {
                const target = e.target as HTMLInputElement;
                props.setState(target.value);
              }
            }}
          />
        ) : (
          ""
        )}
        {props.type === "category" ? (
          <Select
            placeholder="카테고리를 선택하세요"
            onChange={(e) => {
              if (e) {
                const target = e.target as HTMLInputElement;
                props.setState(target.outerText);
              }
            }}
          >
            <Option value="스터디">스터디</Option>
            <Option value="배달">배달</Option>
            <Option value="컨퍼런스">컨퍼런스</Option>
            <Option value="탁구">탁구</Option>
            <Option value="게임">게임</Option>
            <Option value="봉사">봉사</Option>
            <Option value="기타">기타</Option>
          </Select>
        ) : (
          ""
        )}
        {props.type === "dueDate" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                value={props.state}
                onChange={(newValue) => {
                  props.setState(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ModalInput;