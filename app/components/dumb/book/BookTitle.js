import React from 'react';

const BookTitle = (props) =>{
      const {title} = props;
      return (<h1 className={props.cssClasses} >{title}</h1>)
}

export default BookTitle;
