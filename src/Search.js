import React, {Component} from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    if(!this.state.search.trim()) return alert('Debe ingresar ubicación');
    this.props.searchOnSubmit(this.state.search);
  }

  onInputChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <form className="form-inline" role="search" onSubmit={this.submitForm}>
        <h2 className="page-header">
          Ingresar ubicación
        </h2>
        <div className="input-group">
          <input
            onChange={this.onInputChange}
            value={this.state.search}
            className="form-control"
            placeholder="Escribe tu busqueda"
            id="input-search"
          />

          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit">
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}