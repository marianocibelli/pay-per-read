import React from 'react';

const BookAuthor = (props) =>{
      const {author} = props;
      return (<p className="written-by">by {author}</p>)
}

export default BookAuthor
