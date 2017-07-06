import React from 'react';
import Item from './Item.jsx';

const ItemList = (props) => {
  return (
    <div>
      {props.items.map(item => <Item key={item.id} updateItem={props.updateItem} {...item} />)}
    </div>
  );
};

export default ItemList;
