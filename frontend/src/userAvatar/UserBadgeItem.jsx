import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}  
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="gray"  
      cursor="pointer"
      display="inline-flex"  
      alignItems="center" 
      onClick={handleFunction}
    >
      <Box flex="1" mr={2}> 
        {user.fullName}
        {admin === user._id && <span> (Admin)</span>}
      </Box>
      <CloseIcon /> 
    </Badge>
  );
};

export default UserBadgeItem;
