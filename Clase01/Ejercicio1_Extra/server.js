require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;
const routes = require("./routes");

app.use(express.json()); // Para que req.body contenga los datos que llegaron a través del request.
app.use(express.static("public"));

app.use(routes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
