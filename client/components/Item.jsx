import React from 'react';

const Item = (props) => {
  const handleClick = (event) => {
    props.updateItem(props.id, {
      isActive: !props.isActive
    });
  };
  return (<div onClick={handleClick}>{props.name} {props.isActive.toString()}</div>);
}

export default Item;
