import { Box, Text, keyframes } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
const Marquee = ({ MarqueeData, isVertical }) => {
    const marqueeAnimation = keyframes`
    0% {
      transform: ${isVertical ? "translateY(10%)" : "translateX(100%)"};
    }
    100% {
      transform: ${isVertical ? "translateY(-100%)" : "translateX(-100%)"};
    }
  `;

    const marqueeItemAnimation = keyframes`
    0% {
      transform: ${isVertical ? "translateY(0)" : "translateX(0)"};
    }
    100% {
      transform: ${isVertical ? "translateY(-50%)" : "translateX(-100%)"};
    }
  `;

    const marqueeStyles = {

        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        animation: `${marqueeAnimation} 20s linear infinite`,
        "&:hover": {
            animationPlayState: "paused",
        },
        "&:click": {
            animationPlayState: "paused",
        },
    };

    const marqueeItemStyles = {
        animation: `${marqueeItemAnimation} infinite`,
        backfaceVisibility: "hidden",
    };

    return (
        <Box
            overflow="hidden"
            bg={isVertical ? undefined : "white"}
            fontWeight={"thin"}
            width={isVertical ? "450px" : undefined}
            height={isVertical ? "512px" : undefined}
            // whiteSpace={"nowrap"}
            borderWidth="1px"
            borderBottomEndRadius={isVertical ? "10px" : undefined}
            borderTopEndRadius={isVertical ? "10px" : undefined}

            boxShadow={isVertical ? "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" : "rgba(100, 100, 111, 0.2) 0px 0px -15px 0px"}
        >
            <Box
                className="marquee"
                as="div"
                css={marqueeStyles}
            >
                {MarqueeData.map((ele, index) => (
                    isVertical ? (
                        <Box key={index}
                            width={"450px"}
                            textAlign={"left"}
                            padding={"10px"}
                            margin={"10px 0px"}
                        >
                            <Divider size="md" borderColor="black.300" my={4} />

                            <Box marginTop={"15px"} paddingLeft={"20px"} paddingTop={"10px"} style={{ height: "100px" }}>
                                <p style={{ fontWeight: "bold", }}>{ele.date}</p>
                                <p style={{ fontStyle: "italic" }}>{ele.content}</p>

                                <Box className="glow" >
                                    <ul>
                                        <li>N</li>
                                        <li>E</li>
                                        <li>W</li>
                                    </ul>
                                </Box>


                            </Box>
                            {
                                index == MarqueeData.length - 1 ? <Divider size="md" my={12} borderColor="black.300" /> : undefined
                            }
                        </Box>
                    ) : (
                        <Box
                            className="marquee-content"
                            as="p"
                            key={index}
                            maxwidth={"1000px"}
                            Width={"100%"}
                            textAlign={"center"}
                            borderLeft={"1px solid black"}
                            css={marqueeItemStyles}
                            fontStyle={"italic"}
                            fontWeight={"600"}
                            borderRight={index == MarqueeData.length - 1 ? "1px solid black" : undefined}
                            padding={"0px 50px"}
                        >
                            {ele}
                        </Box>
                    )

                ))}
            </Box >
        </Box >
    );
};

export default Marquee;
