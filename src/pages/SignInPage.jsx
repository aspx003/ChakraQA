import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../utils/validationFunctions.js";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/auth/authSlice.js";
import {
  Center,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Button,
  Flex,
  Spinner,
  useToast,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast({
        title: "🙅 Authentication Error",
        description: error.code,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
    }

    if (user) {
      toast({
        title: "🙌 Login Success",
        description: "👋 Welcome back, " + user.providerData[0].displayName + "!",
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, user, toast, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorEmailMessage("");
    setErrorPasswordMessage("");

    if (!validateEmail(email)) {
      setErrorEmailMessage("Invalid Email address");
      toast({
        title: "❌ Email Error",
        description: errorEmailMessage,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    if (!validatePassword(password)) {
      setErrorPasswordMessage("Password must have min 6 characters");
      toast({
        title: "❌ Password Error",
        description: errorPasswordMessage,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    if (email && password) {
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <React.Fragment>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"center"}
        justifyContent={"center"}>
        <Center>
          <Card>
            <CardHeader>
              <Heading textAlign='center'>Sign In</Heading>
            </CardHeader>
            <CardBody>
              <InputGroup w={500}>
                <InputLeftAddon>Email </InputLeftAddon>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Enter email'
                  isRequired={true}
                />
              </InputGroup>
              <InputGroup mt={5} w={500}>
                <InputLeftAddon>Password </InputLeftAddon>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pr='4.5rem'
                  type={show ? "text" : "password"}
                  placeholder='Enter email'
                  isRequired={true}
                />
                <InputRightElement width='4.5rem'>
                  <Button size='sm' h='1.75rem' onClick={() => setShow(!show)}>
                    {!show ? "Show" : "Hide"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Center mt={5}>
                <Button onClick={submitHandler}>
                  {loading ? <Spinner /> : "Login"}
                </Button>
              </Center>
            </CardBody>
            <Center>
              <Box>
                <ChakraLink>
                  <Link to='/signup'>Create an account here.👈</Link>
                </ChakraLink>
              </Box>
            </Center>
          </Card>
        </Center>
      </Flex>
    </React.Fragment>
  );
};

export default SignInPage;
