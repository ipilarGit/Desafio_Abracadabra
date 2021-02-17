const fs = require("fs");

const leerUsuarios = () => {
    let data = JSON.parse(fs.readFileSync("usuarios.json", "utf8"));
    return data;
};

module.exports = { leerUsuarios };