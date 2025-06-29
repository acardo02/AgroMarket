import express from "express";
import { body } from 'express-validator';
import { getCredits, addCreditsToUser, substractCreditsFromUser } from "../controllers/credits.controller.js";
import { requireToken } from '../middlewares/requireToken.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Créditos
 *   description: Endpoints para gestión de créditos de usuarios
 */

/**
 * @swagger
 * /api/v1/credits/get:
 *   get:
 *     summary: Obtener créditos del usuario
 *     tags: [Créditos]
 *     description: Obtiene el saldo actual de créditos del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Créditos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditsResponse'
 *             example:
 *               credits: 150.50
 *       401:
 *         description: Token no válido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Token inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error de server"
 */
router.get('/get', requireToken, getCredits);

/**
 * @swagger
 * /api/v1/credits/add:
 *   post:
 *     summary: Agregar créditos al usuario
 *     tags: [Créditos]
 *     description: Agrega créditos al saldo actual del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditsRequest'
 *           example:
 *             credits: 50.25
 *     responses:
 *       200:
 *         description: Créditos agregados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditsResponse'
 *             example:
 *               credits: 200.75
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Credits must be a positive number"
 *       401:
 *         description: Token no válido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Token inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error de server"
 */
router.post('/add', addCreditsToUser);

/**
 * @swagger
 * /api/v1/credits/substract:
 *   post:
 *     summary: Restar créditos del usuario
 *     tags: [Créditos]
 *     description: Resta créditos del saldo actual del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditsRequest'
 *           example:
 *             credits: 25.50
 *     responses:
 *       200:
 *         description: Créditos restados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditsResponse'
 *             example:
 *               credits: 125.00
 *       400:
 *         description: Datos de entrada inválidos o saldo insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Insufficient credits"
 *       401:
 *         description: Token no válido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Token inválido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error de server"
 */
router.post('/substract', substractCreditsFromUser);

export default router;