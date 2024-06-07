let ordenes = [
    { id: 1, productos: ['Producto 1', 'Producto 2'], fecha: '23/12/2024', cobro: 30, estado: 'Pendiente'},
    { id: 2, productos: ['Producto 2'], fecha: '22/12/2024', cobro: 20, estado: 'En Preparacion'},
  ];
  
  exports.getOrdenes = (req, res) => {
    const updatedOrdenes = ordenes.map(orden => {
      return {
        ...orden,
      };
    });
    res.json(ordenes);
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
