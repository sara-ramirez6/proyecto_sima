const Reporte = require("../models/reporte.model");

const getAll = async (req, res) => {
  try {
    const data = await Reporte.getAll();

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
    const data = await Reporte.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        error: "Reporte no encontrado"
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
      titulo,
      descripcion,
      tipo
    } = req.body;

    const data = await Reporte.create(
      usuario_id,
      titulo,
      descripcion,
      tipo
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
      titulo,
      descripcion,
      tipo
    } = req.body;

    const affectedRows = await Reporte.update(
      req.params.id,
      usuario_id,
      titulo,
      descripcion,
      tipo
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Reporte no encontrado"
      });
    }

    res.json({
      ok: true,
      message: "Reporte actualizado correctamente"
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
    const affectedRows = await Reporte.remove(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Reporte no encontrado"
      });
    }

    res.json({
      ok: true,
      message: "Reporte eliminado correctamente"
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