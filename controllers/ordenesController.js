let ordenes = [
  {
    id: 1,
    productos: [  
      { id: 4, cantidad: 1 },
      { id: 8, cantidad: 5 }
    ],
    fecha: '2024-06-25',
    cobro: 60,
    estado: 'Listo',
    cliente: 'user@example.com'
  },
  {
    id: 2,
    productos: [
      { id: 5, cantidad: 2 },
      { id: 7, cantidad: 2 }
    ],
    fecha: '2024-07-23',
    cobro: 94,
    estado: 'En Preparacion',
    cliente: 'user@example.com'
  },
  {
    id: 3,
    productos: [
      { id: 2, cantidad: 4 }
    ],
    fecha: '2024-07-28',
    cobro: 80,
    estado: 'Pendiente',
    cliente: 'user@example.com'
  }
  ];
  
  exports.getOrdenes = (req, res) => {
    res.json(ordenes);
  };

  exports.getOrdenById = (req, res) => {
    const { id } = req.params;
    const orden = ordenes.find(o => o.id == id);
    if (orden) {
      res.json(orden);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  };

  exports.getOrdenesByCliente = (req, res) => {
    const { cliente } = req.params;
    const ordenesCliente = ordenes.filter(o => o.cliente == cliente);
    if (ordenesCliente) {
      res.json(ordenesCliente);
    } else {
      res.status(404).json({ message: 'Ordenes no encontradas' });
    }
  };

  exports.createOrden = (req, res) => {
    const newOrden = req.body;
    newOrden.id = ordenes.length ? ordenes[ordenes.length - 1].id + 1 : 1;
    ordenes.push(newOrden);
    res.status(201).json(newOrden);
    console.log('Nueva Orden:', newOrden);
  };

  exports.updateOrden = (req, res) => {
    const { id } = req.params;
    const updatedOrden = req.body;
    const ordenIndex = ordenes.findIndex(p => p.id == id);
    if (ordenIndex !== -1) {
      ordenes[ordenIndex] = { ...ordenes[ordenIndex], ...updatedOrden };
      res.json(ordenes[ordenIndex]);
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  };

  exports.deleteProductoFromOrdenes = (req, res) => {
    const { idProducto } = req.params;
  
    // Eliminar el producto de todas las órdenes
    ordenes = ordenes.map(orden => ({
      ...orden,
      productos: orden.productos.filter(producto => producto.id != idProducto)
    }));
  
    // Eliminar las órdenes que se quedan sin productos
    ordenes = ordenes.filter(orden => orden.productos.length > 0);
  
    res.json({ message: `Producto con id ${idProducto} eliminado de todas las ordenes` });
    console.log(`Producto con id ${idProducto} eliminado de todas las ordenes`);
  };