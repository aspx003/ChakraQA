import React, { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../utils/validationFunctions.js";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/auth/authSlice.js";
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
  Link as ChakraLink,
  Box
} from "@chakra-ui/react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
        title: "❌ SignUp Error",
        description: error.code,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
    }

    if (user) {
      toast({
        title: "🤗 User Created!",
        description: "👋 Welcome, " + user.providerData[0].displayName + "!",
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
      dispatch(signUp({ email, password, username }));
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
              <Heading textAlign='center'>Sign Up</Heading>
            </CardHeader>
            <CardBody>
              <InputGroup w={500}>
                <InputLeftAddon>Username</InputLeftAddon>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type='text'
                  placeholder='Username'
                  isRequired={true}
                />
              </InputGroup>
              <InputGroup mt={5} w={500}>
                <InputLeftAddon>Email</InputLeftAddon>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Email'
                  isRequired={true}
                />
              </InputGroup>
              <InputGroup mt={5} w={500}>
                <InputLeftAddon>Password</InputLeftAddon>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pr='4.5rem'
                  type={show ? "text" : "password"}
                  placeholder='Password'
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
                  {loading ? <Spinner /> : "Create User"}
                </Button>
              </Center>
            </CardBody>
            <Center>
              <Box>
                <ChakraLink>
                  <Link to='/signin'>Have an account? Go here!👈</Link>
                </ChakraLink>
              </Box>
            </Center>
          </Card>
        </Center>
      </Flex>
    </React.Fragment>
  );
};

export default SignUpPage;
