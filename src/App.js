import React, { Component } from 'react';
import axios from 'axios';
import { Dna } from 'react-loader-spinner';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const apiKey = '32097277-d9f34a80dda9c795de3a72a0d';

class App extends Component {
  state = {
    searchWords: '',
    images: [],
    showModal: false,
    modalImage: '',
    showLoader: false,
    currentPage: 1,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  pushImagesToState = response => {
    const imagesFromResponse = response.data.hits;
    let newSearchArray = [];
    newSearchArray = [...this.state.images, ...imagesFromResponse];
    this.setState(({ images }) => ({ images: newSearchArray }));
  };
  setModalImage = linkImg => {
    return this.setState(({ modalImage }) => ({ modalImage: linkImg }));
  };
  openLargeImage = linkImg => {
    this.setModalImage(linkImg);
    this.toggleModal();
  };

  loaderToggle = bool => {
    return this.setState(({ showLoader }) => ({ showLoader: bool }));
  };

  getImages(words, page) {
    this.loaderToggle(true);
    axios
      .get(
        `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=3`
      )
      .then(response => {
        this.pushImagesToState(response);
        this.loaderToggle(false);
        this.setState(prevState => ({
          currentPage: prevState.currentPage + 1,
        }));
      });
  }

  searchFormSubmit = event => {
    event.preventDefault();
    this.setState({
      searchWords: '',
      images: [],
      showModal: false,
      modalImage: '',
      currentPage: 1,
    });
    const searchWordsValue = event.target[1].value;

    this.setState({ searchWords: searchWordsValue });
    const page = 1;
    this.getImages(searchWordsValue, page);
    event.target.reset();
  };

  loadMoreFn = () => {
    this.loaderToggle(true);
    this.getImages(this.state.searchWords, this.state.currentPage);
  };

  render() {
    return (
      <div className="App">
        {this.state.showModal && (
          <Modal closeFn={this.toggleModal} loader={this.loaderToggle}>
            <img src={this.state.modalImage} alt="modal" />
          </Modal>
        )}
        <Searchbar onSubmit={this.searchFormSubmit} />

        {this.state.searchWords !== '' && (
          <ImageGallery
            loader={this.loaderToggle}
            imagesArray={this.state.images}
            modalFn={this.openLargeImage}
          ></ImageGallery>
        )}
        {this.state.showLoader && (
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        )}
        {this.state.searchWords !== '' && <Button fn={this.loadMoreFn} />}
      </div>
    );
  }
}

export default App;
