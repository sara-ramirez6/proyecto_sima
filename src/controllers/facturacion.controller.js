const Facturacion = require("../models/facturacion.model");

const getAll = async (req, res) => {
  try {
    const data = await Facturacion.getAll();

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
    const data = await Facturacion.getById(req.params.id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        error: "Factura no encontrada"
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
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado
    } = req.body;

    const data = await Facturacion.create(
      usuario_id,
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado
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
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado
    } = req.body;

    const affectedRows = await Facturacion.update(
      req.params.id,
      usuario_id,
      periodo,
      consumo,
      valor,
      fecha_vencimiento,
      estado
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Factura no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Factura actualizada correctamente"
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
    const affectedRows = await Facturacion.remove(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Factura no encontrada"
      });
    }

    res.json({
      ok: true,
      message: "Factura eliminada correctamente"
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