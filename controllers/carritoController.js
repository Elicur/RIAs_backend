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
    const carro = carrito.filter(c => c.email == id);
    res.json(carro);
  };

  exports.add = (req, res) => {
    const newProd = req.body;
    const existingProdIndex = carrito.findIndex(item =>
      item.email === newProd.email && item.idProd === newProd.idProd
    );
  
    if (existingProdIndex !== -1) {
      carrito[existingProdIndex].cantidad += newProd.cantidad;
      res.status(200).json(carrito[existingProdIndex]);
    } else {
      carrito.push(newProd);
      res.status(201).json(newProd);
    }
  };

  exports.delete = (req, res) => {
    const { email, id } = req.params;
    const index = carrito.findIndex(c => c.email == email && c.idProd == id);
    if (index > -1) {
      carrito.splice(index, 1);
      res.status(200).json({ message: `Producto ${id} eliminado` });
    } else {
      res.status(404).json({ message: `Producto ${id} no encontrado` });
    }
  }

  exports.deleteAll = (req, res) => {
    const { email } = req.params;
    const initialLength = carrito.length;
    carrito = carrito.filter(c => c.email !== email);
    if (carrito.length < initialLength) {
      res.status(200).json({ message: `Productos eliminados` });
    } else {
      res.status(404).json({ message: `Productos no encontrados` });
    }
  };
