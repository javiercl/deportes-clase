const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {
    async register(req, res) {
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
    },

    async login(req, res) {
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
    }
};

module.exports = authController; 