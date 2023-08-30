import React from 'react'
import { setMessage } from '../state/action-creators';
import { connect } from 'react-redux';

 function Message(props) {
  const { infoMessage, setMessage} = props; 
  
  const handleResponse = (respone) => {
    if (respone.status === 200) {
      setMessage('Nice job! That was the correct answer');
    } else if (respone.status === 201) {
        setMessage(`Congrats: ${id="newQuestion"}  is a great question!`);
    } else if (respone.status === 422) {
      setMessage(`Your Quiz could not be created, check your fields`);
    } else if (respone.status === 200) {
      const feedBack = respone.data.feedBack;
      setMessage(feedBack);
    } else {
      setMessage('Something went wrong. Please try again later.');
    }
    if(props.respone) {
      handleResponse(props.respone);
    }
  }
  return (
  <div id="message">
    {infoMessage && <p>{infoMessage}</p>}
  </div>
  )
}
 const mapStateProps = (state) => {
  return {
    infoMessage: state.infoMessage,
  }
 }

 const mapDispatchProps = (dispatch) => {
  return {
    setMessage: (message) => dispatch(setMessage(message)),

  }
 }

 export default connect(mapStateProps, mapDispatchProps)(Message);
