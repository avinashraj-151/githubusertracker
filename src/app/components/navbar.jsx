import React from "react";
import { Box, Flex, Spacer, Image, Button,useDisclosure } from "@chakra-ui/react";
import HistoryModel from "./HistoryModel";
const navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justifyContent={"space-between"} py={6} alignItems={"center"} padding={0}>
      <Box position={"relative"} aspectRatio={5 / 3} minH={20}>
        <Image
          src="/logo.png"
          fill
          alt="github logo"
          sx={{ filter: "invert(1)" }}
          boxSize="100px"
          objectFit={'contain'}
        ></Image>
      </Box>
      <Box>
        <Button size='md'  colorScheme='whatsapp' onClick={onOpen}>
            Search History
        </Button>
      </Box>
      {isOpen && <HistoryModel isOpen={isOpen} onClose={onClose}></HistoryModel>}
    </Flex>
  );
};

export default navbar;
