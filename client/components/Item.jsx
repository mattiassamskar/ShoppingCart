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
    itemService.moveItemUp(props.sortOrder);
  };

  const moveItemDown = () => {
    itemService.moveItemDown(props.sortOrder);
  };

  return (
    <div style={{display:'flex'}}>
      <div onClick={toggleIsActive}>{props.name}</div>
      <div>{props.isActive.toString()}</div>
      <div>{props.sortOrder}</div>
      <div onClick={moveItemUp}>up</div>
      <div onClick={moveItemDown}>down</div>
    </div>
  );
}

export default Item;
