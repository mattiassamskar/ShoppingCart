const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var items = [
  {
    id: '1',
    name: 'milk',
    isActive: true
  },
  {
    id: '2',
    name: 'butter',
    isActive: true
  },
  {
    id: '3',
    name: 'candy',
    isActive: false
  }
];

app.get('/items', (req, res) => {
  res.send(items);
});

app.post('/items', (req, res) => {
  const newItem = {
    id: Math.random().toString(),
    name: req.body.name,
    isActive: req.body.isActive
  };
  items = items.concat(newItem);
  res.send(newItem);
});

app.put('/items/:id', (req, res) => {
  var item = items.find((i) => {
    return i.id === req.params.id;
  });

  if (!item) {
    res.status(404).send();
    return;
  }

  item.isActive = req.body.isActive;
  res.send(item);
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
