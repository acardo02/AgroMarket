import express from "express";
import { body } from 'express-validator';
import { createTransaction, getTransactionByUser } from "../controllers/transactions.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/transactions/add:
 *   post:
 *     tags: [Transactions]
 *     summary: Crear una nueva transacción
 *     description: Crea una nueva transacción para el usuario autenticado. Los valores de compra y retiro se convierten automáticamente a negativos.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionRequest'
 *           example:
 *             type: "deposito"
 *             value: 1000
 *     responses:
 *       200:
 *         description: Transacción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTransactionResponse'
 *             example:
 *               transaction:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 value: 1000
 *                 type: "deposito"
 *                 user: "507f1f77bcf86cd799439012"
 *                 date: "2024-01-15T10:30:00.000Z"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error de server"
 */
router.post('/add', requireToken, createTransaction);

/**
 * @swagger
 * /api/v1/transactions/get:
 *   get:
 *     tags: [Transactions]
 *     summary: Obtener transacciones del usuario
 *     description: Obtiene todas las transacciones del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transacciones obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTransactionsResponse'
 *             example:
 *               alltransactions:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   value: 1000
 *                   type: "deposito"
 *                   user: "507f1f77bcf86cd799439012"
 *                   date: "2024-01-15T10:30:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   value: -500
 *                   type: "compra"
 *                   user: "507f1f77bcf86cd799439012"
 *                   date: "2024-01-15T11:00:00.000Z"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Error de server"
 */
router.get('/get', requireToken, getTransactionByUser);

export default router;