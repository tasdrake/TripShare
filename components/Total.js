import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import styles from '../css/Total';

export default class Total extends React.Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0
    },
    headerTintColor: '#e4ad5a',
  };

  constructor(props) {
    super(props);
    this.state = {
      trip_users: [],
      trip_id: this.props.navigation.state.params.trip_id,
      totals: {},
      admin: this.props.navigation.state.params.admin,
      admin_id: this.props.navigation.state.params.admin_id,
      name: this.props.navigation.state.params.name,
    };
  }
  componentDidMount() {
    fetch(`https://split-trip.herokuapp.com/total/rough/${this.state.trip_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        }
    })
    .then(result => result.json())
    .then(trip_users => {
      const totals = trip_users.shift();
      if (String(totals.total).includes('.')) {
        totals.total = Number(String(totals.total).slice(0, String(totals.total).indexOf('.')));
      }
      if (String(totals.individualCost).includes('.')) {
        totals.individualCost = Number(String(totals.individualCost).slice(0, String(totals.individualCost).indexOf('.')));
      }
      this.setState({ trip_users, totals });
    });
  }

  pay = (e) => {
    if (this.state.admin[0].id === this.state.admin_id) {
      const text = e.amount_owed < 0 ? `Did ${e.name} receive all money owed?` : `Did ${e.name} fully pay?`;
      Alert.alert(
        text,
        null,
        [
          {text: 'No', onPress: () => this.update(e, false), style: 'cancel'},
          {text: 'Yes', onPress: () => this.update(e, true)},
        ],
        { cancelable: false }
      );
    }
  }

  update = (e, bool) => {
    if (e.paid === bool) return;
    e.paid = !e.paid;
    const trip_users = [...this.state.trip_users];
    for (let i = 0; i < trip_users.length; i++) {
      if (trip_users[i].id === e.id) {
        trip_users[i] = e;
        break;
      }
    }
    this.setState({ trip_users });
    fetch(`https://split-trip.herokuapp.com/users/${e.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({paid: e.paid})
    });
  }

  deleteTrip = () => {
    if (this.state.trip_users.every(e => e.paid)) {
      Alert.alert(
        `Are you sure you want to end ${this.state.name}`,
        'This will delete the trip',
        [
          {text: 'No', onPress: () => {} , style: 'cancel'},
          {text: 'Yes', onPress: () => this.del()},
        ],
        { cancelable: false }
      );
    }
  }

  del = () => {
    fetch(`https://split-trip.herokuapp.com/trips/${this.state.trip_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      const { navigate } = this.props.navigation;
      navigate('Trips', {admin: this.state.admin[0]});
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Image source={require('../css/background2.png')} style={styles.backgroundimage}></Image>

        <ScrollView>
          <List containerStyle={styles.list}>
            <ListItem hideChevron title={`Trip cost: $${this.state.totals.total}`}
              rightTitle={`Individual cost: $${this.state.totals.individualCost}`}
              rightTitleStyle={styles.rightTitle}
              titleStyle={styles.title}
              containerStyle={styles.titleContainer}/>
            {
              this.state.trip_users.sort((a, b) => (a.name > b.name) ? 1 : -1).map(e => {
                const color = Number(e.amount_owed) > 0 ? 'rgb(249, 67, 0)' : 'rgb(33, 219, 2)';
                const amount = Number(e.amount_owed) > 0 ? e.amount_owed : e.amount_owed.slice(1);
                const touchColor = this.state.admin[0].id === this.state.admin_id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';

                return (
                  <ListItem roundAvatar
                    avatar={{ uri: e.image_url }}
                    key={e.id}
                    title={e.name}
                    titleStyle={styles.rowTitle}
                    rightTitle={amount}
                    rightTitleStyle={{color, fontSize: 18}}
                    hideChevron subtitle={e.paid ? 'paid' : null}
                    onPress={() => this.pay(e)}
                    subtitleStyle={styles.rowSubtitle}
                    containerStyle={styles.rowContainer}
                    underlayColor={touchColor} />
                );
              })
            }
          </List>
        </ScrollView>

        <View style={styles.foot}>
          <View style={styles.shadow}>
            <TouchableOpacity onPress={() => navigate('Trips', {admin: this.state.admin[0]})}>
              <Text style={styles.footer}>
                Search Other Trips
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shadow}>
            <TouchableOpacity onPress={this.deleteTrip}>
              <Text style={styles.footer}>
                End Trip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
