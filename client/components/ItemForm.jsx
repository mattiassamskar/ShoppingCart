import React from 'react';
import * as itemService from './itemService.js'

export default class ItemForm extends React.Component {
  state = {
    name: ''
  };

  handleClick = (event) => {
    event.preventDefault();
    itemService.addItem(this.state.name);
    this.setState({name: ''});
  };

  render() {
    return (
      <div>
        <form>
          <input value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })} />
          <button onClick={this.handleClick}>Add</button>
        </form>
      </div>
    );
  };
}