import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';
import axios from 'axios';
import ListLocations from './ListLocations';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      locations: JSON.parse(localStorage.getItem('locations'))
    });
  }

  locationObject(search, data) {
    return {
      search:   search,
      country:  data.country_name,
      quality:  data.breezometer_description,
      color:    data.breezometer_color
    }
  }

  cleanLocations(locations) {
    if(locations.length > 5) {
      locations.reverse().pop();
      locations.reverse();
    }
  }

  appendToStorage(name, data){
    let old = localStorage.getItem(name);
    if(old === null) {
      localStorage.setItem(name, `[${data}]`);
    } else {
      let locations = JSON.parse(old);
      locations.push(JSON.parse(data));
      this.cleanLocations(locations);
      localStorage.setItem(name, JSON.stringify(locations));
    }
  }

  apiSearch(searchObject) {
    if (searchObject.state.search === '') return;
    searchObject.setState({isDisabled: true});

    const API_KEY = '219457862e614e5aaaf25ec8d98000ee'
    const URL     = 'http://api.breezometer.com/baqi/?'

    axios.get(`${URL}location=${searchObject.state.search}&key=${API_KEY}`).then(
      (success) => {
        if (success.data.data_valid) {
          const object = this.locationObject(searchObject.state.search, success.data);
          this.appendToStorage('locations', JSON.stringify(object));
          this.setState({
            locations: JSON.parse(localStorage.getItem('locations')).reverse()
          });
        } else {
          alert(success.data.error.message);
        }
      },
      (error) => {
        alert(error.data.error.message);
      }
    ).then(() => {
      document.getElementById('input-search').value = ""
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>BreezoMeter</h2>
        </div>

        <div className="App-intro">
          <Search searchOnSubmit={searchObject => this.apiSearch(searchObject)} />
          <ListLocations locations={this.state.locations} />
        </div>
      </div>
    );
  }
}