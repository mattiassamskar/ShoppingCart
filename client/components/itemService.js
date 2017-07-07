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

export const moveItemUp = (itemSortOrder) => {
  axios.post('/items/reorder', {
    sortOrder1: itemSortOrder,
    sortOrder2: itemSortOrder - 1
  })
};

export const moveItemDown = (itemSortOrder) => {
  axios.post('/items/reorder', {
    sortOrder1: itemSortOrder,
    sortOrder2: itemSortOrder + 1
  })
};
