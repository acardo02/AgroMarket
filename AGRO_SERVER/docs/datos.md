# Datos

Este módulo proporciona acceso a datos de referencia del sistema AgroMarket como categorías, unidades de medida y productos.

## Endpoints

### GET /api/v1/data/categories

Obtiene todas las categorías de productos disponibles en el sistema.

**URL:** `/api/v1/data/categories`

**Método:** `GET`

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Frutas",
    "image": "http://via.placeholder.com/150x150"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Verduras",
    "image": "http://via.placeholder.com/150x150"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "Granos",
    "image": "http://via.placeholder.com/150x150"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "name": "Lácteos",
    "image": "http://via.placeholder.com/150x150"
  }
]
```

**Respuesta de error (500):**
```json
{
  "message": "Error interno del servidor"
}
```

---

### GET /api/v1/data/measureUnits

Obtiene todas las unidades de medida disponibles en el sistema.

**URL:** `/api/v1/data/measureUnits`

**Método:** `GET`

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "name": "Kilogramos"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "name": "Litros"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d4",
    "name": "Unidades"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
    "name": "Gramos"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d6",
    "name": "Mililitros"
  }
]
```

**Respuesta de error (500):**
```json
{
  "message": "Error interno del servidor"
}
```

---

### GET /api/v1/data/products

Obtiene todos los productos disponibles en el sistema.

**URL:** `/api/v1/data/products`

**Método:** `GET`

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d5",
    "name": "Manzanas Rojas",
    "description": "Manzanas rojas frescas del valle",
    "price": 2.50,
    "quantity": 100,
    "image": "http://via.placeholder.com/300x200",
    "stock": 50,
    "measureUnit": "64f8a1b2c3d4e5f6a7b8c9d2",
    "measurement": "64f8a1b2c3d4e5f6a7b8c9d6",
    "category": "64f8a1b2c3d4e5f6a7b8c9d0",
    "user": "64f8a1b2c3d4e5f6a7b8c9d7"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d8",
    "name": "Lechuga Fresca",
    "description": "Lechuga orgánica cultivada localmente",
    "price": 1.80,
    "quantity": 75,
    "image": "http://via.placeholder.com/300x200",
    "stock": 30,
    "measureUnit": "64f8a1b2c3d4e5f6a7b8c9d2",
    "measurement": "64f8a1b2c3d4e5f6a7b8c9d9",
    "category": "64f8a1b2c3d4e5f6a7b8c9d1",
    "user": "64f8a1b2c3d4e5f6a7b8c9d7"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d9",
    "name": "Arroz Integral",
    "description": "Arroz integral orgánico de alta calidad",
    "price": 3.20,
    "quantity": 200,
    "image": "http://via.placeholder.com/300x200",
    "stock": 150,
    "measureUnit": "64f8a1b2c3d4e5f6a7b8c9d2",
    "measurement": "64f8a1b2c3d4e5f6a7b8c9da",
    "category": "64f8a1b2c3d4e5f6a7b8c9d2",
    "user": "64f8a1b2c3d4e5f6a7b8c9db"
  }
]
```

**Respuesta de error (500):**
```json
{
  "message": "Error interno del servidor"
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 500 | Error interno del servidor |

## Notas Importantes

- Estos endpoints no requieren autenticación
- Los datos se devuelven en formato JSON
- Las imágenes son URLs que apuntan a recursos externos
- Los IDs son únicos para cada entidad
- Los productos incluyen referencias a categorías y unidades de medida
- Los datos se actualizan en tiempo real
- Estos endpoints son útiles para poblar formularios y listas desplegables
- Los datos de referencia son estáticos y no cambian frecuentemente 