import axios from "axios";
import * as types from './action-types';
import Message from "../components/Message";
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return {
    type: types.MOVE_CLOCKWISE
  }
}
export function moveCounterClockwise() {
  return{
    type: types.MOVE_COUNTERCLOCKWISE
  }
 }
export function selectAnswer(answer) {
  const questions = {type: types.SET_SELECTED_ANSWER, payload: answer}
  return questions;
 }
export function setMessage(message) {
  const notification = {type: types.SET_INFO_MESSAGE, payload: message}
  return notification;
 }
export function setQuiz(quiz) { 
  const info = {type: types.SET_QUIZ_INTO_STATE, payload: quiz}
  return info;
}
export function inputChange(name, value) {
  return {
    type: types.INPUT_CHANGE,
    payload: {
      name: name,
      value: value
    }
  }
 }
export function resetForm() {
  return {
    type: types.RESET_FORM
  }
 }
// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    const API_URL = 'http://localhost:9000/api/quiz/next';
      dispatch(setQuiz(null))
      axios.get(API_URL)
      .then((response) => {
        dispatch(setQuiz(response.data));
      })
      .catch(error => {
        console.error(error);
      })
    }
  }
    
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  
export function postAnswer() {
  return function (dispatch, getState) {
    const selectedAnswer = getState().selectedAnswer;
    const quizId = getState().quiz.quiz_id;
    const requestData = { answer_id: selectedAnswer, quiz_id: quizId };
    axios.post('http://localhost:9000/api/quiz/answer', requestData)
    .then(response => {
      dispatch(selectAnswer(null));
      dispatch(setMessage(response.data.message));
      // disatch(fetchQuiz());
    })
    .catch(error => {
      console.error(error);
    }
    ) .finally(() => {
      dispatch(fetchQuiz())
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch,getState) {
    const newQuiz=getState().form;

    const postNewQuiz = { "question_text": newQuiz.newQuestion, 
                       "true_answer_text": newQuiz.newTrueAnswer,
                        "false_answer_text": newQuiz.newFalseAnswer }
    //console.log(postNewQuiz)
    axios.post('http://localhost:9000/api/quiz/new',postNewQuiz)
         .then(res=>{
          console.log(res)
           const backMessage =`Congrats: "${res.data.question}" is a great question!`
           dispatch(setMessage(backMessage))
           dispatch(resetForm())
         })
        .catch(err => {
          const information = `Error ${err.response.status}:${err.response.data.message}`
          console.log(information)
        })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state