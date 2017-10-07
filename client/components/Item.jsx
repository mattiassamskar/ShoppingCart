import React from 'react';
import * as itemService from './itemService.js'

const Item = (props) => {
  const toggleIsActive = (event) => {
    itemService.updateItem({
      id: props.id,
      name: props.name,
      isActive: !props.isActive,
      sortOrder: props.sortOrder
    });
  };

  const moveItemUp = () => {
    props.moveItemUp(props.sortOrder);
  };

  const moveItemDown = () => {
    props.moveItemDown(props.sortOrder);
  };

  const deleteItem = () => {
    itemService.deleteItem(props.id);
  };

  const configElements = () => props.configMode ?
    <div>
      <div onClick={moveItemUp}>up</div>
      <div onClick={moveItemDown}>down</div>
      <div onClick={deleteItem}>delete</div>
    </div>
    : <div></div>;

  return (
    <div style={{ display: 'flex' }}>
      <div onClick={toggleIsActive}>{props.name}</div>
      <div>{props.isActive.toString()}</div>
      <div>{props.sortOrder}</div>
      {configElements}
    </div>
  );
}

export default Item;
