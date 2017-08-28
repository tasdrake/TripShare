import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Total extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Total',
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
    console.log(this.state.trip_users);
    return (
      <View>
        <Text>{this.state.totals.individualCost}</Text>
        <Text>{this.state.totals.total}</Text>

        {
          this.state.trip_users.map(e => {
            console.log(e);
            return (
              <Text key={e.id}>{e.name}     {e.amount_owed}</Text>
            );
          })
        }

        <TouchableOpacity onPress={() => navigate('Trips')}>
          <Text>Search Other Trips</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//
// });
