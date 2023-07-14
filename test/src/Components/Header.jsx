import React, { useState } from 'react'
import { Box, Button, Collapse, Flex, Input, InputGroup, InputLeftElement, Link } from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import logo from "../assets/drdo_logo_0.png"
function Header() {
    const [searchisOpen, setSearchIsOpen] = useState(false);
    return (
        <Box bg={"linear-gradient(to right, #0f0e17, #0075B2)"} p={"20px"} position="sticky"
            top="0"
            zIndex="999"
        >
            <Flex justify={"space-between"} align={"center"} paddingBottom={"10px"} >
                <Box marginLeft={"20px"}>
                    <img src={logo} alt="" width={"70%"} />
                </Box>
                <Flex gap={"25px"} fontSize={"18px"} align={"center"} fontWeight={"600"} color={"white"} paddingRight={"30px"}>
                    <Link>Home</Link>
                    <Link>DRDO</Link>
                    <Link>Oragnisation</Link>
                    <Link>Outreach</Link>
                    <Link>Career</Link>
                    <Link>RTI</Link>
                    <Button onClick={() => setSearchIsOpen(!searchisOpen)}>
                        {
                            !searchisOpen ? <SearchIcon fontSize={"16px"} marginTop={"3px"} /> : <CloseIcon fontSize={"12px"} />
                        }
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
                    />
                    <Input className="Input" variant="outline" placeholder="Type search keyword" />
                </InputGroup>
            </Collapse>
        </Box>
    )
}

export default Header