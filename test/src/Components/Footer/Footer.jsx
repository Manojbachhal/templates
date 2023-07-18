import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../assets/new_drdo_logo.png";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { CiInstagram } from "react-icons/ci";
function Footer() {
  return (
    <Box
      bg={"#0A1535"}
      fontSize={"sm"}
      letterSpacing={"1px"}
      color={"white"}
      height={"200px"}
    >
      <Flex
        justify={"space-evenly"}
        borderRadius={"xl"}
        fontWeight={"bold"}
        width={"80%"}
        m={"auto"}
        position={"relative"}
        top={"-50px"}
        bg={"linear-gradient(45deg, #8e44ad, #058eea, #7ab6de)"}
        height={"100px"}
        p={10}
      >
        <Link>Contact Us</Link>
        <Link>Public Grievances</Link>
        <Link>Privacy Policy</Link>
        <Link>Help</Link>
        <Link>Web Information Manager</Link>
      </Flex>
      <Flex justify={"space-evenly"} align={"center"} height={"50px"}>
        <Box w={"10%"} pb={10} pt={10}>
          <Image src={logo} width={"60%"} />
        </Box>
        <Box>
          <Text>
            Copyright © 2023, DRDO, Ministry of Defence, Government of India
          </Text>
        </Box>
        <Flex justify={"space-evenly"} w={"20%"}>
          <CiFacebook size={40} color="blue" />
          <FiTwitter size={40} color="#00ACEE" />

          <CiInstagram size={40} color="red" />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
