# API AgroMarket - Documentación

Bienvenido a la documentación de la API de AgroMarket. Esta documentación proporciona información detallada sobre todos los endpoints disponibles en el sistema.

## Descripción General

AgroMarket es una plataforma de comercio electrónico especializada en productos agrícolas que permite a los usuarios comprar y vender productos frescos de manera local.

## Características Principales

- **Autenticación JWT**: Sistema seguro de autenticación con tokens
- **Gestión de Productos**: CRUD completo para productos agrícolas
- **Carrito de Compras**: Gestión de carritos de compra
- **Sistema de Órdenes**: Procesamiento de pedidos con estados
- **Créditos Virtuales**: Sistema de moneda interna
- **Transacciones**: Historial de movimientos financieros
- **Búsqueda por Ubicación**: Productos y vendedores cercanos
- **Categorías y Unidades**: Sistema de clasificación de productos

## Base URL

```
http://localhost:3000/api/v1
```

## Autenticación

La mayoría de endpoints requieren autenticación mediante token JWT. Para autenticarte:

1. Registra un usuario usando `POST /auth/register`
2. Inicia sesión usando `POST /auth/login`
3. Usa el token recibido en el header `Authorization: Bearer <token>`

## Módulos Disponibles

### 🔐 [Autenticación](autenticacion.md)
- Registro de usuarios
- Inicio de sesión
- Renovación de tokens
- Cierre de sesión

### 👤 [Usuarios](usuarios.md)
- Información del perfil
- Actualización de datos
- Cambio de contraseña
- Cambio de imagen
- Búsqueda de vendedores cercanos

### 🛍️ [Productos](productos.md)
- Creación de productos
- Listado de productos
- Búsqueda por categoría
- Productos cercanos
- Actualización y eliminación
- Compra directa

### 🛒 [Carrito de Compras](carrito.md)
- Agregar productos
- Remover productos
- Actualizar cantidades
- Limpiar carrito
- Ver carrito actual

### 📦 [Órdenes](ordenes.md)
- Crear órdenes desde el carrito
- Ver historial de órdenes
- Actualizar estados
- Eliminar órdenes
- Gestión de estados

### 💰 [Créditos](creditos.md)
- Consultar saldo
- Agregar créditos
- Restar créditos
- Gestión de saldo

### 📊 [Transacciones](transacciones.md)
- Crear transacciones
- Ver historial
- Tipos de transacción

### 📋 [Datos](datos.md)
- Categorías de productos
- Unidades de medida
- Listado de productos

### 🔧 [Carga de Datos](carga-datos.md)
- Datos de muestra para desarrollo
- Categorías de ejemplo
- Unidades de medida
- Productos de prueba

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Error en los datos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - No autorizado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Formato de Respuesta

Todas las respuestas siguen un formato JSON consistente:

### Respuesta Exitosa
```json
{
  "data": "contenido de la respuesta",
  "message": "mensaje descriptivo"
}
```

### Respuesta de Error
```json
{
  "message": "descripción del error",
  "error": "detalles adicionales"
}
```

## Ejemplos de Uso

### 1. Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "address": "Calle Principal 123",
    "phone": "1234567890",
    "password": "contraseña123"
  }'
```

### 2. Inicio de Sesión
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario123",
    "password": "contraseña123"
  }'
```

### 3. Crear Producto
```bash
curl -X POST http://localhost:3000/api/v1/products/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manzanas Rojas",
    "description": "Manzanas frescas del valle",
    "price": 2.50,
    "quantity": 100,
    "category": "507f1f77bcf86cd799439014"
  }'
```

## Configuración de MkDocs

Para usar esta documentación con MkDocs, crea un archivo `mkdocs.yml` en la raíz del proyecto:

```yaml
site_name: AgroMarket API
site_description: Documentación de la API de AgroMarket
site_author: Tu Nombre

theme:
  name: material
  language: es

nav:
  - Inicio: README.md
  - Autenticación: autenticacion.md
  - Usuarios: usuarios.md
  - Productos: productos.md
  - Carrito: carrito.md
  - Órdenes: ordenes.md
  - Créditos: creditos.md
  - Transacciones: transacciones.md
  - Datos: datos.md
  - Carga de Datos: carga-datos.md

plugins:
  - search

markdown_extensions:
  - pymdownx.superfences
  - pymdownx.highlight
  - pymdownx.snippets
  - pymdownx.arithmatex
  - admonition
  - codehilite
  - footnotes
  - toc:
      permalink: true
```

## Instalación y Uso de MkDocs

1. Instalar MkDocs:
```bash
pip install mkdocs mkdocs-material
```

2. Inicializar el proyecto:
```bash
mkdocs new .
```

3. Construir la documentación:
```bash
mkdocs build
```

4. Servir la documentación localmente:
```bash
mkdocs serve
```

## Contacto y Soporte

Para soporte técnico o preguntas sobre la API, contacta al equipo de desarrollo.

---

**Versión de la API:** v1.0  
**Última actualización:** Enero 2024 