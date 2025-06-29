import express from "express";
import { getCategories, getMeasureUnits, getProducts} from "../controllers/getData.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/data/categories:
 *   get:
 *     summary: Obtener todas las categorías de productos
 *     description: Retorna una lista de todas las categorías disponibles en el sistema
 *     tags: [Datos]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d0"
 *                 name: "Frutas"
 *                 image: "http://via.placeholder.com/150x150"
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d1"
 *                 name: "Verduras"
 *                 image: "http://via.placeholder.com/150x150"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/categories', getCategories);//✅

/**
 * @swagger
 * /api/v1/data/measureUnits:
 *   get:
 *     summary: Obtener todas las unidades de medida
 *     description: Retorna una lista de todas las unidades de medida disponibles en el sistema
 *     tags: [Datos]
 *     responses:
 *       200:
 *         description: Lista de unidades de medida obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MeasureUnit'
 *             example:
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d2"
 *                 name: "Kilogramos"
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d3"
 *                 name: "Litros"
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d4"
 *                 name: "Unidades"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/measureUnits', getMeasureUnits);//✅

/**
 * @swagger
 * /api/v1/data/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos disponibles en el sistema
 *     tags: [Datos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d5"
 *                 name: "Manzanas Rojas"
 *                 description: "Manzanas rojas frescas del valle"
 *                 price: 2.50
 *                 quantity: 100
 *                 image: "http://via.placeholder.com/300x200"
 *                 stock: 50
 *                 measureUnit: "64f8a1b2c3d4e5f6a7b8c9d2"
 *                 measurement: "64f8a1b2c3d4e5f6a7b8c9d6"
 *                 category: "64f8a1b2c3d4e5f6a7b8c9d0"
 *                 user: "64f8a1b2c3d4e5f6a7b8c9d7"
 *               - _id: "64f8a1b2c3d4e5f6a7b8c9d8"
 *                 name: "Lechuga Fresca"
 *                 description: "Lechuga orgánica cultivada localmente"
 *                 price: 1.80
 *                 quantity: 75
 *                 image: "http://via.placeholder.com/300x200"
 *                 stock: 30
 *                 measureUnit: "64f8a1b2c3d4e5f6a7b8c9d2"
 *                 measurement: "64f8a1b2c3d4e5f6a7b8c9d9"
 *                 category: "64f8a1b2c3d4e5f6a7b8c9d1"
 *                 user: "64f8a1b2c3d4e5f6a7b8c9d7"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/products', getProducts);//✅

export default router;