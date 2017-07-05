import React from 'react';

export default class App extends React.Component {
  state = {
    items: [
      {
        name: 'milk',
        isActive: true
      },
      {
        name: 'butter',
        isActive: true
      },
      {
        name: 'soap',
        isActive: false
      }
    ]
  }

  render = () => {
    return (
      <div>
        <ItemForm addItem={this.addItem} />
        <ItemList items={this.state.items} />
      </div>
    );
  };

  addItem = (item) => {
    this.setState(prevState => ({items: prevState.items.concat(item)}));
  };
};

class ItemForm extends React.Component {
  state = {
    name: ''
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.addItem({name: this.state.name, isActive: true});
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
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      isActive: props.isActive
    };
  }

  handleClick = (event) => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  };

  render = () => {
    return (<div onClick={this.handleClick}>{this.state.name} {this.state.isActive.toString()}</div>);
  };
}