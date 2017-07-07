import React from 'react';
import ItemList from './ItemList.jsx';
import ItemForm from './ItemForm.jsx';
import * as itemService from './itemService.js'

export default class App extends React.Component {
  state = {
    socketStatus: ''
  };

  componentDidMount = () => {
    itemService.whenSocketStatusChanged.subscribe((socketStatus) => {
      this.setState({ socketStatus: socketStatus });
    });
  }

  render = () => {
    return (
      <div>
        <div>{this.state.socketStatus}</div>
        <ItemForm />
        <ItemList />
      </div>
    );
  };
}
