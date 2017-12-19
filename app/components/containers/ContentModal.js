import React from 'react';
import ReactModal from 'react-modal';
import BookAuthor from '../dumb/book/BookAuthor';
import BookCardAuthor from '../dumb/book/BookCardAuthor';
import BookSummary from '../dumb/book/BookSummary';
import BookTagline from '../dumb/book/BookTagline';
import BookTitle from '../dumb/book/BookTitle';
import Image from '../dumb/Image';
import ContentIndex from './ContentIndex';
import BookIntro from '../dumb/book/BookIntro';
import BookVersion from '../dumb/book/BookVersion';
import LegalInfo from '../dumb/LegalInfo';


class ContentModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      book: props.book
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount(){
    ReactModal.setAppElement("#main")
  }
  componentWillReceiveProps(nextProps){
    const book = this.state.book;
    const nextBook = nextProps.book;

    if(!_.isEqual(book, nextBook)){
      this.setState({
        book : nextProps.book,
        showModal: false
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Compare book or if its ready to render.
    return (!_.isEqual(this.state.book, nextState.book) || this.state.showModal !== nextState.showModal)
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    const {book} = this.state
    //Recursive content index array
    let counter = 0;
    const listItems = book.content.map((content) => {
      let idxString = ""
      if(content.children){
        counter++;
        idxString = counter;
      }
      return (<ContentIndex key={content.name} content={content} currentLevel={0} indexString={idxString}/>)
    });
    return (
      <div className="content-modal">
        <a onClick={this.handleOpenModal}>CONTENTS</a>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel=""
           shouldCloseOnOverlayClick={true}
           overlayClassName="content-modal-overlay"
           className="content-modal-box"
        >
        <a className="close-modal" onClick={this.handleCloseModal}>X</a>
        <div className="modal-data-container">
          <BookTitle cssClasses="title modal-title" title={book.name} />
          <BookAuthor author={book.author.fields.name} />
          <BookVersion version={book.version} />
          <hr />
          <h3>Contents</h3>
          {listItems}
        </div>
        </ReactModal>
      </div>
    );
  }
}

export default ContentModal
