import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PayWithATweet from '../dumb/PayWithATweet';
import Auth from '../Auth';

const auth = new Auth();

class PayWithATweetContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bookId: props.bookId,
      readyToRender: false,
      bookPaid: false
    }
    this.payWithATweet = this.payWithATweet.bind(this);
  }

  componentDidMount(){
    this.setState({
      readyToRender: true
    })
  }

  componentWillReceiveProps(nextProps){
    const bookId = this.state.bookId;
    const nextBookId = nextProps.bookId;

    if(bookId !== nextBookId){
      this.setState({
        bookId : nextProps.bookId,
        readyToRender : true,
        bookPaid: false
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bookId = this.state.bookId;
    const nextBookId = nextProps.bookId;
    // Compare book or if its ready to render.
    return (bookId !== nextBookId || this.state.readyToRender !== nextState.readyToRender || this.state.bookPaid !== nextState.bookPaid)
  }

  render() {
    const {readyToRender, bookPaid} = this.state;
    if(!readyToRender){
      return null
    }else{
      if(!bookPaid){
        return (
            <div>
              <PayWithATweet payWithATweet={this.payWithATweet}/>
            </div>
        )
      }else{
        return (
            <div>
              Thanks for your tweet! the download should have started in case it didnt
              <a href={bookPaid}>Click here</a>
            </div>
        )
      }
    }
  }

  payWithATweet() {
    const {bookId} = this.state;
    auth.login(bookId, this);
  }


}

export default PayWithATweetContainer;
