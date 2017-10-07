import React from 'react';
import ItemList from './ItemList.jsx';
import ItemForm from './ItemForm.jsx';
import * as itemService from './itemService.js'

export default class App extends React.Component {
  state = {
    socketStatus: '',
    configMode: false
  };

  toggleConfigMode = () => {
    this.setState(prevState => ({configMode : !prevState.configMode}));
  };

  componentDidMount = () => {
    itemService.whenSocketStatusChanged.subscribe((socketStatus) => {
      this.setState({ socketStatus: socketStatus });
    });
  };

  render = () => {
    return (
      <div>
        <div>SocketStatus: {this.state.socketStatus}</div>
        <div onClick={this.toggleConfigMode}>ConfigMode: {this.state.configMode.toString()}</div>
        <ItemForm />
        <ItemList />
      </div>
    );
  };
}
