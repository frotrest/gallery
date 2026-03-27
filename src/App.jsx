import { useState, useEffect, useCallback, useMemo } from 'react';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem.jsx';
import Modal from './components/Modal/Modal.jsx';
import { BounceLoader } from 'react-spinners';
import Button from './components/Button/Button.jsx';
import axios from 'axios';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(12);
  const [modalImg, setModalImg] = useState('');
  const [filter, setFilter] = useState('');
  const [loader, setLoader] = useState(false);

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      setModalImg('');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    fetchImages();

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, [page, filter]);

  const fetchImages = useCallback(async () => {
    setLoader(true);

    const params = new URLSearchParams({
      key: '42150706-1b2d033081ca078debbf13082',
      q: filter || 'nature',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: page.toString(),
    });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${params.toString()}`
      );
      setImages(response.data.hits);
    } catch (err) {
      console.error('Ошибка запроса:', err);
    } finally {
      setLoader(false);
    }
  }, [filter, page]) 

  const loaderButton = useCallback(() => {
    setPage((prev) => prev + 12);
  }, []);

  const filterInfo = useCallback((info) => {
    setFilter(info);
    setPage(12);
  }, []);

  const filteredImages = useMemo(() => {
    return [...images.sort((a, b) => a.id - b.id)]
  }, [images])

  return (
    <>
      <Searchbar infoFilter={filterInfo} />
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
          {filteredImages.map((e) => (
            <ImageGalleryItem
              key={e.id}
              img={e.webformatURL}
              modalImg={setModalImg}
            />
          ))}
        </ImageGallery>
      )}
      <Button load={loaderButton} none={filter} />
      <Modal modalImg={modalImg} onClose={() => setModalImg('')} />
    </>
  );
};

export default App;