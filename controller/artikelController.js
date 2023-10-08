const db = require("../models");
const Artikel = db.Artikel;

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/image";

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    const fileName = uniqueSuffix + "." + fileExtension;
    req.body.foto = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

exports.createArtikel = async (req, res) => {
  try {
    req.body.tgl_update = new Date();

    upload.single("foto")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "File upload failed." });
      }

      console.log(req.body);

      try {
        const artikel = await Artikel.create(req.body);

        return res.status(201).json(artikel);
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Database error.", details: error.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// exports.getAllArtikel = async (req, res) => {
//   try {
//     const artikels = await Artikel.findAll();
//     return res.status(200).json(artikels);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

let totalArtikels;

exports.getAllArtikel = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;

    let whereCondition = {};
    const id_kategori = req.query.id_kategori;

    if (id_kategori) {
      whereCondition.id_kategori = id_kategori;
    }

    if (!totalArtikels) {
      totalArtikels = await Artikel.count({
        where: whereCondition,
      });
    }

    const artikels = await Artikel.findAll({
      where: whereCondition,
      order: [["id", "ASC"]],
      offset: startIndex,
      limit: perPage,
    });

    const response = {
      artikels,
      pageInfo: {
        currentPage: page,
        totalPages: Math.ceil(totalArtikels / perPage),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findByPk(req.params.id);
    if (!artikel) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    return res.status(200).json(artikel);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findByPk(req.params.id);
    if (!artikel) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    await artikel.update(req.body);
    return res.status(200).json(artikel);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteArtikel = async (req, res) => {
  try {
    const artikel = await Artikel.findByPk(req.params.id);
    if (!artikel) {
      return res.status(404).json({ error: "Artikel not found" });
    }
    await artikel.destroy();
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
