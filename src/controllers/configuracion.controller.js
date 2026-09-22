const Configuracion = require("../models/configuracion.model");

const getAll = async (req, res) => {
  try {
    const data = await Configuracion.getAll();

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
    const data = await Configuracion.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        error: "Configuración no encontrada"
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
    const {
      usuario_id,
      notificaciones,
      modo_oscuro,
      unidad_medida
    } = req.body;

    const data = await Configuracion.create(
      usuario_id,
      notificaciones ?? true,
      modo_oscuro ?? false,
      unidad_medida ?? "m3"
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
    const {
      usuario_id,
      notificaciones,
      modo_oscuro,
      unidad_medida
    } = req.body;

    const affectedRows = await Configuracion.update(
      req.params.id,
      usuario_id,
      notificaciones,
      modo_oscuro,
      unidad_medida
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Configuración no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Configuración actualizada correctamente"
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
    const affectedRows = await Configuracion.remove(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Configuración no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Configuración eliminada correctamente"
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