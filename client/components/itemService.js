import axios from 'axios';
import { Observable, Observer } from 'rxjs';

export const whenItemsChanged =
  Observable.create(observer => {
    setInterval(
      () => {
        axios.get('/items')
          .then((resp) => {
            observer.next(resp.data);
          });
      }, 1000);
  });

export const addItem = (item) => {
  return axios.post('/items', item);
};

export const updateItem = (itemId, data) => {
  return axios.put('/items/' + itemId, data);
};