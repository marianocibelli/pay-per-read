import React from 'react';
import BookAuthorDescription from '../author/BookAuthorDescription';
import BookAuthorSocial from '../author/BookAuthorSocial';
import Image from '../Image';

const AuthorSection = (props) =>{
      const { book } = props

      return (<section className="author-section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 author-photo-section">
                      <h1 className="title about-mobile" >About the author</h1>
                      <Image image={book.author.fields.image.fields.file.url} />
                    </div>
                    <div className="col-md-8 author-description-section">
                      <h1 className="title about-desktop" >About the author</h1>
                      <BookAuthorDescription authorDescription={book.author.fields.description}/>
                      <BookAuthorSocial socialMediaLink={book.author.fields.social} />
                    </div>
                  </div>
                </div>
             </section>
            )
  }

export default AuthorSection;
