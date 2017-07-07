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
  const item = {
    id: Math.random().toString(),
    name: req.body.name,
    isActive: req.body.isActive
  };
  addItem(item);

  res.status(200).send();
  io.emit('items',  getItems());
});

app.put('/items/:id', (req, res) => {
  var item = getItemById(req.params.id);

  if (!item) {
    res.status(404).send();
    return;
  }
  item.isActive = req.body.isActive;

  res.status(200).send();
  io.emit('items', getItems());
});

app.post('/items/reorder', (req, res) => {
  var item1 = getItemById(req.params.itemIds[0]);
  var item2 = getItemById(req.params.itemIds[1]);
  
  const sortOrder1 = item1.sortOrder;
  const sortOrder2 = item2.sortOrder;

  item1.sortOrder = sortOrder2;
  item2.sortOrder = sortOrder1;

  res.status(200).send();
  io.emit('items', getItems());
});

const getItemById = (id) => {
  return getItems().find((item) => {
    return item.id === id;
  });
};

const getItems = () => {
  items.sort((item1, item2) => {
    return item1.sortOrder - item2.sortOrder;
  });
  return items;
};

const addItem = (item) => {
  const sortOrders = getItems().map((item) => item.sortOrder);
  item.sortOrder = Math.max(...sortOrders) + 1;
  items = items.concat(item);
};

server.listen(3000, () => {
  console.log('Listening on port 3000')
});
