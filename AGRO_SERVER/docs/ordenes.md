# Órdenes

Este módulo maneja la gestión de órdenes de compra en el sistema AgroMarket.

## Endpoints

### GET /api/v1/orders

Obtiene todas las órdenes donde el usuario es comprador o vendedor.

**URL:** `/api/v1/orders`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "buyer": "507f1f77bcf86cd799439012",
    "seller": "507f1f77bcf86cd799439013",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439014",
        "quantity": 2,
        "price": 2.50,
        "product": {
          "_id": "507f1f77bcf86cd799439014",
          "name": "Manzanas Rojas",
          "image": "https://ejemplo.com/manzanas.jpg"
        }
      }
    ],
    "total": 5.00,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### GET /api/v1/orders/{id}

Obtiene una orden específica por su ID.

**URL:** `/api/v1/orders/{id}`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de ruta:**
- `id`: ID de la orden

**Ejemplo:**
```
GET /api/v1/orders/507f1f77bcf86cd799439011
```

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "buyer": "507f1f77bcf86cd799439012",
  "seller": "507f1f77bcf86cd799439013",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439014",
      "quantity": 2,
      "price": 2.50,
      "product": {
        "_id": "507f1f77bcf86cd799439014",
        "name": "Manzanas Rojas",
        "image": "https://ejemplo.com/manzanas.jpg"
      }
    }
  ],
  "total": 5.00,
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Respuesta de error (404):**
```json
{
  "message": "Orden no encontrada"
}
```

---

### POST /api/v1/orders

Crea una nueva orden basada en los productos del carrito del usuario.

**URL:** `/api/v1/orders`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (201):**
```json
{
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "buyer": "507f1f77bcf86cd799439012",
      "seller": "507f1f77bcf86cd799439013",
      "items": [
        {
          "productId": "507f1f77bcf86cd799439014",
          "quantity": 2,
          "price": 2.50,
          "product": {
            "_id": "507f1f77bcf86cd799439014",
            "name": "Manzanas Rojas",
            "image": "https://ejemplo.com/manzanas.jpg"
          }
        }
      ],
      "total": 5.00,
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Órdenes creadas exitosamente"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Cart is empty"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Buyer location not found"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Insufficient stock for product"
}
```

---

### PUT /api/v1/orders/{id}

Actualiza el estado de una orden específica.

**URL:** `/api/v1/orders/{id}`

**Método:** `PUT`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros de ruta:**
- `id`: ID de la orden

**Body:**
```json
{
  "status": "in-progress"
}
```

**Estados válidos:**
- `pending`: Pendiente
- `in-progress`: En progreso
- `completed`: Completada
- `cancelled`: Cancelada

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "buyer": "507f1f77bcf86cd799439012",
  "seller": "507f1f77bcf86cd799439013",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439014",
      "quantity": 2,
      "price": 2.50,
      "product": {
        "_id": "507f1f77bcf86cd799439014",
        "name": "Manzanas Rojas",
        "image": "https://ejemplo.com/manzanas.jpg"
      }
    }
  ],
  "total": 5.00,
  "status": "in-progress",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Estado inválido"
}
```

---

### DELETE /api/v1/orders/{id}

Elimina una orden específica por su ID.

**URL:** `/api/v1/orders/{id}`

**Método:** `DELETE`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de ruta:**
- `id`: ID de la orden

**Respuesta exitosa (200):**
```json
{
  "message": "Order deleted successfully"
}
```

**Respuesta de error (404):**
```json
{
  "message": "Orden no encontrada"
}
```

---

### PATCH /api/v1/orders/status/{id}

Actualiza el estado de una orden siguiendo las reglas de transición válidas.

**URL:** `/api/v1/orders/status/{id}`

**Método:** `PATCH`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parámetros de ruta:**
- `id`: ID de la orden

**Body:**
```json
{
  "status": "completed"
}
```

**Respuesta exitosa (200):**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "buyer": "507f1f77bcf86cd799439012",
    "seller": "507f1f77bcf86cd799439013",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439014",
        "quantity": 2,
        "price": 2.50,
        "product": {
          "_id": "507f1f77bcf86cd799439014",
          "name": "Manzanas Rojas",
          "image": "https://ejemplo.com/manzanas.jpg"
        }
      }
    ],
    "total": 5.00,
    "status": "completed",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  },
  "message": "Estado actualizado exitosamente"
}
```

**Respuesta de error (400):**
```json
{
  "message": "Invalid status change from pending to completed"
}
```

## Estados de las Órdenes

| Estado | Descripción |
|--------|-------------|
| `pending` | Orden creada, pendiente de procesamiento |
| `in-progress` | Orden en proceso de preparación |
| `completed` | Orden completada y entregada |
| `cancelled` | Orden cancelada |

## Reglas de Transición de Estados

- `pending` → `in-progress` ✅
- `pending` → `cancelled` ✅
- `in-progress` → `completed` ✅
- `in-progress` → `cancelled` ✅
- `completed` → No se puede cambiar ❌
- `cancelled` → No se puede cambiar ❌

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Error en los datos de entrada o transición de estado inválida |
| 401 | Token de autenticación inválido o faltante |
| 404 | Orden no encontrada |
| 500 | Error interno del servidor |

## Notas Importantes

- Se crean órdenes separadas por vendedor
- El carrito se vacía automáticamente al crear órdenes
- Solo se pueden actualizar órdenes que pertenezcan al usuario
- Los estados tienen reglas de transición específicas
- Las órdenes incluyen información completa de los productos
- El total se calcula automáticamente 