import axios from 'axios';
import io from 'socket.io-client';
import { Observable, Observer } from 'rxjs/Observable';

export const whenItemsChanged =
  Observable.create(observer => {
    var socket = io.connect();
    socket.on('items', (data) => {
      observer.next(data);
    });
  });

export const addItem = (name) => {
  axios.post('/items', { name: name });
};

export const updateItem = (item) => {
  axios.put('/items/' + item.id, { item: item });
};

export const deleteItem = (itemId) => {
  axios.delete('/items/' + itemId);
};

export const reorderItems = (sortOrder1, sortOrder2) => {
  axios.post('/items/reorder', {
    sortOrder1: sortOrder1,
    sortOrder2: sortOrder2
  })
};
