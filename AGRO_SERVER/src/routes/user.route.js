import express from "express";
import { body } from 'express-validator';
import { infoUser, updateUser, changePassword, changeImage, getNearbySellers } from "../controllers/user.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/info:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     description: Retorna la información completa del usuario que está autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfoResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
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
 */
router.get('/info', requireToken,infoUser);//✅

/**
 * @swagger
 * /api/v1/user/update:
 *   patch:
 *     summary: Actualizar información del usuario
 *     description: Permite actualizar los campos del perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
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
 */
router.patch('/update', requireToken,updateUser);//✅

/**
 * @swagger
 * /api/v1/user/change-password:
 *   put:
 *     summary: Cambiar contraseña del usuario
 *     description: Permite al usuario cambiar su contraseña proporcionando la contraseña actual y la nueva
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       403:
 *         description: Contraseña actual incorrecta o nueva contraseña igual a la actual
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
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
 */
router.put('/change-password', requireToken, changePassword);//✅

/**
 * @swagger
 * /api/v1/user/change-image:
 *   put:
 *     summary: Cambiar imagen de perfil del usuario
 *     description: Permite al usuario cambiar su imagen de perfil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeImageRequest'
 *     responses:
 *       200:
 *         description: Imagen cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
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
 */
router.put('/change-image', requireToken, changeImage);//✅

/**
 * @swagger
 * /api/v1/user/nearby-sellers:
 *   get:
 *     summary: Obtener vendedores cercanos
 *     description: Retorna una lista de vendedores cercanos a la ubicación del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: number
 *           default: 15000
 *         description: Distancia máxima en metros para buscar vendedores (por defecto 15km)
 *     responses:
 *       200:
 *         description: Lista de vendedores cercanos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetNearbySellersResponse'
 *       400:
 *         description: Ubicación del usuario no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token de autenticación inválido o faltante
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
 */
router.get('/nearby-sellers', requireToken, getNearbySellers)

export default router;

