const express = require("express");
const router = express.Router();
const kategoriController = require("../controller/kategoriController");

router.post("/", kategoriController.createkategori);

router.get("/", kategoriController.getAllkategori);

router.get("/:id", kategoriController.getkategori);

router.put("/:id", kategoriController.updatekategori);

router.delete("/:id", kategoriController.deletekategori);

module.exports = router;
