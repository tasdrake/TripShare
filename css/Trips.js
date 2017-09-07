import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.lightYellow,
    backgroundColor: 'transparent'
  },
  trips: {
    marginVertical: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden'
  },
  newTrip: {
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
    }
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderRadius: 20,
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
  },
  topContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 10
  },
  search: {
    borderBottomColor: colors.lightYellow,
    width: 340
  },
  search1: {
    width: 230,
    borderBottomColor: colors.lightYellow
  },
  shadow: {
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
    },
    marginLeft: 10,
    marginTop: 10
  }
};
