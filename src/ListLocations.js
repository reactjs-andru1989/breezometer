import React, {Component} from 'react';

export default class ListLocations extends Component {
  printLocations() {
    if (this.props.locations) {
      return this.props.locations.map((location) => {
        return(
          <tr key={Math.random()}>
            <td>{location.search}</td>
            <td>{location.country}</td>
            <td>{location.quality}</td>
            <td style={{ backgroundColor: location.color }}></td>
          </tr>
        )
      })
    }
  }

  render() {
    return(
      <div className="container">
        <h2 className="page-header">Busquedas anteriores</h2>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th className="text-center">Busqueda</th>
              <th className="text-center">Pais</th>
              <th className="text-center">Calidad del aire</th>
              <th width="15%"></th>
            </tr>
          </thead>
          <tbody>
            {this.printLocations()}
          </tbody>
        </table>
      </div>
    )
  }
}