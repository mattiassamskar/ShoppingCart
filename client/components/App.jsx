import React from 'react';

export default class App extends React.Component {
  state = {
    items: [
      {
        name: 'milk'
      },
        {
        name: 'butter'
      },
        {
        name: 'soap'
      }
    ]
  }

  render() {
    return (
      <div>
        <ItemList items={this.state.items}/>
      </div>
    );
  };
};

const ItemList = (props) => {
  return (
    <div>
      {props.items.map(item => <Item {...item} />)}
    </div>
  );
}

const Item = (props) => {
  return <div>{props.name}</div>;
}
