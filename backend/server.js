// Importar dependencias
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Modelo de Usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch(err => console.error("Error conectando a MongoDB:", err));

// Ruta para crear un usuario (solo para pruebas)
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
});

// Endpoint para validar usuario y contraseña
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        res.status(200).json({ 
            message: "Login exitoso",
            user: {
                username: user.username,
                id: user._id
            }
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Rutas existentes
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/items", (req, res) => {
    res.json([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" }
    ]);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});