import React from 'react';

const BookTagline = (props) =>{
      const {tagline} = props;
      return (<h3 className="book-title">{tagline}</h3>)
}

export default BookTagline
