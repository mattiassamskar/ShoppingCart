import axios from 'axios';
import io from 'socket.io-client';
import { Observable, Observer } from 'rxjs/Observable';

export const whenItemsChanged =
  Observable.create(observer => {
    var socket = io.connect('http://localhost:3000');
    socket.on('items', (data) => {
      observer.next(data);
    });
  });

export const addItem = (item) => {
  axios.post('/items', item);
};

export const updateItem = (itemId, data) => {
  axios.put('/items/' + itemId, data);
};