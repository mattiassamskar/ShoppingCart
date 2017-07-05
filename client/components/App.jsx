import React from 'react';
import axios from 'axios';
import ItemForm from './ItemForm.jsx';
import Item from './Item.jsx';

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
}

const ItemList = (props) => {
  return (
    <div>
      {props.items.map(item => <Item key={item.name} {...item} />)}
    </div>
  );
}