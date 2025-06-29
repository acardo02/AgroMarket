# Autenticación

Este módulo maneja la autenticación de usuarios en el sistema AgroMarket.

## Endpoints

### POST /api/v1/auth/login
****
Inicia sesión de un usuario con nombre de usuario y contraseña.

**URL:** `/api/v1/auth/login`

**Método:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "usuario123",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1h",
  "message": "ok"
}
```

**Respuesta de error (403):**
```json
{
  "message": "User not found"
}
```

**Respuesta de error (500):**
```json
{
  "message": "Error interno del servidor"
}
```

---

### POST /api/v1/auth/register

Registra un nuevo usuario en el sistema.

**URL:** `/api/v1/auth/register`

**Método:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "nuevo_usuario",
  "email": "usuario@ejemplo.com",
  "address": "Calle Principal 123",
  "phone": "1234567890",
  "password": "contraseña123",
  "lat": 19.4326,
  "lng": -99.1332
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado"
}
```

**Respuesta de error (400):**
```json
{
  "message": "User already exists"
}
```

**Respuesta de error (403):**
```json
{
  "message": "Username already in use"
}
```

---

### GET /api/v1/auth/refresh

Renueva el token JWT usando el refresh token almacenado en cookies.

**URL:** `/api/v1/auth/refresh`

**Método:** `GET`

**Headers:**
```
Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1h"
}
```

**Respuesta de error (401):**
```json
{
  "message": "JWT expirado"
}
```

---

### GET /api/v1/auth/logout

Cierra la sesión del usuario eliminando el refresh token de las cookies.

**URL:** `/api/v1/auth/logout`

**Método:** `GET`

**Respuesta exitosa (200):**
```json
{
  "message": "Logout"
}
```

**Respuesta de error (500):**
```json
{
  "message": "Error de server"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Usuario ya existe |
| 401 | Token inválido o expirado |
| 403 | Credenciales inválidas o datos duplicados |
| 500 | Error interno del servidor |

## Notas Importantes

- Todos los tokens JWT tienen una duración de 1 hora
- El refresh token se almacena en cookies HTTP-only
- Las contraseñas se encriptan antes de almacenarse
- Los emails se normalizan automáticamente
- Las ubicaciones (lat/lng) son opcionales pero recomendadas 