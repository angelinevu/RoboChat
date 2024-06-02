import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, useDisclosure, FormControl, Input, useToast, Box,
  Circle
} from "@chakra-ui/react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import { FaPlus } from "react-icons/fa6";
import toast from 'react-hot-toast'
import { useAuthContext } from "../../context/AuthContext";
//import useGetUser from "../../hooks/useGetUsers";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //const [groupChatName, setGroupChatName] = useState();
  //const [selectedUsers, setSelectedUsers] = useState([]);
  //const [search, setSearch] = useState("");
  //const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //Create tentative group of users
  /*
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  */

  //Search for user
  const handleSearch = async (query) => {
    if (!query) {
      return;
    }

    try {
      const res = await useGetUsers(query)
      console.log(res);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  };

  //Delete user from list
  /*
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  */

  const handleSubmit = async () => {
    /*
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    */

    try {
      //api/chat/group
      //setChats([data, ...chats]);
      //onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      onClose()
      setTimeout(function () {
        location.reload();
      }, 500);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#F2F2F2">
          <ModalHeader
            fontSize="35px"
            fontFamily="Roboto, sans-serif"
            d="flex"
            justifyContent="center"
            textAlign="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                //onChange={(e) => setGroupChatName(e.target.value)}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users by Username"
                //mb={1}
                onChange={(e) => handleSearch(e.target.value)}
                //fontFamily="Courier New, monospace"
                bg="white"
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {/*selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                  fontFamily="Courier New, monospace"
                />
              ))*/}
            </Box>
            {/*loading ? (
              // <ChatLoading />
              <div style={{ color: "#5a5a5a" }}>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  {/*<UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                    fontFamily="Roboto, sans-serif"
                /> }
                ))
            )*/}
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
            {/*<Button onClick={handleSubmit} 
            colorScheme="blue"
              _hover={{ backgroundColor: "gray.200" }}
            >
              Create Chat
            </Button>
          */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default GroupChatModal;