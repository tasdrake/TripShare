import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from 'react-native-elements';
const {height, width} = Dimensions.get('window');

// import styles from '../css/TripUsers';
// import colors from '../css/colors';

export default class Total extends React.Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent',  top: 0, left: 0, right: 0, borderBottomWidth: 0,},
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
        <List containerStyle={{marginBottom: 20, marginTop: 0, backgroundColor: 'transparent', borderColor: '#e4ad5a', borderBottomColor: '#e4ad5a'}}>
          <ListItem hideChevron title={`Trip cost: $${this.state.totals.total}`} rightTitle={`Individual cost: $${this.state.totals.individualCost}`} rightTitleStyle={{color: '#ffd391', fontSize: 18}} titleStyle={{color: '#ffd391', fontSize: 18}} containerStyle={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#e4ad5a', borderBottomColor: '#e4ad5a'}}/>
          {
            this.state.trip_users.sort((a, b) => (a.name > b.name) ? 1 : -1).map(e => {
              const color = Number(e.amount_owed) > 0 ? 'rgb(249, 67, 0)' : 'rgb(33, 219, 2)';
              const amount = Number(e.amount_owed) > 0 ? e.amount_owed : e.amount_owed.slice(1);
              const touchColor = this.state.admin[0].id === this.state.admin_id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)';
              return (
                <ListItem roundAvatar avatar={{ uri: e.image_url }} key={e.id} title={e.name} titleStyle={{color: '#ffd391', fontSize: 18}} rightTitle={amount} rightTitleStyle={{color, fontSize: 18}} hideChevron subtitle={e.paid ? 'paid' : null}
                onPress={() => this.pay(e)} subtitleStyle={{fontSize: 14, color: '#e4ad5a'}} containerStyle={{backgroundColor: 'rgba(255,255,255,0.2)', borderColor: '#e4ad5a', borderBottomColor: '#e4ad5a'}} underlayColor={touchColor} />
              );
            })
          }
        </List>
        </ScrollView>

        <View style={{alignItems: 'center', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.shadow}>
            <TouchableOpacity onPress={() => navigate('Trips', {admin: this.state.admin[0]})}>
              <Text style={styles.footer}>Search Other Trips</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shadow}>
            <TouchableOpacity onPress={this.deleteTrip}>
              <Text style={styles.footer}>End Trip</Text>
            </TouchableOpacity>
          </View>
          {/* <View shadowOpacity={ 0.7 } style={{ height: 44, width: 200, borderRadius: 10, shadowOffset: {width: 1, height: 1}, marginTop: -49, zIndex: -1, marginBottom: 12, backgroundColor: 'transparent'}}></View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,

  },
  footer: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    // padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    fontSize: 16,
    color: '#2a0001',
    fontWeight: 'bold',
    // width: 200,
    // marginTop: 10,
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
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
  },
  backgroundimage: {
    position: 'absolute',
    height,
    width,
    // opacity: 0.3
  },
  shadow: {
    // marginTop: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e4ad5a',
    backgroundColor: '#e4ad5a',
    padding: 12,
    borderRadius: 10,
    width: 180,
    // overflow: 'hidden',
    shadowOpacity: 0.7,
    shadowOffset: {width: 1, height: 1},
    marginTop: 10,
  },
});
