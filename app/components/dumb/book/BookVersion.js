import React from 'react';

const BookVersion = (props) =>{
      const {version} = props;
      return (<p className="book-version"><i className="icon-budicon-744 icon" aria-hidden="true"></i> EBOOK VERSION {version}</p>)
}

export default BookVersion
