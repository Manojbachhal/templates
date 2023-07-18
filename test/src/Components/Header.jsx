import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import logo from "../assets/drdo_logo_0.png";
function Header() {
  const [searchisOpen, setSearchIsOpen] = useState(false);
  return (
    <Box
      //   bg={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
      //   bg={"linear-gradient(45deg, #b004f8, #ff0b8c, #0099ff)"}
      bg={"linear-gradient(45deg, #b004f8, #5189f5, #4caaea)"}
      p={"12px"}
      position="sticky"
      top="-1"
      zIndex="999"
    >
      <Flex justify={"space-between"} align={"center"} paddingBottom={"10px"}>
        <Box marginLeft={"20px"}>
          <img src={logo} alt="" width={"70%"} />
        </Box>
        <Flex
          gap={"25px"}
          fontSize={"18px"}
          align={"center"}
          fontWeight={"600"}
          color={"white"}
          paddingRight={"30px"}
          overflowY={{ base: "auto", md: "auto", lg: "unset" }}
        >
          <Link>Home</Link>
          <Link>DRDO</Link>
          <Link>Oragnisation</Link>
          <Link>Outreach</Link>
          <Link>Career</Link>
          <Link>RTI</Link>
          <Button onClick={() => setSearchIsOpen(!searchisOpen)}>
            {!searchisOpen ? (
              <SearchIcon fontSize={"16px"} marginTop={"3px"} />
            ) : (
              <CloseIcon fontSize={"12px"} />
            )}
          </Button>
        </Flex>
      </Flex>

      <Collapse in={searchisOpen} transition=" 0.3s">
        <InputGroup>
          <InputLeftElement
            className="InputLeft"
            pointerEvents="none"
            children={<SearchIcon className="SearchIcon" color="gray.300" />}
            size="xs"
            ml={"20px"}
          />
          <Input
            className="Input"
            variant="outline"
            color={"white"}
            _placeholder={{ color: "white" }}
            focusBorderColor="white"
            placeholder="Type search keyword"
            border={"2px"}
            borderRadius={"lg"}
            width={"95%"}
            ml={"20px"}
          />
        </InputGroup>
      </Collapse>
    </Box>
  );
}

export default Header;

// background: linear-gradient(45deg, #b004f8, #0beeff, #4caaea);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #eaab4c);
// background: linear-gradient(45deg, #b004f8, #ff0b8c, #ff9900);

// background: linear-gradient(45deg, #FF671F, #f2f2f2, #046A38);
