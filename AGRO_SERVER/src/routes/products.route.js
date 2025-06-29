import express from "express";
import { body } from 'express-validator';
import { userCreatedProduct, getAllProducts, getProductById, getProductsPostedByUser, getProductByCategory, updateProductCreatedByUser, deleteProductCreatedByUser, buyProductWithUserCredit, getNearbyProducts } from "../controllers/products.controller.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Permite a un usuario autenticado crear un nuevo producto en el sistema
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
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
router.post('/create', requireToken, userCreatedProduct);//✅

/**
 * @swagger
 * /api/v1/products/all:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos disponibles en el sistema
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/all', getAllProducts);//✅

/**
 * @swagger
 * /api/v1/products/nearby:
 *   get:
 *     summary: Obtener productos cercanos
 *     description: Retorna productos de usuarios que están dentro de un radio específico de distancia
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: number
 *           default: 15000
 *         description: Distancia máxima en metros para buscar productos cercanos
 *         example: 10000
 *     responses:
 *       200:
 *         description: Productos cercanos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ubicación del usuario no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User location not found"
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
router.get('/nearby', requireToken, getNearbyProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     description: Retorna la información detallada de un producto específico
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del producto
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getProductById);//✅

/**
 * @swagger
 * /api/v1/products/category/{id}:
 *   get:
 *     summary: Obtener productos por categoría
 *     description: Retorna todos los productos que pertenecen a una categoría específica
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *         example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: Productos de la categoría obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/category/:id', getProductByCategory);//✅

/**
 * @swagger
 * /api/v1/products/user/ownProducts:
 *   get:
 *     summary: Obtener productos del usuario autenticado
 *     description: Retorna todos los productos creados por el usuario autenticado
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Productos del usuario obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
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
router.get('/user/ownProducts', requireToken, getProductsPostedByUser);//✅

/**
 * @swagger
 * /api/v1/products/update/{id}:
 *   patch:
 *     summary: Actualizar producto
 *     description: Permite al propietario del producto actualizar su información
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       401:
 *         description: No autorizado - No tienes permiso para actualizar este producto
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
router.patch('/update/:id', requireToken, updateProductCreatedByUser);//✅

/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     description: Permite al propietario del producto eliminarlo del sistema
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteProductResponse'
 *       400:
 *         description: No tienes permiso para eliminar este producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
router.delete('/delete/:id', requireToken, deleteProductCreatedByUser);//✅

/**
 * @swagger
 * /api/v1/products/buy/{id}:
 *   post:
 *     summary: Comprar producto
 *     description: Permite a un usuario comprar un producto usando sus créditos disponibles
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a comprar
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Producto comprado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BuyProductResponse'
 *       400:
 *         description: Error en la compra (sin stock o créditos insuficientes)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tienes suficiente saldo"
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
router.post('/buy/:id', requireToken, buyProductWithUserCredit);//✅

export default router;