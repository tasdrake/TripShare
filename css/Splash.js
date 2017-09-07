import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  avatar: {
    margin: 20
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  tripButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    padding: 12,
    borderRadius: 10,
    width: 350,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    marginVertical: 50
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.darkBrown,
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  image: {
    position: 'absolute',
    height,
    width,
  },
  shadow: {
    borderRadius: 10,
    borderColor: '#3b5998',
    borderWidth: 1,
    backgroundColor: '#3b5998',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    width: 350,
    marginVertical: 50
  }
};
