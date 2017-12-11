import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PayWithATweet from './PayWithATweetButton';
import { withRouter } from 'react-router'
import _ from 'lodash'

class BookLanding extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      book: props.book
    }
  }

  componentWillReceiveProps(nextProps) {
    const bookId = nextProps.match.params.id;

    // Fetch information if needed.
    this.serverRequest =
      axios
        .get(`/api/books/${bookId}`)
        .then((result) => {
          this.setState({
            book: result.data
          });
        }).catch(err => {
          this.setState({
            book: undefined
          });
        })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const bookId = this.props.match.params.id;
    const nextBookId = nextProps.match.params.id;

    // Compare book or id change.
    return (bookId !== nextBookId || !_.isEqual(this.state.book, nextState.book))
  }

  render() {
    const { book, location } = this.state
    if (book) {
      return (
          <div>
              <h3>TITLE: {book.name}</h3>
              <p>SUMMARY: {book.summary}</p>
              <p>AUTHOR: {book.author}</p>
              <PayWithATweet bookId={book.id}/>
          </div>
      )
    } else {
      return (
          <div>
              <p>NOT FOUND</p>
          </div>
      )
    }
  }

}

export default withRouter(BookLanding);
