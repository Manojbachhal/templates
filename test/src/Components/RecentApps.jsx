import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import React from "react";
import { BiTask } from "react-icons/bi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { MdOutlinePoll } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import { BsMic } from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { PiSpeakerHighThin } from "react-icons/pi";
import { LiaHandshakeSolid } from "react-icons/lia";
import { PiApplePodcastsLogoLight } from "react-icons/pi";
import "./RecentApps.css";
function RecentApps() {
  return (
    // "
    <Box bg="linear-gradient(to top, gray,white)" mt={3} py={8} pb={20}>
      <Heading color={"blue.900"} fontSize="3xl" my={6} p={2}>
        RECENT APPS
      </Heading>
      <Flex justify={"space-evenly"}>
        <Box
          className="recent"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"green.100"} className="green300" py={4} px={6}>
            <BiTask size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>DO/TASK</Link>
          </Text>
        </Box>

        {/* Dicuss */}
        <Box
          _hover={{ border: "2px solid blue" }}
          className="dicuss"
          boxSizing="border-box"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"blue.100"} className="blue300" py={4} px={6}>
            <HiOutlineChatBubbleLeftRight size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>DISCUSS</Link>
          </Text>
        </Box>

        {/* survey */}
        <Box
          _hover={{ border: "2px solid teal" }}
          className="survey"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"teal.100"} className="teal300" py={4} px={6}>
            <MdOutlinePoll size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>SURVEY</Link>
          </Text>
        </Box>

        {/* blog */}
        <Box
          _hover={{ border: "2px solid orange" }}
          className="blog"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"orange.100"} className="orange300" py={4} px={6}>
            <BsFillPencilFill size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>BLOG</Link>
          </Text>
        </Box>

        {/* talk */}
        <Box
          _hover={{ border: "2px solid red" }}
          className="talk"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"red.100"} className="red300" py={4} px={6}>
            <BsMic size={40} color="scarlet" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>TALK</Link>
          </Text>
        </Box>

        {/* quiz */}
        <Box
          _hover={{ border: "2px solid red" }}
          className="quiz"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box
            bg={"red.400"}
            className="red600"
            _hover={{ bg: "red.600" }}
            py={4}
            px={6}
          >
            <MdOutlineQuiz size={40} color="red" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>Quiz</Link>
          </Text>
        </Box>

        {/* mg prime */}
        <Box
          _hover={{ border: "2px solid green" }}
          className="prime"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"green.50"} className="green3001" py={4} px={6}>
            <BsPeople size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>MG PRIME</Link>
          </Text>
        </Box>

        {/* Campaign */}
        <Box
          _hover={{ border: "2px solid blue" }}
          className="camp"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"blue.100"} className="blue3001" py={4} px={6}>
            <PiSpeakerHighThin size={40} color="blue" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>CAMPAIGN</Link>
          </Text>
        </Box>

        {/* pledge */}
        <Box
          _hover={{ border: "2px solid green" }}
          className="pledge"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"green.200"} className="green3002" py={4} px={6}>
            <LiaHandshakeSolid size={40} color="green" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>PLEDGE</Link>
          </Text>
        </Box>

        {/* podcast */}
        <Box
          _hover={{ border: "2px solid green" }}
          className="podcast"
          border={"2px solid white"}
          bg={"white"}
          borderRadius={"sm"}
          align="center"
          p={3}
        >
          <Box bg={"blue.200"} className="blue400" py={4} px={6}>
            <PiApplePodcastsLogoLight size={40} color="blue" />
          </Box>
          <Text color={"black.600"} fontWeight={"bold"} pt={3}>
            <Link>PODCAST</Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default RecentApps;
