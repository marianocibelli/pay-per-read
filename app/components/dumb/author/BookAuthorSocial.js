import React from 'react';

const BookAuthor = (props) =>{
      const {socialMediaLink} = props;
      return (<a className="follow-link" href={socialMediaLink}>FOLLOW HIM ON</a>)
}

export default BookAuthor
