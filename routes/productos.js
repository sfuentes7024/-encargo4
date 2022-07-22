const { Router } = require("express");

const routerProductos = new Router();

routerProductos.get("/", (req, res)=>{
    res.json({message: "Productos Router"})
});

module.exports = routerProductos;