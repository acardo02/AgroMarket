# Productos

Este módulo maneja la gestión de productos en el sistema AgroMarket.

## Endpoints

### POST /api/v1/products/create

Crea un nuevo producto en el sistema.

**URL:** `/api/v1/products/create`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Manzanas Rojas",
  "description": "Manzanas rojas frescas del valle",
  "price": 2.50,
  "quantity": 100,
  "image": "https://ejemplo.com/manzanas.jpg",
  "stock": 50,
  "measureUnit": "507f1f77bcf86cd799439012",
  "measurement": "507f1f77bcf86cd799439013",
  "category": "507f1f77bcf86cd799439014"
}
```

**Respuesta exitosa (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Manzanas Rojas",
    "description": "Manzanas rojas frescas del valle",
    "price": 2.50,
    "quantity": 100,
    "image": "https://ejemplo.com/manzanas.jpg",
    "stock": 50,
    "measureUnit": "507f1f77bcf86cd799439012",
    "measurement": "507f1f77bcf86cd799439013",
    "category": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439015"
  }
}
```

---

### GET /api/v1/products/all

Obtiene todos los productos disponibles en el sistema.

**URL:** `/api/v1/products/all`

**Método:** `GET`

**Respuesta exitosa (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Manzanas Rojas",
      "description": "Manzanas rojas frescas del valle",
      "price": 2.50,
      "quantity": 100,
      "image": "https://ejemplo.com/manzanas.jpg",
      "stock": 50,
      "measureUnit": "507f1f77bcf86cd799439012",
      "measurement": "507f1f77bcf86cd799439013",
      "category": "507f1f77bcf86cd799439014",
      "user": "507f1f77bcf86cd799439015"
    }
  ]
}
```

---

### GET /api/v1/products/nearby

Obtiene productos de usuarios cercanos a la ubicación del usuario autenticado.

**URL:** `/api/v1/products/nearby`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de consulta:**
- `maxDistance` (opcional): Distancia máxima en metros (por defecto: 15000)

**Ejemplo:**
```
GET /api/v1/products/nearby?maxDistance=10000
```

**Respuesta exitosa (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Manzanas Rojas",
      "description": "Manzanas rojas frescas del valle",
      "price": 2.50,
      "quantity": 100,
      "image": "https://ejemplo.com/manzanas.jpg",
      "stock": 50,
      "measureUnit": "507f1f77bcf86cd799439012",
      "measurement": "507f1f77bcf86cd799439013",
      "category": "507f1f77bcf86cd799439014",
      "user": "507f1f77bcf86cd799439015"
    }
  ]
}
```

**Respuesta de error (400):**
```json
{
  "message": "User location not found"
}
```

---

### GET /api/v1/products/{id}

Obtiene un producto específico por su ID.

**URL:** `/api/v1/products/{id}`

**Método:** `GET`

**Parámetros de ruta:**
- `id`: ID único del producto

**Ejemplo:**
```
GET /api/v1/products/507f1f77bcf86cd799439011
```

**Respuesta exitosa (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Manzanas Rojas",
    "description": "Manzanas rojas frescas del valle",
    "price": 2.50,
    "quantity": 100,
    "image": "https://ejemplo.com/manzanas.jpg",
    "stock": 50,
    "measureUnit": "507f1f77bcf86cd799439012",
    "measurement": "507f1f77bcf86cd799439013",
    "category": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439015"
  }
}
```

---

### GET /api/v1/products/category/{id}

Obtiene todos los productos de una categoría específica.

**URL:** `/api/v1/products/category/{id}`

**Método:** `GET`

**Parámetros de ruta:**
- `id`: ID de la categoría

**Ejemplo:**
```
GET /api/v1/products/category/507f1f77bcf86cd799439014
```

**Respuesta exitosa (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Manzanas Rojas",
      "description": "Manzanas rojas frescas del valle",
      "price": 2.50,
      "quantity": 100,
      "image": "https://ejemplo.com/manzanas.jpg",
      "stock": 50,
      "measureUnit": "507f1f77bcf86cd799439012",
      "measurement": "507f1f77bcf86cd799439013",
      "category": "507f1f77bcf86cd799439014",
      "user": "507f1f77bcf86cd799439015"
    }
  ]
}
```

---

### GET /api/v1/products/user/ownProducts

Obtiene todos los productos creados por el usuario autenticado.

**URL:** `/api/v1/products/user/ownProducts`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Manzanas Rojas",
      "description": "Manzanas rojas frescas del valle",
      "price": 2.50,
      "quantity": 100,
      "image": "https://ejemplo.com/manzanas.jpg",
      "stock": 50,
      "measureUnit": "507f1f77bcf86cd799439012",
      "measurement": "507f1f77bcf86cd799439013",
      "category": "507f1f77bcf86cd799439014",
      "user": "507f1f77bcf86cd799439015"
    }
  ]
}
```

---

### PATCH /api/v1/products/update/{id}

Actualiza un producto existente.

**URL:** `/api/v1/products/update/{id}`

**Método:** `PATCH`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros de ruta:**
- `id`: ID del producto a actualizar

**Body:**
```json
{
  "name": "Manzanas Rojas Premium",
  "description": "Manzanas rojas premium del valle",
  "price": 3.00,
  "quantity": 150,
  "image": "https://ejemplo.com/manzanas-premium.jpg",
  "stock": 75
}
```

**Respuesta exitosa (200):**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Manzanas Rojas Premium",
    "description": "Manzanas rojas premium del valle",
    "price": 3.00,
    "quantity": 150,
    "image": "https://ejemplo.com/manzanas-premium.jpg",
    "stock": 75,
    "measureUnit": "507f1f77bcf86cd799439012",
    "measurement": "507f1f77bcf86cd799439013",
    "category": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439015"
  }
}
```

**Respuesta de error (401):**
```json
{
  "message": "No tienes permiso para actualizar este producto"
}
```

---

### DELETE /api/v1/products/delete/{id}

Elimina un producto del sistema.

**URL:** `/api/v1/products/delete/{id}`

**Método:** `DELETE`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de ruta:**
- `id`: ID del producto a eliminar

**Respuesta exitosa (200):**
```json
{
  "message": "Producto eliminado exitosamente"
}
```

**Respuesta de error (400):**
```json
{
  "message": "No tienes permiso para eliminar este producto"
}
```

---

### POST /api/v1/products/buy/{id}

Compra un producto usando los créditos del usuario.

**URL:** `/api/v1/products/buy/{id}`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de ruta:**
- `id`: ID del producto a comprar

**Respuesta exitosa (200):**
```json
{
  "message": "Producto comprado exitosamente",
  "remainingCredits": 147.50
}
```

**Respuesta de error (400):**
```json
{
  "error": "No tienes suficiente saldo"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Error en los datos de entrada o saldo insuficiente |
| 401 | Token de autenticación inválido o faltante |
| 404 | Producto no encontrado |
| 500 | Error interno del servidor |

## Notas Importantes

- Solo el propietario del producto puede actualizarlo o eliminarlo
- Los productos se pueden comprar usando créditos del usuario
- El stock se actualiza automáticamente al comprar
- Las imágenes deben ser URLs válidas
- Los precios deben ser números positivos
- Las cantidades deben ser números enteros positivos 