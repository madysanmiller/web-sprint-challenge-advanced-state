import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  //   // useSelector hook to acces the states.
  //  const quiz = useSelector(state => state.quiz);
  //  const selectedAnswer = useSelector(state => state.selectedAnswer);
  //  // use dispatch hook to create a dispatch
  //  const isMounted = useRef(false);
  //  const dispatch = useDispatch();

  const { fetchQuiz, selectAnswer, selectedAnswer, postAnswer, quiz } = props;

  useEffect(() => {
    console.log("quiz", quiz);
    !quiz && fetchQuiz();
  }, []);

  // return selected class name based on the answer state
  const getSelectedClass = (answer) => {
    return selectedAnswer === answer ? "selected" : "";
  };

  // const isAnswerSelected = useSelector(state => state.selectedAnswer !== null);

  return (
    <div id="wrapper">
      {/*       
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..." */}
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>

          <div id="quizAnswers">
          <div className={`answer${selectedAnswer === quiz.answers[0].answer_id ? ' selected' : ''}`} onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                {quiz.answers[0].text}
                <button>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={`answer${selectedAnswer === quiz.answers[1].answer_id ? ' selected' : ''}`} onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                {quiz.answers[1].text}
                <button>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>  
          </div>

          {/* <button id="submitAnswerBtn" onClick={() => {
            dispatch(actions.postAnswer());
            }}
            disabled={!selectedAnswer}>
              Submit answer
            </button> */}

          <button
            id="submitAnswerBtn"
            disabled={!selectedAnswer}
            onClick={() =>
              postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })
            }
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

export default connect(st => st, actionCreators)(Quiz)