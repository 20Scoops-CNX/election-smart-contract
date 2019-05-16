const ModelViewer = require('metamask-logo');

const logoMetamask = ModelViewer({
  pxNotRatio: true,
  width: 200,
  height: 200,
  followMouse: true,
  followMotion: true
});

export default logoMetamask.container;
