import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Circle
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import UserListItem from "../../userAvatar/UserListItem";
import UserBadgeItem from "../../userAvatar/UserBadgeItem";
import useGetUser from "../../hooks/useGetUsers";
import useCreateGroupChat from "../../hooks/useCreateGroupChat";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUser } = useGetUser(); // Update the hook if needed
  const { createGroupChat } = useCreateGroupChat(); // Update the hook if needed
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length < 2) {
      toast({
        title: "Please fill all the fields and select at least 2 users",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      await createGroupChat(selectedUsers.map((u) => u._id), groupChatName);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // only shows new gc after reloading..
      window.location.reload();

    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    getUser(searchQuery, async (fetchedUserData) => {
      setLoading(false);
      if (fetchedUserData) {
        setSearchResult([fetchedUserData]);
      } else {
        setSearchResult([]);
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

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      toast({
        title: "User Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
    setSearchQuery(""); // Clear the search query after adding the user
    setSearchResult([]); // Clear the search result after adding the user
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
          > Create Group Chat
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
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                bg="white"
              />
            </FormControl>
            <FormControl mb={3}>
              <Input
                placeholder="Add Users by Username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={handleSearch} // Perform search on blur
                bg="white"
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading && <div>Loading...</div>}
            {searchResult.map((user) => (
              <Box key={user._id} mb={2}>
                <UserListItem user={user} handleFunction={() => handleGroup(user)} />
              </Box>
            ))}
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

export default GroupChatModal;