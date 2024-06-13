let ordenes = [
    { id: 1, productos: ['1', '2'], fecha: '23/12/2024', cobro: 30, estado: 'Pendiente'},
    { id: 2, productos: ['2'], fecha: '22/12/2024', cobro: 20, estado: 'En Preparacion'},
  ];
  
  exports.getOrdenes = (req, res) => {
    res.json(ordenes);
  };

  exports.createOrden = (req, res) => {
    const newOrden = req.body;
    newOrden.id = ordenes.length ? ordenes[ordenes.length - 1].id + 1 : 1;
    ordenes.push(newOrden);
    res.status(201).json(newOrden);
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
