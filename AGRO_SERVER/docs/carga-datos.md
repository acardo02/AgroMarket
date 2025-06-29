# Carga de Datos de Muestra

Este módulo permite cargar datos de muestra en el sistema AgroMarket para propósitos de desarrollo y pruebas.

## Endpoints

### POST /api/v1/upload/sample1

Carga datos de muestra para categorías de productos.

**URL:** `/api/v1/upload/sample1`

**Método:** `POST`

**Respuesta exitosa (200):**
```json
{
  "message": "Categorías de muestra cargadas exitosamente",
  "categories": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Frutas",
      "image": "http://via.placeholder.com/150x150"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Verduras",
      "image": "http://via.placeholder.com/150x150"
    }
  ]
}
```

---

### POST /api/v1/upload/sample2

Carga datos de muestra para unidades de medida.

**URL:** `/api/v1/upload/sample2`

**Método:** `POST`

**Respuesta exitosa (200):**
```json
{
  "message": "Unidades de medida de muestra cargadas exitosamente",
  "measureUnits": [
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
    }
  ]
}
```

---

### POST /api/v1/upload/sample3

Carga datos de muestra para productos.

**URL:** `/api/v1/upload/sample3`

**Método:** `POST`

**Respuesta exitosa (200):**
```json
{
  "message": "Productos de muestra cargados exitosamente",
  "products": [
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
    }
  ]
}
```

## Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 500 | Error interno del servidor |

## Notas Importantes

- Estos endpoints están diseñados para desarrollo y pruebas
- Los datos de muestra incluyen categorías, unidades de medida y productos
- Se recomienda ejecutar los endpoints en el siguiente orden:
  1. `/sample1` - Categorías
  2. `/sample2` - Unidades de medida
  3. `/sample3` - Productos
- Los datos de muestra son estáticos y predefinidos
- Estos endpoints pueden sobrescribir datos existentes
- Se recomienda usar solo en entornos de desarrollo
- Los IDs generados son consistentes entre ejecuciones 