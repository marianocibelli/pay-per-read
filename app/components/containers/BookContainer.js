import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PayWithATweet from './PayWithATweetContainer';
import BookAuthor from '../dumb/BookAuthor';
import BookSummary from '../dumb/BookSummary';
import BookTitle from '../dumb/BookTitle';
import { withRouter } from 'react-router'
import _ from 'lodash'

class BookContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      book: props.book
    }
  }

  componentWillReceiveProps(nextProps) {
    const bookId = nextProps.match.params.bookId;

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
    const bookId = this.props.match.params.bookId;
    const nextBookId = nextProps.match.params.bookId;

    // Compare book or id change.
    return (bookId !== nextBookId || !_.isEqual(this.state.book, nextState.book))
  }

  render() {
    const { book } = this.state
      return book ?
      (
          <div>
              <BookTitle title={book.name}></BookTitle>
              <BookSummary summary={book.summary}></BookSummary>
              <BookAuthor author={book.author}></BookAuthor>
              <PayWithATweet bookId={book.id}/>
          </div>
      )
      :
      (
          <div>
              <p>NOT FOUND</p>
          </div>
      )
  }

}

export default withRouter(BookContainer);
