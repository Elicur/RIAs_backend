const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { get } = require('../routes/usuarios');
const usuarios = [];

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email:user.email, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
};

// Función para crear usuarios por defecto
const createDefaultUsers = async () => {
  const defaultUsers = [
    { email: 'admin@example.com', password: 'admin123', role: 'ADMIN', telefono: '123456789' },
    { email: 'panadero@example.com', password: 'panadero123', role: 'PANADERO', telefono: '987654321' },
    { email: 'user@example.com', password: 'user123', role: 'USER', telefono: '456123789' },
  ];

  for (const user of defaultUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      email: user.email,
      password: hashedPassword,
      role: user.role,
      telefono: user.telefono,
      enabled: true,
    };
    usuarios.push(newUser);
  }
};

// Llama a la función para crear usuarios por defecto al inicio
createDefaultUsers();

const register = async (req, res) => {
  const { email, password, role, telefono } = req.body;

  const existingUser = usuarios.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Ya existe un usuario con este email' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    email,
    password: hashedPassword,
    role,
    telefono,
    enabled: true,
  };
  usuarios.push(newUser);
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = generateToken(user);
    res.json({ token, nombre: user.email, role: user.role, userId: user.id});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

//Reestablecer contraseña

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = usuarios.find(u => u.email == email);
  if (user) {
    user.password = await bcrypt.hash(newPassword, 10);
    res.json({ message: 'Password updated' });
  } else {
    res.status(400).json({ message: 'Invalid password' });
  }
};

const forgotPassword = (req, res) => {  
  const { email } = req.body;
  const user = usuarios.find(u => u.email === email);
  if (user) {
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    const resetLink = `http://localhost:4200/reset-password?token=${token}`;
    res.json({ message: 'Password reset link sent', resetLink });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const enableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = true;
    res.json({ message: 'User enabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const disableUser = (req, res) => {
  const { id } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.enabled = false;
    res.json({ message: 'User disabled' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getProfile = (req, res) => {
  const { id } = req.params;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

const getUsers = (req, res) => {
  res.json(usuarios);
};

const updateRole = (req, res) => {
  const { id, role } = req.body;
  const user = usuarios.find(u => u.id == id);
  if (user) {
    user.role = role;
    res.json({ message: 'Role updated' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  enableUser,
  disableUser,
  getProfile,
  getUsers,
  updateRole
};
