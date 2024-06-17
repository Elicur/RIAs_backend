let insumos = [
    { id: 1, nombre: 'Harina', unidad: 'Kg' },
    { id: 2, nombre: 'Azúcar', unidad: 'Kg' },
    { id: 3, nombre: 'Leche', unidad: 'Lt' }
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
    const insumoIndex = insumos.findIndex(i => i.id == id);
    if (insumoIndex !== -1) {
        const deletedInsumo = insumos.splice(insumoIndex, 1);
        res.json(deletedInsumo);
    } else {
        res.status(404).json({ message: 'Insumo no encontrado' });
    }
}

exports.findInsumo = (id) => {
    return insumos.find(i => i.id === parseInt(id));
};
