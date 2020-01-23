/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import styles from './Gallery.module.css';

const imgWidth = 364;
const imgHeight = 243;
const bodyWidth = 1140;


export default class Gallery extends React.Component {
  state = {
    images: this.props.images,
    transition: 'none',
    width: null,
  }

  calculateGalleryStyles = () => {
    const { slidesPerView } = this.props;
    const isMultipleView = slidesPerView > 1;
    const gap = isMultipleView
      ? (bodyWidth - (imgWidth * slidesPerView)) / (slidesPerView - 1)
      : (bodyWidth - imgWidth) / 2;
    const offset = -isMultipleView ? imgWidth + gap : imgWidth;
    return { offset, gap };
  }

  handleClick = (transition) => () => this.setState({ transition });

  handleTransitionEnd = () => {
    const { images, transition } = this.state;
    const [head, ...rest] = images;
    const last = _.last(images);
    const initial = _.initial(images);
    const newImages = {
      next: [last, ...initial],
      previous: [...rest, head],
      none: images,
    };
    this.setState({ images: newImages[transition], transition: 'none' });
  }

  buildDotsArray = () => {
    const { slidesPerView } = this.props;
    if (slidesPerView === 1) {
      // eslint-disable-next-line react/jsx-key
      return [<div className={styles.dot}></div>];
    }
    console.log(slidesPerView - 1);
    const obj = { 1: 11, 2: 12 };
    console.log(obj);
    const dotsOnClick = {
      0: this.handleClick('previous'),
      [slidesPerView - 1]: this.handleClick('next'),
    };
    const dots = [];
    for (let i = 0; i < slidesPerView; i += 1) {
      const dot = <div className={styles.dot} onClick={dotsOnClick[i]}></div>;
      dots.push(dot);
    }
    return dots;
  };

  render() {
    const { title, slidesPerView } = this.props;
    const { transition, images } = this.state;
    const { offset, gap } = this.calculateGalleryStyles();

    const stripeStyle = {
      none: {
        transition: 'none',
        transform: 'translate(0)',
      },
      next: {
        transition: 'all 0.5s ease-in',
        transform: `translate(${imgWidth + gap}px)`,
      },
      previous: {
        transition: 'all 0.5s ease-in',
        transform: `translate(-${imgWidth + gap}px)`,
      },
    };

    const imgStyle = { marginRight: `${gap}px` };
    const previousClassName = `${styles.button} ${styles['button-previous']}`;
    const nextClassName = `${styles.button} ${styles['button-next']}`;
    const containerClassNames = `container-fluid ${styles['mb-40']}`;

    return (
      <div className={containerClassNames}>
        <h2 className={styles.heading}>{title}</h2>
        <div className={styles.wrapper}>
          <div className={styles.viewbox}>
            <div className={styles.stripe} style={{ ...stripeStyle[transition], left: `-${offset}px` }} onTransitionEnd={this.handleTransitionEnd}>
              {images.map((image) => (
                <img
                  src={image}
                  className="flex-shrink-0"
                  style={imgStyle} alt={image} key={image}
                  width={imgWidth}
                  height={imgHeight}
                  />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          <button className={previousClassName} onClick={this.handleClick('previous')} />
          <div className={styles.dots}>
            {this.buildDotsArray(slidesPerView)}
          </div>
          <button className={nextClassName} onClick={this.handleClick('next')} />
        </div>
      </div>
    );
  }
}
