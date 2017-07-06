import React from 'react';
import ItemForm from './ItemForm.jsx';
import Item from './Item.jsx';
import * as itemService from './itemService.js'

export default class App extends React.Component {
  state = {
    items: []
  }

  componentDidMount = () => {
    itemService.whenItemsChanged.subscribe((items) => {
      this.setState({ items: items })
    });
  };

  addItem = (item) => {
    itemService.addItem(item)
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