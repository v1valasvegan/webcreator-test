import React from 'react';
import cn from 'classnames';
import data from './data/page.json';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import styles from './Slider.module.css'

const gallery = data.components.find(({ type }) => type === 'GalleryComponent');
console.log(data);
console.log(gallery);
const { metadata: { images, title, slidesPerView } } = gallery;
const handleRenderError = () => <div className={styles['render-error']}>{`Image failed to load`}</div>

export default class extends React.Component {
  render() {
    return (
      <>
      <CarouselProvider
      naturalSlideWidth={'100'}
      naturalSlideHeight={125}
      totalSlides={8}
      visibleSlides={2}
      >
      <Slider>
        {images.map((imgpath, i) => (
          <Slide index={i} key={i}>
            <Image src={imgpath} alt={`image ${i + 1}`} renderError={handleRenderError} />
          </Slide>
          ))}
      </Slider>
        </CarouselProvider>
      </>
    );
  }
}
