# Usuarios

Este módulo maneja la gestión de perfiles de usuarios en el sistema AgroMarket.

## Endpoints

### GET /api/v1/user/info

Obtiene la información completa del usuario autenticado.

**URL:** `/api/v1/user/info`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "address": "Calle Principal 123",
  "phone": "1234567890",
  "lat": 19.4326,
  "lng": -99.1332,
  "image": "https://ejemplo.com/imagen.jpg",
  "credits": 150.50
}
```

**Respuesta de error (401):**
```json
{
  "message": "Token de autenticación inválido o faltante"
}
```

---

### PATCH /api/v1/user/update

Actualiza la información del perfil del usuario autenticado.

**URL:** `/api/v1/user/update`

**Método:** `PATCH`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "nuevo@email.com",
  "address": "Nueva Dirección 456",
  "phone": "9876543210",
  "lat": 20.1234,
  "lng": -98.5678
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario actualizado exitosamente"
}
```

**Respuesta de error (401):**
```json
{
  "message": "Token de autenticación inválido o faltante"
}
```

---

### PUT /api/v1/user/change-password

Permite al usuario cambiar su contraseña.

**URL:** `/api/v1/user/change-password`

**Método:** `PUT`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "currentPassword": "contraseña_actual",
  "newPassword": "nueva_contraseña"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Contraseña cambiada exitosamente"
}
```

**Respuesta de error (403):**
```json
{
  "message": "Contraseña actual incorrecta"
}
```

---

### PUT /api/v1/user/change-image

Permite al usuario cambiar su imagen de perfil.

**URL:** `/api/v1/user/change-image`

**Método:** `PUT`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "image": "https://nueva-imagen.com/foto.jpg"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Imagen cambiada exitosamente"
}
```

**Respuesta de error (401):**
```json
{
  "message": "Token de autenticación inválido o faltante"
}
```

---

### GET /api/v1/user/nearby-sellers

Obtiene una lista de vendedores cercanos a la ubicación del usuario autenticado.

**URL:** `/api/v1/user/nearby-sellers`

**Método:** `GET`

**Headers:**
```
Authorization: Bearer <token>
```

**Parámetros de consulta:**
- `maxDistance` (opcional): Distancia máxima en metros (por defecto: 15000)

**Ejemplo:**
```
GET /api/v1/user/nearby-sellers?maxDistance=10000
```

**Respuesta exitosa (200):**
```json
{
  "sellers": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "username": "vendedor1",
      "address": "Calle Comercial 789",
      "lat": 19.4327,
      "lng": -99.1333,
      "distance": 500.5
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "username": "vendedor2",
      "address": "Avenida Principal 456",
      "lat": 19.4328,
      "lng": -99.1334,
      "distance": 1200.3
    }
  ]
}
```

**Respuesta de error (400):**
```json
{
  "message": "Ubicación del usuario no encontrada"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Ubicación del usuario no encontrada |
| 401 | Token de autenticación inválido o faltante |
| 403 | Contraseña actual incorrecta |
| 500 | Error interno del servidor |

## Notas Importantes

- Todos los endpoints requieren autenticación mediante token JWT
- La distancia se calcula en metros usando la fórmula de Haversine
- Los campos de actualización son opcionales
- La nueva contraseña debe ser diferente a la actual
- Las coordenadas (lat/lng) deben estar en formato decimal 