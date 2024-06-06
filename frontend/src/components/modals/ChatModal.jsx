import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, useDisclosure, FormControl, Input, useToast, Box,
  Circle
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast'
import useGetUser from "../../hooks/useGetUsers";
import useAccessChat from "../../hooks/useAccessChat";
import useConversation from "../../zustand/useConversation";

const ChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData, getUser } = useGetUser();
  const { chat, accessChat } = useAccessChat()
  const { selectedConversation, setSelectedConversation } = useConversation()
  const [searchQuery, setSearchQuery] = useState("")
  const toast = useToast();

  const handleSubmit = () => {
    if (searchQuery === "") {
      toast({
        title: "Field Required",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return
    }
    getUser(searchQuery, async (fetchedUserData) => {
      //console.log("right after getUser", fetchedUserData);
      if (fetchedUserData) {
        try {
          const fetchedChat = await accessChat(fetchedUserData); // Assuming accessChat returns a promise
          setSelectedConversation(fetchedChat);
          //onClose()
          //setSearchQuery("")
          await setTimeout(() => {      //Short term solution
            window.location.reload();
          }, 200);
          toast({
            title: "Chat Available",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        } catch (error) {
          console.error("Error accessing chat:", error);
          toast({
            title: "Error accessing chat",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } else {
        toast({
          title: "No user found",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    });
  };


  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#F2F2F2">
          <ModalHeader
            fontSize="35px"
            //fontFamily="Roboto, sans-serif"
            d="flex"
            justifyContent="center"
            textAlign="center"
          //style={{ fontWeight: "600" }}
          >
            Create Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
          >
            <FormControl>
              <Input
                placeholder="Username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="white"
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
            </Box>
          </ModalBody>
          <ModalFooter mt={-2}>
            <Circle
              as="button"
              onClick={handleSubmit}
              bg="blue.500"
              _hover={{
                bg: "gray.300",
                transition: "background-color 0.1s ease-in-out"
              }}
              boxSize={12}
              textColor={"white"}
              fontSize={22}
            >
              <FaPlus />
            </Circle>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatModal;