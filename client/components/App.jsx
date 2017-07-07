import React from 'react';
import ItemList from './ItemList.jsx';
import ItemForm from './ItemForm.jsx';

export default class App extends React.Component {
  render = () => {
    return (
      <div>
        <ItemForm />
        <ItemList />
      </div>
    );
  };
}
