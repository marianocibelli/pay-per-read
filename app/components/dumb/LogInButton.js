import React from 'react';
import {Link} from 'react-router-dom';

const LogInButton = (props) => {
  return (<button style={{ cursor: 'pointer' }} onClick={ () => props.auth.login()}> Log In </button>)
}

export default LogInButton
