
const Notificacion = require("../models/notificacion.model");

const getAll = async (req, res) => {
  try {
    const data = await Notificacion.getAll(req.usuario.id);

    res.json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

const getById = async (req, res) => {
  try {
    const data = await Notificacion.getById(
      req.params.id,
      req.usuario.id
    );

    if (!data) {
      return res.status(404).json({
        ok: false,
        error: "Notificación no encontrada"
      });
    }

    res.json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

const create = async (req, res) => {
  try {
    const { titulo, mensaje, tipo, leida } = req.body;

    if (!titulo || !mensaje || !tipo) {
      return res.status(400).json({
        ok: false,
        error: "Todos los campos son obligatorios"
      });
    }

    const data = await Notificacion.create(
      req.usuario.id,
      titulo,
      mensaje,
      tipo,
      leida ?? false
    );

    res.status(201).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const { titulo, mensaje, tipo, leida } = req.body;

    if (!titulo || !mensaje || !tipo || leida === undefined) {
      return res.status(400).json({
        ok: false,
        error: "Todos los campos son obligatorios"
      });
    }

    const affectedRows = await Notificacion.update(
      req.params.id,
      req.usuario.id,
      titulo,
      mensaje,
      tipo,
      leida
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Notificación no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Notificación actualizada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await Notificacion.remove(
      req.params.id,
      req.usuario.id
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Notificación no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Notificación eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
