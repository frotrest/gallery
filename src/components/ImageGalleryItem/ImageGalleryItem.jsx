import './ImageGalleryItem.css';

const ImageGalleryItem = React.memo(({img, modalImg}) => {
    return (
            <>
                <li className="ImageGalleryItem">
                    <img className='ImageGalleryItem-image' onClick={() => modalImg(img)} src={img} alt="" />
                </li>
            </>
    );
})

export default ImageGalleryItem;

