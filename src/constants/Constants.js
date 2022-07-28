import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const COLORS = {
  primary: '#FF7A7A',
  background: '#f4f4f4',
  white: '#fff',
  black: '#111111',
  error: '#f86e87',
  warning: '#fdac71',
  success: '#6adaa4',
  gray: '#aaa',
};

export const PADDING = {
  xsPadding: 5,
  smPadding: 10,
  mdPadding: 15,
  lgPadding: 20,
  xlPadding: 25,
};

export const RADIUS = {
  xsRadius: 10,
  smRadius: 15,
  mdRadius: 20,
  lgRadius: 25,
  xlRadius: 30,
};

export const FONTS = {
  h1: 35,
  h2: 30,
  h3: 25,
  h4: 20,
  h5: 15,
  h6: 10,
};

export const ICONS = {
  smIcon: 15,
  mIcon: 20,
  lIcon: 25,
  xlIcon: 30,
};

export const ProfilePhoto = {
  PhotoWidth: width * 0.17,
  PhotoHeight: height * 0.078,
};
