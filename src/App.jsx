import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem.jsx';
import Modal from './components/Modal/Modal.jsx';
import { BounceLoader } from 'react-spinners';
import Button from './components/Button/Button.jsx';
import { Component } from 'react';
import axios from 'axios';
import './App.css';

export default class App extends Component {
  state = {
    images: [],
    page: 12,
    modalImg: '',
    filter: '',
    loader: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
    this.fetchImages();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = (e) => {
    if (e.key === 'Escape') {
      this.setState({ modalImg: '' });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.filter !== this.state.filter
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ loader: true });

    const params = new URLSearchParams({
      key: '42150706-1b2d033081ca078debbf13082',
      q: this.state.filter || 'nature',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: this.state.page.toString(),
    });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${params.toString()}`
      );
      console.log(response.data);
      this.setState({ images: response.data.hits, loader: false });
    } catch (err) {
      console.error('Ошибка запроса:', err);
      this.setState({ loader: false });
    }
  };

  loaderButton = () => {
    this.setState((prev) => ({ page: prev.page + 12 }));
  };

  modalImg = (img) => {
    this.setState({ modalImg: img });
  };

  filterInfo = (info) => {
    this.setState({ filter: info, page: 12 });
  };

  render() {
    const { images, modalImg, filter, loader } = this.state;
    return (
      <>
        <Searchbar infoFilter={this.filterInfo} />
        {loader ? (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}
          >
            <BounceLoader color="#36d7b7" size={120} />
          </div>
        ) : (
          <ImageGallery>
            {images.map((e) => (
              <ImageGalleryItem
                key={e.id}
                img={e.webformatURL}
                modalImg={this.modalImg}
              />
            ))}
          </ImageGallery>
        )}
        <Button load={this.loaderButton} none={filter} />
        <Modal
          modalImg={modalImg}
          onClose={() => this.setState({ modalImg: '' })}
        />
      </>
    );
  }
}
