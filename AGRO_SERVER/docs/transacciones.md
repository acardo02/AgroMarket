# Transacciones

Este módulo maneja el historial de transacciones de los usuarios en el sistema AgroMarket.

## Endpoints

### POST /api/v1/transactions/add

Crea una nueva transacción para el usuario autenticado.

**URL:** `/api/v1/transactions/add`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "type": "deposito",
  "value": 1000
}
```

**Tipos de transacción válidos:**
- `deposito`: Depósito de créditos (valor positivo)
- `compra`: Compra de productos (valor negativo automático)
- `retiro`: Retiro de créditos (valor negativo automático)

**Respuesta exitosa (200):**
```json
{
  "transaction": {
    "_id": "507f1f77bcf86cd799439011",
    "value": 1000,
    "type": "deposito",
    "user": "507f1f77bcf86cd799439012",
    "date": "2024-01-15T10:30:00.000Z"
  }
}
```

**Respuesta de error (401):**
```json
{
  "error": "No autorizado - Token inválido o faltante"
}
```

**Respuesta de error (500):**
```json
{
  "error": "Error de server"
}
```

---

### GET /api/v1/transactions/get

Obtiene todas las transacciones del usuario autenticado.

**URL:** `/api/v1/transactions/get`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "alltransactions": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "value": 1000,
      "type": "deposito",
      "user": "507f1f77bcf86cd799439012",
      "date": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "value": -500,
      "type": "compra",
      "user": "507f1f77bcf86cd799439012",
      "date": "2024-01-15T11:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "value": -200,
      "type": "retiro",
      "user": "507f1f77bcf86cd799439012",
      "date": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

**Respuesta de error (401):**
```json
{
  "error": "No autorizado - Token inválido o faltante"
}
```

**Respuesta de error (500):**
```json
{
  "error": "Error de server"
}
```

## Tipos de Transacciones

| Tipo | Descripción | Valor |
|------|-------------|-------|
| `deposito` | Depósito de créditos al sistema | Positivo |
| `compra` | Compra de productos | Negativo (automático) |
| `retiro` | Retiro de créditos del sistema | Negativo (automático) |

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 401 | No autorizado - Token inválido o faltante |
| 500 | Error interno del servidor |

## Notas Importantes

- Todos los endpoints requieren autenticación mediante token JWT
- Los valores de compra y retiro se convierten automáticamente a negativos
- Las transacciones se registran con fecha y hora exacta
- Cada transacción está asociada a un usuario específico
- El historial incluye todas las transacciones del usuario
- Las transacciones se ordenan por fecha (más recientes primero)
- Los valores se almacenan como números decimales
- Las transacciones son inmutables una vez creadas 