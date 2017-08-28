import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'

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
      this.setState({ trip_users, totals });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text>{this.state.totals.individualCost}</Text>
          <Text>{this.state.totals.total}</Text> */}

          {
            this.state.trip_users.map(e => {
              return (
                <View key={e.id} style={styles.people}>
                  <Text>{e.name}</Text>
                  <Text>{e.amount_owed}</Text>
                  <Text>{e.paid ? 'true' : 'false'}</Text>
                </View>
              );
            })
          }

        </ScrollView>
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
  }
});
