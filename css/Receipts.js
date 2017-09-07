import { Dimensions } from 'react-native';
import colors from './colors';
const { height, width } = Dimensions.get('window');

module.exports = {
  user: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden'
  },
  name: {
    fontSize: 80,
    color: colors.lightYellow,
    backgroundColor: 'transparent'
  },
  form: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 15
  },
  box: {
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderRadius: 50
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width
  },
  button: {
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
  shadow1: {
    marginBottom: 100,

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
  editButton: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 12,
    color: colors.darkBrown,
    fontWeight: 'bold',
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  shadow2: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkYellow,
    backgroundColor: colors.darkYellow,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 1,
      height: 1
    },
    marginTop: 10
  },
  addButton: {
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
  shadow3: {
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
    marginBottom: 60
  }
};
