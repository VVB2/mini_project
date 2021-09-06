import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

const Test = ({ data }) => (
  <div className="fluid">
    <div className="fluid__image-container">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            width: 446,
            height: 446,
            src: 'https://images.metmuseum.org/CRDImages/ad/web-large/DT280515.jpg',
          },
          largeImage: {
            src: 'https://images.metmuseum.org/CRDImages/ad/web-large/DT280515.jpg',
            width: 1200,
            height: 1800,
          },
          enlargedImageContainerDimensions: {
            width: '200%',
            height: '180%',
          },
          shouldUsePositiveSpaceLens: true,
        }}
      />
    </div>
  </div>
);

export default Test;
