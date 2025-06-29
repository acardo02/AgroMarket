# Créditos

Este módulo maneja la gestión de créditos de los usuarios en el sistema AgroMarket.

## Endpoints

### GET /api/v1/credits/get

Obtiene el saldo actual de créditos del usuario autenticado.

**URL:** `/api/v1/credits/get`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "credits": 150.50
}
```

**Respuesta de error (401):**
```json
{
  "error": "Token inválido"
}
```

**Respuesta de error (500):**
```json
{
  "error": "Error de server"
}
```

---

### POST /api/v1/credits/add

Agrega créditos al saldo actual del usuario autenticado.

**URL:** `/api/v1/credits/add`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "credits": 50.25
}
```

**Respuesta exitosa (200):**
```json
{
  "credits": 200.75
}
```

**Respuesta de error (400):**
```json
{
  "error": "Credits must be a positive number"
}
```

**Respuesta de error (401):**
```json
{
  "error": "Token inválido"
}
```

---

### POST /api/v1/credits/substract

Resta créditos del saldo actual del usuario autenticado.

**URL:** `/api/v1/credits/substract`

**Método:** `POST`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "credits": 25.50
}
```

**Respuesta exitosa (200):**
```json
{
  "credits": 125.00
}
```

**Respuesta de error (400):**
```json
{
  "error": "Insufficient credits"
}
```

**Respuesta de error (401):**
```json
{
  "error": "Token inválido"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Datos de entrada inválidos o saldo insuficiente |
| 401 | Token no válido o expirado |
| 500 | Error interno del servidor |

## Notas Importantes

- Todos los endpoints requieren autenticación mediante token JWT
- Los créditos deben ser números positivos
- No se pueden restar más créditos de los disponibles
- El saldo se actualiza en tiempo real
- Los créditos se usan para comprar productos
- Los créditos se pueden agregar mediante depósitos
- Los créditos se restan automáticamente al comprar productos 