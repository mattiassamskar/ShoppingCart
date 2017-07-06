import axios from 'axios';
import { Observable, Observer } from 'rxjs';

export const whenItemsChanged =
  Observable.create(observer => {
    axios.get('/items')
      .then((resp) => {
        observer.next(resp.data);
      });
  });

export const addItem = (item) => {
  return axios.post('/items', item);
};

export const updateItem = (itemId, data) => {
  return axios.put('/items/' + itemId, data);
};