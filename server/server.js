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

app.get('/', (req, res) => {
  res.send(items);
});

app.post('/', (req, res) => {
  items = items.concat({
    id: Math.random().toString(),
    name: req.body.name,
    isActive: req.body.isActive
  });
  res.status(200).send();
});

app.put('/:id', (req, res) => {
  var item = items.find((i) => {
    return i.id === req.params.id;
  });

  if (!item) {
    res.status(404).send();
    return;
  }

  item.isActive = req.body.isActive;
  res.status(200).send();
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
});
