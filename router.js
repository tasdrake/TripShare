import { StackNavigator } from 'react-navigation';
import Trips from '../components/Trips';
import TripUsers from '../components/TripUsers';
import Receipts from '../components/Receipts';
import Total from '../components/Total';
import NewTrip from '../components/NewTrip';
import NewUser from '../components/NewUser';
import EditUser from '../components/EditUser';
import Picture from '../components/Picture';

export const Root = StackNavigator({
  Trips: {
    screen: Trips
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
  NewUser: {
    screen: NewUser
  },
  EditUser: {
    screen: EditUser
  },
  Picture: {
    screen: Picture
  },
});
