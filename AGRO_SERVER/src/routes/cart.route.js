import express from 'express';
import { body } from 'express-validator';
import { getCart, addToCart, removeFromCart, clearCart, updateCartItems } from '../controllers/cart.controller.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Obtener el carrito de compras del usuario
 *     description: Retorna todos los productos en el carrito de compras del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Cart'
 *                 - type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: ID del usuario
 *                     items:
 *                       type: array
 *                       items: {}
 *                       description: Array vacío si no hay productos
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
 */
router.get('/', requireToken, getCart);

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Agregar producto al carrito
 *     description: Agrega un producto al carrito de compras del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCartRequest'
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Error de validación o stock insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cannot add more than 10 items to cart. Current stock is 10."
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
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
router.post(
    '/add',
    [
        body('productId', 'Product ID is required').not().isEmpty(),
        body('quantity', 'Quantity must be a positive number').isInt({ gt: 0 }),
        requireToken
    ],
    addToCart 
);

/**
 * @swagger
 * /api/v1/cart/remove:
 *   delete:
 *     summary: Remover producto del carrito
 *     description: Elimina un producto específico del carrito de compras del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveFromCartRequest'
 *     responses:
 *       200:
 *         description: Producto removido exitosamente del carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Carrito no encontrado
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
router.delete(
    '/remove',
    [
        body('productId', 'Product ID is required').not().isEmpty(),
        requireToken
    ],
    removeFromCart 
);

/**
 * @swagger
 * /api/v1/cart/clear:
 *   post:
 *     summary: Limpiar carrito de compras
 *     description: Elimina todos los productos del carrito de compras del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito limpiado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart cleared"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Carrito no encontrado
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
router.post('/clear', requireToken, clearCart); 

/**
 * @swagger
 * /api/v1/cart/update:
 *   patch:
 *     summary: Actualizar cantidades en el carrito
 *     description: Actualiza las cantidades de múltiples productos en el carrito de compras del usuario autenticado
 *     tags: [Carrito]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartRequest'
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCartResponse'
 *       400:
 *         description: Error de validación en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Items array is required and cannot be empty."
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Carrito no encontrado
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
router.patch(
    '/update',
    [
        body('items', 'Items array is required and cannot be empty').isArray().notEmpty(),
        body('items.*.productId', 'Product ID is required').not().isEmpty(),
        body('items.*.quantity', 'Quantity must be a positive number').isInt({ gt: 0 }),
        requireToken
    ],
    updateCartItems
);

export default router;