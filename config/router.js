import { StackNavigator } from 'react-navigation';
import Trips from '../components/Trips';
import TripUsers from '../components/TripUsers';
import Receipts from '../components/Receipts';
import Total from '../components/Total';
import NewTrip from '../components/NewTrip';

export const Root = StackNavigator({
  Trips: {
    screen: Trips,
  },
  TripUsers: {
    screen: TripUsers
  },
  Receipts: {
    screen: Receipts
  },
  Total: {
    screen: Total
  },
  NewTrip: {
    screen: NewTrip
  },
});
