var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var items = [
  {
    id: '1',
    name: 'milk',
    isActive: true,
    sortOrder: 3
  },
  {
    id: '2',
    name: 'butter',
    isActive: true,
    sortOrder: 2
  },
  {
    id: '3',
    name: 'candy',
    isActive: false,
    sortOrder: 1
  }
];

io.on('connection', (socket) => {
  io.to(socket.id).emit('items', getItems());
});

app.get('/items', (req, res) => {
  res.send(getItems());
});

app.post('/items', (req, res) => {
  addItem(req.body.name);
  res.status(200).send();
  io.emit('items', getItems());
});

app.put('/items/:id', (req, res) => {
  updateItem(req.body.item);
  res.status(200).send();
  io.emit('items', getItems());
});

app.post('/items/reorder', (req, res) => {
  reorderItems(req.body.sortOrder1, req.body.sortOrder2);
  res.status(200).send();
  io.emit('items', getItems());
});

app.delete('/items/:id', (req, res) => {
  deleteItem(req.params.id);
  res.status(200).send();
  io.emit('items', getItems());
});

const deleteItem = (itemId) => {
  items = items.filter(item => item.id !== itemId);
};

const getItemById = (itemId) => {
  return getItems().find(item => item.id === itemId);
};

const getItemBySortOrder = (sortOrder) => {
  return getItems().find(item => item.sortOrder === sortOrder);
};

const getItems = () => {
  items.sort((item1, item2) => item1.sortOrder - item2.sortOrder);
  return items;
};

const updateItem = (updatedItem) => {
  var item = getItemById(updatedItem.id);

  item.name = updatedItem.name;
  item.isActive = updatedItem.isActive;
  item.sortOrder = updatedItem.sortOrder;
};

const reorderItems = (sortOrder1, sortOrder2) => {
  var item1 = getItemBySortOrder(sortOrder1);
  var item2 = getItemBySortOrder(sortOrder2);

  item1.sortOrder = sortOrder2;
  item2.sortOrder = sortOrder1;
};

const addItem = (name) => {
  const item = {
    id: Math.random().toString(),
    name: name,
    isActive: true,
    sortOrder: getNextSortOrder()
  };
  items = items.concat(item);
};

const getNextSortOrder = () => {
  const sortOrders = getItems().map(item => item.sortOrder);
  return Math.max(...sortOrders) + 1;
};

server.listen(3000, () => {
  console.log('Listening on port 3000')
});
