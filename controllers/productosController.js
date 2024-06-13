let productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción 1', imagen: '/uploads/prod1.jpg', precio: 10.0 },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción 2', imagen: '/uploads/prod2.jpg', precio: 20.0 }
  ];
  
  exports.getProductos = (req, res) => {
    const updatedProductos = productos.map(producto => {
      return {
        ...producto,
        imagen: `http://localhost:3000${producto.imagen}`
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
    newProducto.id = productos.length ? productos[productos.length - 1].id + 1 : 1;
    if (req.file) {
      newProducto.imagen = `/uploads/${req.file.filename}`;
    }
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
  