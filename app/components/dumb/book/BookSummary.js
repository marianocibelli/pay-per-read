import React from 'react';

const BookSummary = (props) =>{
      const {summary} = props;
      return (<p className="description">{summary}</p>)
}

export default BookSummary;
