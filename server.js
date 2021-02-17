const express = require("express");
const app = express();
const { leerUsuarios } = require("./usuarios");

app.listen(3000, () => {
    console.log("Servidor inicializado en el puerto 3000");
});

const data = leerUsuarios();
app.get("/abracadabra/usuarios", function(req, res) {
    /*   res.send({... ['a','b','c'] }); entrega un objeto */
    res.send(data);
});

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const { usuario } = req.params;
    const usuarioFind = data.usuarios.find((u) => u == usuario);
    console.log(usuarioFind);
    usuarioFind ? next() : res.sendFile(__dirname + "/assets/who.jpeg");
});

app.use(express.static("assets"));
app.get("/abracadabra/juego/:usuario", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use("/abracadabra/conejo/:n", (req, res, next) => {
    const { n } = req.params;
    console.log("Destapaste el Sombrero: ", n);

    const sombrero = Math.floor(Math.random() * 4) + 1;

    console.log("Conejo esta en sombrero: ", sombrero);
    sombrero == n ? next() : res.sendFile(__dirname + "/assets/voldemort.jpg");
});

app.get("/abracadabra/conejo/:n", function(req, res) {
    res.sendFile(__dirname + "/assets/conejito.jpg");
});

app.get("*", (req, res) => {
    res.send("Esta página no existe!!!");
});