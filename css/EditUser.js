import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  user: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden'
  },
  name: {
    fontSize: 80,
  },
  newButton: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 16,
    color: colors.darkBrown,
    fontWeight: 'bold',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderRadius: 50,
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
  },
  shadow: {
    marginTop: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
};
