import React from 'react';

const BookAuthorDescription = (props) =>{
      const {authorDescription} = props;
      return (
                <p className="description">
                  {authorDescription}
                </p>
              )
}

export default BookAuthorDescription
