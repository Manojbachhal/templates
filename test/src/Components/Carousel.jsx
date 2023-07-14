import { Box, Flex, IconButton, SlideFade } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    }, [images.length]);

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box position="relative" height={"450"}>
            <SlideFade in offsetY={-20}>
                <Box position="relative">
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            position="absolute"
                            top={0}
                            left={0}
                            opacity={index === currentIndex ? 1 : 0}
                            transition="opacity 0.6s ease-in-out"
                            zIndex={index === currentIndex ? 1 : 0}
                        >
                            <img src={image} alt={`Slide ${index + 1}`} style={{ height: '450px', width: '100vw' }} />
                        </Box>
                    ))}
                </Box>
            </SlideFade>
            <Flex justifyContent="space-between" paddingTop={"16%"} mt={4} position="relative" zIndex={99} margin={0}>
                <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label="Previous Slide"
                    onClick={handlePrevSlide}
                    colorScheme="blue"
                    variant="ghost"
                    margin={"20px"}
                    fontSize={"30px"}
                    borderRadius={"30px"}
                    bg={"white"}
                    boxShadow={"1px 1px 25px #4c81ee"}
                />
                <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label="Next Slide"
                    onClick={handleNextSlide}
                    colorScheme="blue"
                    variant="ghost"
                    margin={"20px"}
                    fontSize={"30px"}
                    borderRadius={"30px"}
                    bg={"white"}
                    boxShadow={"1px 1px 25px #4c81ee"}

                />
            </Flex>
        </Box>
    );
}

