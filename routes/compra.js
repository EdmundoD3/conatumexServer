const router = require('express').Router()

const User = require('../models/User');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    console.log({ nombre, correo, password })
    const nuevoUsuario = new User({ nombre, correo, password });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Ruta para actualizar la información de un usuario
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { nombre, correo, password } = req.body;
    
    // Encuentra y actualiza el usuario por su ID
    const usuarioActualizado = await User.findByIdAndUpdate(
      userId,
      { nombre, correo, password },
      { new: true } // Devuelve el usuario actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Ruta para obtener los datos de un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Encuentra el usuario por su ID
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Elimina el usuario por su ID
    const usuarioEliminado = await User.findByIdAndDelete(userId);

    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router