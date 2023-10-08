const express = require("express");
const app = express();
const artikelRoutes = require("./routes/artikelRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");

// const allowOnlySpecificIP = (req, res, next) => {
//   const allowedIPs = [
//     "198.162.0.1",
//     "103.242.105.1",
//     "::ffff:127.0.0.1",
//     "::1",
//   ];

//   const clientIP = req.ip;
//   console.log(req.ip);
//   if (allowedIPs.includes(clientIP)) {
//     next();
//   } else {
//     res.status(403).send("Akses Dilarang");
//   }
// };
// app.use(allowOnlySpecificIP);

app.use(express.json());

app.use(express.static("public/image"));

app.use("/artikel", artikelRoutes);
app.use("/kategori", kategoriRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
