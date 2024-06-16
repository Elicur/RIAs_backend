let productos = [
    { 
      id: 1, 
      nombre: 'Producto 1', 
      descripcion: 'Descripción 1', 
      imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', 
      precio: 10.0, 
      insumos: [
        { id: 1, cantidad: 1.2 }, // 2 Kg de Harina
        { id: 2, cantidad: 0.2 },
        { id: 3, cantidad: 1 }
      ]
    },
    { 
      id: 2, 
      nombre: 'Producto 2', 
      descripcion: 'Descripción 2', 
      imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', 
      precio: 20.0, 
      insumos: [
        { id: 2, cantidad: 0.5 },
        { id: 3, cantidad: 0.7 }
      ]
    }
  ];
  
  const e = require('cors');
  const insumos = require('./insumosController.js');

  exports.getProductos = (req, res) => {
    const updatedProductos = productos.map(producto => {
      return {
        ...producto,
        imagen: `http://localhost:3000${producto.imagen}`,
        insumos: producto.insumos.map(pi => ({
          ...pi,
          insumo: insumos.findInsumo(pi.id)
        }))
      };
    });
    res.json(updatedProductos);
  };
  
  exports.getProductoById = (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id == id);
    if (producto) {
      res.json({
        ...producto,
        imagen: `http://localhost:3000${producto.imagen}`
    });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  };
  
  exports.createProducto = (req, res) => {
    const newProducto = req.body;

    if (newProducto.insumos) {
      try {
        if (!Array.isArray(newProducto.insumos)) {
          throw new Error('Los insumos deben ser un arreglo de objetos.');
        }
        newProducto.insumos = newProducto.insumos.map(pi => ({
          id: pi.insumoId,
          cantidad: pi.cantidad,
          insumo: insumos.findInsumo(pi.insumoId)
        }));
      }
      catch (error) {
        console.error('Error al analizar los insumos:', error);
        newProducto.insumos = [];
      }
    }
    else {
      newProducto.insumos = [];
    }

    newProducto.id = productos.length ? productos[productos.length - 1].id + 1 : 1;
    if (req.file) {
      newProducto.imagen = `/uploads/${req.file.filename}`;
    }

    console.log('Nuevo Producto:', newProducto);
    productos.push(newProducto);
    res.status(201).json(newProducto);
  };

  exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const updatedProducto = req.body;
  
    if (req.file) {
      updatedProducto.imagen = `/uploads/${req.file.filename}`;
    }
    else {
      const existingProducto = productos.find(p => p.id == id);
      if (existingProducto) {
        updatedProducto.imagen = existingProducto.imagen;
      }
    }
  
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex !== -1) {
      productos[productoIndex] = { ...productos[productoIndex], ...updatedProducto };
      res.json(productos[productoIndex]);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  };
  
  const fs = require('fs');
  const path = require('path');

  exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex !== -1) {
      const [deletedProducto] = productos.splice(productoIndex, 1);
      console.log('Producto eliminado:', deletedProducto);

      if (deletedProducto.imagen) {
        console.log('URL de la imagen:', deletedProducto.imagen);
        
        // Construir la ruta completa de la imagen
        const imagePath = path.join(__dirname, '..', deletedProducto.imagen);

        console.log('Ruta de la imagen:', imagePath);

        // Eliminar el archivo de imagen
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error al eliminar la imagen:', err);
          } else {
            console.log('Imagen eliminada:', imagePath);
          }
        });
      } else {
        console.log('No hay imagen asociada con este producto.');
      }

      res.json(deletedProducto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  };
  