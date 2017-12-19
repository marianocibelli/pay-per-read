import React from 'react';
import PayWithATweet from '../../containers/PayWithATweetContainer';
import ContentModal from '../../containers/ContentModal';
import BookAuthor from '../book/BookAuthor';
import BookCardAuthor from '../book/BookCardAuthor';
import BookSummary from '../book/BookSummary';
import BookTagline from '../book/BookTagline';
import BookTitle from '../book/BookTitle';
import Image from '../Image';
import BookIntro from '../book/BookIntro';
import BookVersion from '../book/BookVersion';
import LegalInfo from '../LegalInfo';

const BookSection = (props) =>{
      const { book } = props

      return (<section className="book-section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="book-card">
                        <BookTitle cssClasses="text-center title mobile-title" title={book.name} />
                        <BookAuthor author={book.author.fields.name} />
                        <BookVersion version={book.version} />
                        <div className="book-image">
                          <Image image={book.image.fields.file.url} />
                        </div>
                        <div className="book-details">
                          <BookTagline tagline={book.tagline}></BookTagline>
                          <BookCardAuthor author={book.author.fields.name} />
                        </div>

                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="book-data">
                        <BookTitle cssClasses="title desktop-title" title={book.name} />
                        <BookAuthor author={book.author.fields.name} />
                        <BookVersion version={book.version} />
                        <BookIntro intro={book.intro} />
                        <BookSummary summary={book.summary} />
                        <ContentModal book={book}/>
                        <div className="button-row">
                          <PayWithATweet book={book}/>
                        </div>
                        <hr />
                        <LegalInfo />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
  }

export default BookSection;
