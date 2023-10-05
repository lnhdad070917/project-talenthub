const db = require("../models");
const Kategori = db.Kategori;

exports.createkategori = async (req, res) => {
  try {
    const kategori = await Kategori.create(req.body);

    return res.status(201).json(kategori);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Database error.", details: error.message });
  }
};

exports.getAllkategori = async (req, res) => {
  try {
    const kategoris = await Kategori.findAll();
    return res.status(200).json(kategoris);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getkategori = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (!kategori) {
      return res.status(404).json({ error: "kategori not found" });
    }
    return res.status(200).json(kategori);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatekategori = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (!kategori) {
      return res.status(404).json({ error: "kategori not found" });
    }

    await Kategori.update(req.body, {
      where: { id: req.params.id },
    });

    const updatedKategori = await Kategori.findByPk(req.params.id);

    return res.status(200).json(updatedKategori);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", Detail: error.message });
  }
};

exports.deletekategori = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (!kategori) {
      return res.status(404).json({ error: "kategori not found" });
    }
    // await Kategori.destroy();
    await Kategori.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
