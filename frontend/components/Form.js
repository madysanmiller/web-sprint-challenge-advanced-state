import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { inputChange, resetForm, setQuiz, postQuiz} from '../state/action-creators';
import { useNavigate } from 'react-router-dom';
//import * as actionCreators from '../state/action-creators'
export function Form(props) {
  console.log('Form state', props.form)
  const onChange = evt => { 
    let payloadChange;
    switch (evt.target.id){
      case "newQuestion":
        payloadChange = "question_text";
        break;
      case "newTrueAnswer":
        payloadChange = "true_answer_text";
        break;
      case "newFalseAnswer":
        payloadChange = "false_answer_text";
        break;
      default:
        payloadChange = "";
    }
    props.inputChange(payloadChange, evt.target.value);
    // console.log('onchange', evt.target.value);
  }
  const onSubmit = evt => {
    evt.preventDefault();
    props.setQuiz(props.form);
    props.form; 
    props.postQuiz(props.form)
    props.resetForm();
    console.log('onSubmit', 'Form submitted')
  }
  console.log('form', props.form);
  const inputField = () => {
    
      return Object.values(props.form).some(value => !value.trim().length)

      // (props.form.question_text || "").trim().length === 0 ||
      // (props.form.true_answer_text || "").trim().length === 0 || 
      // (props.form.false_answer_text || "").trim().length === 0git

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.question_text} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.true_answer_text}/>
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer"value={props.form.false_answer_text}/>

      <button type='submit' id="submitNewQuizBtn" disabled={inputField()}>Submit new quiz</button>
      {props.error && <p className="error">{props.error}</p>}
      {props.success && <p className='success'>{props.success}</p>}
    </form>
  )
}
const mapStateToProps = state => {
  return {
    form: state.form
  }
}
export default connect(mapStateToProps, {inputChange, setQuiz, resetForm, postQuiz})(Form)