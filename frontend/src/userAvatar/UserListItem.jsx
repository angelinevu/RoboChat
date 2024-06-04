import { Avatar } from "@chakra-ui/avatar";
import { Flex, Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "lightgrey",
        color: "black",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Flex align="center">
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.fullName}
          src={user.pic}
        />
        <Box>
          <Text>{user.fullName}</Text>
        </Box>
      </Flex >
    </Box>
  );
};

export default UserListItem;
