import React from 'react';
import axios from 'axios';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      isActive: props.isActive
    };
  };

  handleClick = (event) => {
    axios.put('/items/' + this.state.id, {
      isActive: !this.state.isActive
    }).then((resp) => {
      this.setState(resp.data);
    });
  };

  render = () => {
    return (<div onClick={this.handleClick}>{this.state.name} {this.state.isActive.toString()}</div>);
  };
}