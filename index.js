const express = require("express");
const app = express();
const artikelRoutes = require("./routes/artikelRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");

app.use(express.json());

app.use("/artikel", artikelRoutes);
app.use("/kategori", kategoriRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
