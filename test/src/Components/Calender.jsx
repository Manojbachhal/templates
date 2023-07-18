import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function Calender() {
  const [value, onChange] = useState(new Date());

  return (
    <Box className="" borderWidth="1px" p={2} borderRadius="lg">
      <Text
        align={"center"}
        as={"h1"}
        // bg={'linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)'}
        bgImage={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
        // color={"white"}
        textAlign={"left"}
        bgClip="text"
        color={"transparent"}
        fontSize={"30px"}
        fontWeight={"bold"}
        p={4}
      >
        Calender
      </Text>
      <Calendar onChange={onChange} value={value} className="no-underline" />
    </Box>
  );
}

export default Calender;
