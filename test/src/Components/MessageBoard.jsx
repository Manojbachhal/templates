import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import New from "./New";



const MessageBoard = () => {
    // Generate random messages


    const MessageData = [{
        id: 1,
        date: "02/06/2023",
        isheading: false,
        content: "DRDO Recruitment [CEPTAM Notice Board]",
        isNew: true,
    }, {
        id: 2,
        date: "24/01/2023",
        isheading: false,
        content: "Dare to Dream 4 ContestNew",
        isNew: true,
    }, {
        id: 3,
        date: "29/11/2022",
        isheading: true,
        heading: "Instruction for Summer Training",
        content: "Instruction for Summer Training   Different Labs/Estts of  DRDO provide summer training to students (Graduates)",
        isNew: true,
    }]

    return (<Box>
        <Text align={"center"} as={"h1"} bg={"linear-gradient(to right, #0f0e17, #0075B2)"} color={"white"} fontSize={"20px"} fontWeight={"bold"} p={4}>Message Board</Text>
        {MessageData.map((message) => (
            <Box key={message.id} borderWidth="1px" borderRadius="lg" p={4} height={"auto"}>
                <Box align="left" fontStyle={"italic"} mb={2} width={"450px"} padding={"10px 0px 25px 10px"}>
                    <Text fontWeight="bold">{message.date}</Text>
                    {
                        message.heading ? <Text fontWeight="bold" as={"h2"}>{message.heading}</Text> : undefined
                    }
                    <Text >{message.content}</Text>
                    {
                        message.isNew ?
                            <Box>
                                <New />
                            </Box>
                            : undefined
                    }

                </Box>
            </Box>
        ))}
    </Box>
    );
};

export default MessageBoard;
