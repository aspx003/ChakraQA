/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Badge,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import MarkdownEditor from "@uiw/react-markdown-editor";

// eslint-disable-next-line react/prop-types
const QuestionAnswerCardComponent = ({ qa }) => {
  const {
    id,
    question,
    answer,
    created_at,
    updated_at,
    created_by,
    updated_by,
    topics,
  } = qa;

  return (
    <>
      <Card mt={5}>
        <CardHeader>
          <Heading size='md'>
            Question {id}: {question}
          </Heading>
        </CardHeader>
        <CardBody>Answer: 
            <MarkdownEditor.Markdown source={answer} />
        </CardBody>
        <CardFooter>
          <Flex>
            <Box>
              <p>Contributed By: {created_by}</p>
              <p>Updated by: {updated_by}</p>
            </Box>
            <Spacer />
            <Box>
              Tags:
              {topics.map((topic, index) => (
                <Badge ml={2} key={index}>{topic}</Badge>
              ))}
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};
export default QuestionAnswerCardComponent;
