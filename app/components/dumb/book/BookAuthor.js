import React from 'react';

const BookAuthor = (props) =>{
      const {author} = props;
      return (<p className="written-by">Written by {author}</p>)
}

export default BookAuthor
