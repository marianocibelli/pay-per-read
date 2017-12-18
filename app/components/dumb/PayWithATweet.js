import React from 'react';
import {Link} from 'react-router-dom';

const PayWithATweet = (props) => {
  return (<button className="btn btn-primary btn-md" onClick={ () => props.payWithATweet()}> Pay with a tweet </button>)
}

export default PayWithATweet
