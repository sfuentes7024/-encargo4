const express = require("express");

const Contenedor = require("./utils/container");
const dbName = "db.json";
const container = new Contenedor(dbName);
const { auth } = require("./middlewares/auth");
const routerProductos = require("./routes/productos");
const upload = require("./storage");
const { response } = require("express");

const app = express();
const PORT = 8083;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.use((req, res, next)=>{
    const date = new Date(Date.now());
    console.log(date.toLocaleString());
    next();
});

app.get("/api/productos", (req, res)=>{

    const listadoProductos = container.getAll();
    res.json(listadoProductos);
    console.log(req.query);
})

app.get("/api/productos/:id", (req, res)=>{gi
    const id = parseInt(req.params.id);
    const producto = container.getById(id);
    res.json(producto);
});

app.post("/api/productos", upload.single("foto"), (req, res) => {
    const file = req.file;
    console.log(file);
    res.json({success: true})
});

app.delete("/api/produtos/:id", (req, res)=>{

    const id = parseInt(req.params.id);
    const producto = container.getById(id);
    container.splice(producto, 1);
    
    return res.send("Producto eliminado");
});

app.put("/api/productos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const producto = container.getById(id);
    res.send(producto);
});

app.use("/api/productos2", routerProductos);

const server = app.listen(PORT, (req, res)=>{
    console.log(`Server listening on port: ${PORT}`)
});