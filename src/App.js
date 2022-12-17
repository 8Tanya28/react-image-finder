import React, { Component } from 'react';
import s from './App.css';
import { PropTypes } from 'prop-types';
import axios from 'axios';

import Modal from './components/Modal';

const apiKey = '32097277-d9f34a80dda9c795de3a72a0d';

class App extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://pixabay.com/api/?q=cat&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(console.log);
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="modal" />
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )}
      </>
    );
  }
}

export default App;
