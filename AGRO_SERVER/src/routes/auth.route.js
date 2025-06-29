import express from "express";
import { body } from 'express-validator';
import { login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { authValidate } from "../middlewares/authValidate.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para gestión de autenticación de usuarios
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     description: Autentica un usuario con nombre de usuario y contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             username: "usuario123"
 *             password: "contraseña123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               expiresIn: "1h"
 *               message: "ok"
 *       403:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', 
    [
        body('username', 'Username is required').not().isEmpty().trim(),
        body('password', 'Password is required').not().isEmpty(),
        authValidate
    ],
login)//✅

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     description: Crea una nueva cuenta de usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             username: "nuevo_usuario"
 *             email: "usuario@ejemplo.com"
 *             address: "Calle Principal 123"
 *             phone: "1234567890"
 *             password: "contraseña123"
 *             lat: 19.4326
 *             lng: -99.1332
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado"
 *       400:
 *         description: Usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "User already exists"
 *       403:
 *         description: Datos duplicados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               username_duplicate:
 *                 value:
 *                   message: "Username already in use"
 *               email_duplicate:
 *                 value:
 *                   message: "Email already in use"
 *               phone_duplicate:
 *                 value:
 *                   message: "Phone already in use"
 */
router.post(
    '/register',
    [
        body('username', 'Username is required').not().isEmpty(),
        body('email', 'Email is required').trim().isEmail().normalizeEmail().not().isEmpty(),
        body('address', 'Address is required').not().isEmpty(),
        body('phone', 'Phone is required').not().isEmpty(),
        body('password', 'Password is required').not().isEmpty(),
        authValidate
    ],
    register
);//✅

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   get:
 *     summary: Renovar token de acceso
 *     tags: [Autenticación]
 *     description: Renueva el token JWT usando el refresh token almacenado en cookies
 *     security: []
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Nuevo token JWT
 *                 expiresIn:
 *                   type: string
 *                   description: Tiempo de expiración del nuevo token
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               expiresIn: "1h"
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_signature:
 *                 value:
 *                   message: "La firma del JWT no es valido"
 *               expired_token:
 *                 value:
 *                   message: "JWT expirado"
 *               invalid_token:
 *                 value:
 *                   message: "Token no valido"
 *               malformed_token:
 *                 value:
 *                   message: "JWT mal formado"
 */
router.get('/refresh',refreshToken)//✅

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: Cerrar sesión
 *     tags: [Autenticación]
 *     description: Cierra la sesión del usuario eliminando el refresh token de las cookies
 *     security: []
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: "Error de server"
 */
router.get('/logout', logout )//✅

export default router;