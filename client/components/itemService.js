import axios from 'axios';
import io from 'socket.io-client';
import { Observable, Observer } from 'rxjs/Observable';

const socket = io.connect();

export const whenItemsChanged =
  Observable.create(observer => {
    socket.on('items', (data) => {
      observer.next(data);
    });
  });

export const whenSocketStatusChanged =
  Observable.create(observer => {
    socket.on('connect', () => {
      observer.next('Connected');
    });
    socket.on('error', () => {
      observer.next('Offline');
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
