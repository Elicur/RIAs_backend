let ordenes = [
  {
    id: 1,
    productos: [
      { id: '1', cantidad: 3 },
      { id: '2', cantidad: 2 }
    ],
    fecha: '23/12/2024',
    cobro: 30,
    estado: 'Pendiente',
    cliente: 'user@example.com'
  },
  {
    id: 2,
    productos: [
      { id: '2', cantidad: 1 }
    ],
    fecha: '28/12/2024',
    cobro: 20,
    estado: 'En Preparacion',
    cliente: 'user@example.com'
  },
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
