import React from 'react';
import {Link} from 'react-router-dom';

const PayWithATweet = (props) => {
  return (<button style={{ cursor: 'pointer' }} onClick={ () => props.payWithATweet()}> Pay with a tweet </button>)
}

export default PayWithATweet
