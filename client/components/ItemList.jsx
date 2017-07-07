import React from 'react';
import Item from './Item.jsx';
import * as itemService from './itemService.js'

export default class ItemList extends React.Component {
  state = {
    items: []
  }

  moveItemUp = (itemSortOrder) => {
    const sortOrders = this.state.items
      .map(item => item.sortOrder)
      .filter(s => s < itemSortOrder);

    if (sortOrders.length == 0) return;

    itemService.reorderItems(itemSortOrder, Math.max(...sortOrders));
  };

  moveItemDown = (itemSortOrder) => {
    const sortOrders = this.state.items
      .map(item => item.sortOrder)
      .filter(s => s > itemSortOrder);

    if (sortOrders.length == 0) return;

    itemService.reorderItems(itemSortOrder, Math.min(...sortOrders));
  };

  componentDidMount = () => {
    itemService.whenItemsChanged.subscribe((items) => {
      this.setState({ items: items })
    });
  };

  render = () => {
    return (
      <div>
        {this.state.items.map(item =>
          <Item key={item.id}
            moveItemUp={this.moveItemUp}
            moveItemDown={this.moveItemDown}
            {...item}
          />)}
      </div>
    );
  };
};