const productos = require('./productosController.js');

let insumos = [
    { id: 1, nombre: 'Harina', unidad: 'Kg' },
    { id: 2, nombre: 'Azúcar', unidad: 'Kg' },
    { id: 3, nombre: 'Leche', unidad: 'Lt' },
    { id: 4, nombre: 'Sal', unidad: 'Kg' },
    { id: 5, nombre: 'Aceite', unidad: 'Lt' },
    { id: 6, nombre: 'Huevos', unidad: 'Unidad/es' },
    { id: 7, nombre: 'Polvo de hornear', unidad: 'Kg' },
    { id: 8, nombre: 'Esencia de vainilla', unidad: 'Lt' },
    { id: 9, nombre: 'Cacao', unidad: 'Kg' },
    { id: 10, nombre: 'Manteca', unidad: 'Kg' },
    { id: 11, nombre: 'Levadura', unidad: 'Kg' },
    { id: 12, nombre: 'Dulce de leche', unidad: 'Kg' },
    { id: 13, nombre: 'Queso', unidad: 'Kg' },
    { id: 14, nombre: 'Jamón', unidad: 'Kg' },
    { id: 15, nombre: 'Chicharrones', unidad: 'Kg' },
    { id: 16, nombre: 'Almíbar', unidad: 'Lt' },
];

exports.getInsumos = (req, res) => {
    const updatedInsumos = insumos.map(insumo => {
        return {
            ...insumo
        };
    });
    res.json(updatedInsumos);
};

exports.getInsumoById = (req, res) => {
    const { id } = req.params;
    const insumo = insumos.find(i => i.id == id);
    if (insumo) {
        res.json(insumo);
    } else {
        res.status(404).json({ message: 'Insumo no encontrado' });
    }
}

exports.createInsumo = (req, res) => {
    const newInsumo = req.body;
    newInsumo.id = insumos.length ? insumos[insumos.length - 1].id + 1 : 1;
    insumos.push(newInsumo);
    res.status(201).json(newInsumo);
}

exports.updateInsumo = (req, res) => {
    const { id } = req.params;
    const updatedInsumo = req.body;
    const insumoIndex = insumos.findIndex(i => i.id == id);
    if (insumoIndex !== -1) {
        insumos[insumoIndex] = { ...insumos[insumoIndex], ...updatedInsumo };
        res.json(insumos[insumoIndex]);
    } else {
        res.status(404).json({ message: 'Insumo no encontrado' });
    }
}

exports.deleteInsumo = (req, res) => {
    const { id } = req.params;
    console.log('id en insumos:', id);
    const insumoIndex = insumos.findIndex(i => i.id == id);
    if (insumoIndex !== -1) {
        productos.removeInsumoFromProducts(id);
        const deletedInsumo = insumos.splice(insumoIndex, 1);
        res.json(deletedInsumo);
    } else {
        res.status(404).json({ message: 'Insumo no encontrado' });
    }
}

exports.findInsumo = (id) => {
    return insumos.find(i => i.id === parseInt(id));
};
