import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

module.exports = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height,
    width
  }
};
