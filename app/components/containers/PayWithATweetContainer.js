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
      book: props.book,
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
    const book = this.state.book;
    const nextBook = nextProps.book;

    if(!_.isEqual(book, nextBook)){
      this.setState({
        book : nextProps.book,
        readyToRender : true,
        bookPaid: false
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Compare book or if its ready to render.
    return (!_.isEqual(this.state.book, nextState.book) || this.state.readyToRender !== nextState.readyToRender || this.state.bookPaid !== nextState.bookPaid)
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
    const {book} = this.state;
    auth.login(book, this);
  }


}

export default PayWithATweetContainer;
