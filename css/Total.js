import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  container: {
    flex: 1,
    paddingTop: 60
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
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  people: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10
  },
  positive: {
    color: 'green'
  },
  negative: {
    color: 'red'
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
  },
  shadow: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    padding: 12,
    borderRadius: 10,
    width: 180,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    marginTop: 10
  },
  list: {
    marginBottom: 20,
    marginTop: 0,
    backgroundColor: 'transparent',
    borderColor: colors.darkYellow,
    borderBottomColor: colors.darkYellow
  },
  rightTitle: {
    color: colors.lightYellow,
    fontSize: 18
  },
  title: {
    color: colors.lightYellow,
    fontSize: 18
  },
  titleContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: colors.darkYellow,
    borderBottomColor: colors.darkYellow
  },
  rowTitle: {
    color: colors.lightYellow,
    fontSize: 18
  },
  rowSubtitle: {
    fontSize: 14,
    color: colors.darkYellow
  },
  rowContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: colors.darkYellow,
    borderBottomColor: colors.darkYellow
  },
  foot: {
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};
