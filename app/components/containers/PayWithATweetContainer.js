import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import LogInButton from '../dumb/LogInButton';
import Auth from '../Auth';
import PayWithATweet from '../dumb/PayWithATweet'

const auth = new Auth();

class PayWithATweetContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bookId: props.bookId,
      readyToRender: false
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

    this.setState({
      bookId : nextProps.bookId,
      readyToRender : true
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bookId = this.state.bookId;
    const nextBookId = nextProps.bookId;
    // Compare book or if its ready to render.
    return (bookId !== nextBookId || this.state.readyToRender !== nextState.readyToRender)
  }

  render() {
    if(!this.state.readyToRender){
      return null
    }else{
      if(!auth || !auth.isAuthenticated()){
        return (
            <div>
              <LogInButton auth={auth}/>
            </div>
        )
      } else {
        //The logout button is not a component because its just for testing purposes
        return (
            <div>
              <PayWithATweet payWithATweet={this.payWithATweet} />
              <button style={{ cursor: 'pointer' }} onClick={ () => auth.logout()}> Log Out / This is just to test </button>
            </div>
        )
      }
    }
  }

  payWithATweet(){
    const bookId = this.state.bookId;
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

export default PayWithATweetContainer;
