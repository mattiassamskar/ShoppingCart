import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  state = {
    items: []
  }

  componentDidMount = (props) => {
    axios.get('/items')
      .then((resp) => {
        this.setState({ items: resp.data });
      });
  };

  addItem = (item) => {
    axios.post('/items', item)
      .then((resp) => {
        this.setState(prevState => ({ items: prevState.items.concat(resp.data) }));
      });
  };

  render = () => {
    return (
      <div>
        <ItemForm addItem={this.addItem} />
        <ItemList items={this.state.items} />
      </div>
    );
  };
};

class ItemForm extends React.Component {
  state = {
    name: ''
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.addItem({ name: this.state.name, isActive: true });
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
};

const ItemList = (props) => {
  return (
    <div>
      {props.items.map(item => <Item key={item.name} {...item} />)}
    </div>
  );
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      isActive: props.isActive
    };
  }

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