const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const Usuario = require('../models/usuario');

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findByEmail(email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const valid = await bcrypt.compare(password, usuario.password);
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, usuario: { id: usuario.id, email } });
};

module.exports = { login };