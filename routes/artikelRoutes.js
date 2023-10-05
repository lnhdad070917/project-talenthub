const express = require("express");
const router = express.Router();
const artikelController = require("../controller/artikelController");

router.post("/", artikelController.createArtikel);

router.get("/", artikelController.getAllArtikel);

router.get("/:id", artikelController.getArtikel);

router.put("/:id", artikelController.updateArtikel);

router.delete("/:id", artikelController.deleteArtikel);

module.exports = router;
