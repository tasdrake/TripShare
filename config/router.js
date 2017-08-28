import { StackNavigator } from 'react-navigation';
import Trips from '../components/Trips';
import TripUsers from '../components/TripUsers';

export const Root = StackNavigator({
  Trips: {
    screen: Trips,
  },
  TripUsers: {
    screen: TripUsers
  }
});
