const hospitalModel = {
  id: { type: 'integer', description: 'ID del hospital' },
  nombre: { type: 'string', description: 'Nombre del hospital' },
  direccion: { type: 'string', description: 'Dirección del hospital' }
};

const usuarioModel = {
  id: { type: 'integer', description: 'ID del usuario' },
  email: { type: 'string', description: 'Email del usuario' },
  password: { type: 'string', description: 'Contraseña del usuario' },
  role: { type: 'string', description: 'Rol del usuario' },
  telefono: { type: 'string', description: 'Teléfono del usuario' },
  enabled: { type: 'boolean', description: 'Estado del usuario (habilitado o deshabilitado)' }
};

module.exports = { hospitalModel, usuarioModel };
