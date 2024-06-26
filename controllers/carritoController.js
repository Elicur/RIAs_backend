let carrito = [
  {
    email: 'user@example.com',
    idProd: 1,
    cantidad: 3
  },
  {
    email: 'user@example.com',
    idProd: 2,
    cantidad: 2
  },
  ];
  
  exports.get = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const carro = carrito.filter(c => c.email == id);
    res.json(carro);
  };

  exports.add = (req, res) => {
    const newProd = req.body;
    carrito.push(newProd);
    res.status(201).json(newProd);
    console.log('Producto añadido:', newProd);
  };

  exports.delete = (req, res) => {}

  exports.deleteAll = (req, res) => {}
