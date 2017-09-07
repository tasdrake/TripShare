import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.lightYellow
  },
  users: {
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 30
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  footer: {
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
    shadowOffset: {width: 1, height: 1},
  },
  newUser: {
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
    shadowOffset: {width: 1, height: 1},
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    borderRadius: 50,
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
  },
  search: {
    borderBottomColor: colors.lightYellow,
    width: 340,
  },
  search1: {
    width: 210,
    borderBottomColor: '#ffd391'
  },
  topContainer: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
  shadow: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    padding: 12,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    marginLeft: 10,
    marginTop: 10,
  },
  shadow2: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    padding: 12,
    borderRadius: 10,
    width: 200,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    marginTop: 10
  },
  foot: {
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 10,
  }
};
