# Carrito de Compras

Este módulo maneja la gestión del carrito de compras de los usuarios en el sistema AgroMarket.

## Endpoints

### GET /api/v1/cart

Obtiene el carrito de compras del usuario autenticado.

**URL:** `/api/v1/cart`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2,
      "product": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Manzanas Rojas",
        "price": 2.50,
        "image": "https://ejemplo.com/manzanas.jpg",
        "stock": 50
      }
    }
  ]
}
```

**Respuesta con carrito vacío (200):**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "items": []
}
```

---

### POST /api/v1/cart/add

Agrega un producto al carrito de compras.

**URL:** `/api/v1/cart/add`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2
}
```

**Respuesta exitosa (200):**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2,
      "product": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Manzanas Rojas",
        "price": 2.50,
        "image": "https://ejemplo.com/manzanas.jpg",
        "stock": 50
      }
    }
  ]
}
```

**Respuesta de error (400):**
```json
{
  "message": "Cannot add more than 10 items to cart. Current stock is 10."
}
```

**Respuesta de error (404):**
```json
{
  "message": "Producto no encontrado"
}
```

---

### DELETE /api/v1/cart/remove

Elimina un producto específico del carrito de compras.

**URL:** `/api/v1/cart/remove`

**Método:** `DELETE`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "productId": "507f1f77bcf86cd799439012"
}
```

**Respuesta exitosa (200):**
```json
{
  "user": "507f1f77bcf86cd799439011",
  "items": []
}
```

**Respuesta de error (404):**
```json
{
  "message": "Carrito no encontrado"
}
```

---

### POST /api/v1/cart/clear

Elimina todos los productos del carrito de compras.

**URL:** `/api/v1/cart/clear`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Cart cleared"
}
```

**Respuesta de error (404):**
```json
{
  "message": "Carrito no encontrado"
}
```

---

### PATCH /api/v1/cart/update

Actualiza las cantidades de múltiples productos en el carrito de compras.

**URL:** `/api/v1/cart/update`

**Método:** `PATCH`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 3
    },
    {
      "productId": "507f1f77bcf86cd799439013",
      "quantity": 1
    }
  ]
}
```

**Respuesta exitosa (200):**
```json
{
  "updatedItems": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 3,
      "product": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Manzanas Rojas",
        "price": 2.50,
        "image": "https://ejemplo.com/manzanas.jpg",
        "stock": 50
      }
    },
    {
      "productId": "507f1f77bcf86cd799439013",
      "quantity": 1,
      "product": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Plátanos",
        "price": 1.80,
        "image": "https://ejemplo.com/platanos.jpg",
        "stock": 30
      }
    }
  ],
  "removedItems": []
}
```

**Respuesta de error (400):**
```json
{
  "message": "Items array is required and cannot be empty."
}
```

**Respuesta de error (404):**
```json
{
  "message": "Carrito no encontrado"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Error de validación o stock insuficiente |
| 401 | Token de autenticación inválido o faltante |
| 404 | Carrito o producto no encontrado |
| 500 | Error interno del servidor |

## Notas Importantes

- Todos los endpoints requieren autenticación mediante token JWT
- No se puede agregar más productos de los disponibles en stock
- La cantidad debe ser un número entero positivo
- Al actualizar cantidades, se pueden remover productos si la cantidad es 0
- El carrito se crea automáticamente para cada usuario
- Los productos se identifican por su ID único
- Las cantidades se validan contra el stock disponible 