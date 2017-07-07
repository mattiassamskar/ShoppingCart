import React from 'react';
import Item from './Item.jsx';
import * as itemService from './itemService.js'

export default class ItemList extends React.Component {
  state = {
    items: []
  }

  componentDidMount = () => {
    itemService.whenItemsChanged.subscribe((items) => {
      this.setState({ items: items })
    });
  };

  render = () => {
    return (
      <div>
        {this.state.items.map(item => <Item key={item.id} {...item} />)}
      </div>
    );
  };
};