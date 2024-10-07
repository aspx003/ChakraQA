import {
  Box,
  Heading,
  Flex,
  Spacer,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/redux/auth/authSlice";
import ContributeModalComponent from "./ContributeModalComponent";

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <React.Fragment>
        <ContributeModalComponent disclosure={{isOpen, onOpen, onClose}} />
      <Box bg='teal' w='100%' p={2} color='white'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Heading>Chakra Q/A</Heading>
          <Spacer />
          <Box>
            {/* Implement Search Functionality */}
          </Box>
          <Box>
            <Button onClick={() => onOpen()}>
                Contribute
            </Button>
          </Box>
          <Box>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={
                      <Avatar
                        size='sm'
                        name={`${user.providerData[0].displayName}`}
                        src={`${user.providerData[0].photoUrl}`}
                      />
                    }>
                    {isOpen ? "Close" : `${user.providerData[0].displayName}`}
                  </MenuButton>
                  <MenuList color="teal.900">
                    <MenuItem>Change Account Details</MenuItem>
                    <MenuItem onClick={() => dispatch(logout())}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default NavbarComponent;
