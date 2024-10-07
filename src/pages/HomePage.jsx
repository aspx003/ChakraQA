import { Button, Container, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "src/components/NavbarComponent";
import { getQa } from "src/redux/qa/qaSlice";
import QuestionAnswerCardComponent from "src/components/QuestionAnswerCardComponent";
import { useEffect } from "react";

const HomePage = () => {
  const { loading, qaArray, error } = useSelector((state) => state.qa);
  const dispatch = useDispatch();

  return (
    <div>
      <NavbarComponent />
      <Container maxW="2xl">
        {loading && <Spinner />}
        {!error &&
          qaArray.map((qa) => (
            <QuestionAnswerCardComponent key={qa.id} qa={qa} />
          ))}
      </Container>
    </div>
  );
};

export default HomePage;
