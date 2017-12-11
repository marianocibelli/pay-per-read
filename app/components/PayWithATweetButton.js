import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PayWithATweet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      wasPaid: false,
      authLink: "not-implemented-yet",
      bookId: props.bookId
    }
    this.payWithATweet = this.payWithATweet.bind(this);
  }

  render() {
    const { wasPaid, downloadLink } = this.state
    if(!wasPaid){
      return (
          <div>
              <button onClick={this.payWithATweet}>PAY WITH A TWEET</button>
              <Link to={`${this.state.authLink}`} >AUTH ME</Link>
          </div>
      )
    } else {
      return (
          <div>
          <div>
              <p>Thanks for your tweet, if it doesnt open a new window click the link</p>
              <Link to={`${this.state.downloadLink}`} target="_blank">DOWNLOAD YOUR BOOK!</Link>
          </div>
          </div>
      )
    }
  }

  payWithATweet(){
    const bookId = _this.state.bookId;
    this.serverRequest =
      axios
        .get(`/api/books/download/${bookId}`)
        .then((result) => {
          this.setState({
            wasPaid: true,
            downloadLink: result.data
          });
          window.open(result.data);
        }).catch(err => {
          this.setState({
            wasPaid: false
          });
        })
  }

}

export default PayWithATweet;
