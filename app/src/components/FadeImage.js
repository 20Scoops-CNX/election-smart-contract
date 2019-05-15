import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const getHeight = ({ imageWidth, imageHeight }) =>
  (imageHeight * 100) / imageWidth;

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: ${getHeight}%;
  position: relative;
  overflow: hidden;
`;

const RealImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.4s;
  object-fit: ${({ fit }) => fit};
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  filter: blur(25px);
  transform: scale(1.02);
  background-image: url(${({ src }) => src});
  background-size: ${({ fit }) => fit || 'cover'};
  transition: opacity 0.4s;
`;

const transitionPlacholderStyle = {
  exiting: {
    opacity: 0
  },
  exited: {
    display: 'none'
  }
};

const transitionRealImageStyle = {
  exiting: {
    opacity: 1
  },
  exited: {
    opacity: 1
  }
};

class FadeImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    preSrc: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    fit: PropTypes.string
  };

  static defaultProps = {
    fit: ''
  };

  state = {
    isFetching: true
  };

  fetchImage = () => {
    const { src } = this.props;
    this.setState({
      isFetching: true
    });
    const image = new Image();
    image.onload = () => {
      this.setState({
        isFetching: false
      });
    };
    image.onerror = () => {
      this.setState({
        isFetching: false
      });
    };
    image.src = src;
  };

  getImageProps = () => {
    const { imageWidth, imageHeight } = this.props;
    return {
      imageWidth,
      imageHeight
    };
  };

  componentDidMount() {
    this.fetchImage();
  }

  componentDidUpdate({ src: prevSrc }) {
    const { src } = this.props;
    if (prevSrc !== src) {
      this.fetchImage();
    }
  }

  render() {
    const { isFetching } = this.state;
    const { src, preSrc, fit, className } = this.props;

    return (
      <Transition in={isFetching} timeout={400}>
        {state => (
          <Wrapper className={className} {...this.getImageProps()}>
            <Placeholder
              src={preSrc}
              style={transitionPlacholderStyle[state]}
              fit={fit}
            />
            <RealImage
              src={src}
              style={transitionRealImageStyle[state]}
              fit={fit}
            />
          </Wrapper>
        )}
      </Transition>
    );
  }
}

export default FadeImage;
