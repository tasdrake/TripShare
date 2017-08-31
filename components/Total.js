import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';

export default class Total extends React.Component {
  static navigationOptions = {
    // header: null,
    // title: 'Total',
  };

  constructor(props) {
    super(props);
    this.state = {
      trip_users: [],
      trip_id: this.props.navigation.state.params.trip_id,
      totals: {}
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List containerStyle={{marginBottom: 20, marginTop: 0}}>
          <ListItem hideChevron title={`Trip cost: $${this.state.totals.total}`} rightTitle={`Individual cost: $${this.state.totals.individualCost}`} rightTitleStyle={{color: 'black', fontSize: 15}} titleStyle={{color: 'black', fontSize: 15}}/>
          {
            this.state.trip_users.sort((a, b) => (a.name > b.name) ? 1 : -1).map(e => {
              const color = Number(e.amount_owed) > 0 ? 'red' : 'green';
              const amount = Number(e.amount_owed) > 0 ? e.amount_owed : e.amount_owed.slice(1);
              return (
                <ListItem roundAvatar avatar={{ uri: e.image_url }} key={e.id} title={e.name} rightTitle={amount} rightTitleStyle={{color}} hideChevron subtitle={e.paid ? 'paid' : null} onPress={() => this.pay(e)} subtitleStyle={{fontSize: 12}}/>
              );
            })
          }
        </List>

        <View>
          <TouchableOpacity onPress={() => navigate('Trips')}>
            <Text style={styles.footer}>Search Other Trips</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    textAlign: 'center',
    marginBottom: 10,
  },
  people: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  positive: {
    color: 'green'
  },
  negative: {
    color: 'red'
  }
});
