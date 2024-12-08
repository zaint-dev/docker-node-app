const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 3000

// Middleware para generar logs de las peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Middleware para parsear el body de las peticiones
app.use(express.json())

// Leer la URL de la base de datos desde las variables de entorno
const dbUrl = process.env.DATABASE_URL || 'mongodb://mongodb:27017/nodeapp';

// Conexión a la base de datos
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos establecida")
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos", err)
  })

// Definición de rutas
app.get("/", (req, res) => {
  res.send("Hola mundo! Conectado a la base de datos de MongoDB")
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
