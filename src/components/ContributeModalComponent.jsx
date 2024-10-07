/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useDispatch, useSelector } from "react-redux";
import { postQa } from "../redux/qa/qaSlice";

const ContributeModalComponent = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  //   TODO: implement later after creating a table for it!
  //   const [topics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isError = question === "";
  const isErrorAnswer = answer === "";
  let created_by = `${user.providerData[0].displayName}`;

    const contributeHandler = () => {
        if(user) {
            dispatch(postQa({ question, answer, created_by }))
        }
        onClose();
    }

  return (
    <Modal onClose={onClose} size='full' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel>Question: </FormLabel>
            <Input
              type='text'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {!isError ? (
              <FormHelperText>Enter a valid question.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Please provide a valid question!
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorAnswer}>
            <FormLabel>Answer: </FormLabel>
            <Box>
              <MarkdownEditor
                value={answer}
                height='200px'
                onChange={(value) => setAnswer(value)}
              />
            </Box>
            {!isErrorAnswer ? (
              <FormHelperText>Enter a valid answer.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Please provide a valid answer!
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={5}
            onClick={contributeHandler}>
            Create Question
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ContributeModalComponent;
