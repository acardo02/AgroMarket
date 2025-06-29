// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AgroMarket API',
      version: '1.0.0',
      description: 'API REST para el sistema de AgroMarket - Gestión de productos, usuarios, transacciones y más',
      contact: {
        name: 'AgroMarket Support',
        email: 'support@agromarket.com'
      },
      tags: [
        {
          name: 'Orders',
          description: 'Endpoints para la gestión de órdenes de compra'
        },
        {
          name: 'Products',
          description: 'Endpoints para la gestión de productos del sistema'
        },
        {
          name: 'Transactions',
          description: 'Endpoints para la gestión de transacciones'
        },
        {
          name: 'Users',
          description: 'Endpoints para la gestión de usuarios y perfiles'
        }
      ]
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT para autenticación'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario único'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario'
            },
            address: {
              type: 'string',
              description: 'Dirección del usuario'
            },
            phone: {
              type: 'string',
              description: 'Número de teléfono del usuario'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario'
            },
            lat: {
              type: 'number',
              description: 'Latitud de la ubicación'
            },
            lng: {
              type: 'number',
              description: 'Longitud de la ubicación'
            }
          },
          required: ['username', 'email', 'address', 'phone', 'password']
        },
        LoginRequest: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario'
            }
          },
          required: ['username', 'password']
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT de acceso'
            },
            expiresIn: {
              type: 'string',
              description: 'Tiempo de expiración del token'
            },
            message: {
              type: 'string',
              description: 'Mensaje de respuesta'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            product: {
              type: 'string',
              description: 'ID del producto'
            },
            quantity: {
              type: 'number',
              description: 'Cantidad del producto'
            }
          },
          required: ['product', 'quantity']
        },
        Cart: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              description: 'ID del usuario propietario del carrito'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem'
              },
              description: 'Lista de productos en el carrito'
            }
          }
        },
        AddToCartRequest: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto a agregar'
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Cantidad del producto'
            }
          },
          required: ['productId', 'quantity']
        },
        RemoveFromCartRequest: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto a remover'
            }
          },
          required: ['productId']
        },
        UpdateCartRequest: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto'
                  },
                  quantity: {
                    type: 'number',
                    minimum: 1,
                    description: 'Nueva cantidad del producto'
                  }
                },
                required: ['productId', 'quantity']
              },
              description: 'Array de productos con sus nuevas cantidades'
            }
          },
          required: ['items']
        },
        UpdateCartResponse: {
          type: 'object',
          properties: {
            cart: {
              $ref: '#/components/schemas/Cart'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto con error'
                  },
                  message: {
                    type: 'string',
                    description: 'Mensaje de error'
                  }
                }
              },
              description: 'Errores encontrados durante la actualización'
            }
          }
        },
        CreditsRequest: {
          type: 'object',
          properties: {
            credits: {
              type: 'number',
              minimum: 0,
              description: 'Cantidad de créditos a agregar o restar'
            }
          },
          required: ['credits']
        },
        CreditsResponse: {
          type: 'object',
          properties: {
            credits: {
              type: 'number',
              description: 'Saldo actual de créditos del usuario'
            }
          }
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la categoría'
            },
            name: {
              type: 'string',
              description: 'Nombre de la categoría'
            },
            image: {
              type: 'string',
              description: 'URL de la imagen de la categoría'
            }
          }
        },
        MeasureUnit: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la unidad de medida'
            },
            name: {
              type: 'string',
              description: 'Nombre de la unidad de medida'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del producto'
            },
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Precio del producto'
            },
            stock: {
              type: 'number',
              minimum: 0,
              description: 'Stock disponible del producto'
            },
            image: {
              type: 'string',
              description: 'URL de la imagen del producto'
            },
            category: {
              $ref: '#/components/schemas/Category',
              description: 'Categoría del producto'
            },
            measureUnit: {
              $ref: '#/components/schemas/MeasureUnit',
              description: 'Unidad de medida del producto'
            },
            user: {
              type: 'string',
              description: 'ID del usuario propietario del producto'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del producto'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización del producto'
            }
          },
          required: ['name', 'description', 'price', 'stock', 'category', 'measureUnit', 'user']
        },
        ProductResponse: {
          type: 'object',
          properties: {
            product: {
              $ref: '#/components/schemas/Product'
            }
          }
        },
        ProductsResponse: {
          type: 'object',
          properties: {
            products: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Product'
              }
            }
          }
        },
        CreateProductRequest: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock', 'category', 'measureUnit'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Precio del producto'
            },
            stock: {
              type: 'number',
              minimum: 0,
              description: 'Cantidad disponible en stock'
            },
            category: {
              type: 'string',
              description: 'Nombre de la categoría del producto'
            },
            measureUnit: {
              type: 'string',
              description: 'Nombre de la unidad de medida'
            },
            image: {
              type: 'string',
              description: 'URL de la imagen del producto'
            }
          }
        },
        UpdateProductRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nuevo nombre del producto'
            },
            description: {
              type: 'string',
              description: 'Nueva descripción del producto'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Nuevo precio del producto'
            },
            stock: {
              type: 'number',
              minimum: 0,
              description: 'Nueva cantidad en stock'
            },
            category: {
              type: 'string',
              description: 'Nueva categoría del producto'
            },
            measureUnit: {
              type: 'string',
              description: 'Nueva unidad de medida'
            },
            image: {
              type: 'string',
              description: 'Nueva URL de la imagen'
            }
          }
        },
        BuyProductResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de confirmación de la compra'
            }
          }
        },
        DeleteProductResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de confirmación de eliminación'
            }
          }
        },
        OrderItem: {
          type: 'object',
          properties: {
            product: {
              type: 'string',
              description: 'ID del producto en la orden'
            },
            quantity: {
              type: 'number',
              minimum: 1,
              description: 'Cantidad del producto'
            }
          },
          required: ['product', 'quantity']
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la orden'
            },
            buyer: {
              type: 'string',
              description: 'ID del comprador'
            },
            seller: {
              type: 'string',
              description: 'ID del vendedor'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem'
              },
              description: 'Lista de productos en la orden'
            },
            eta: {
              type: 'string',
              description: 'Tiempo estimado de llegada (ej: "30 min")'
            },
            route: {
              type: 'object',
              description: 'Información de la ruta desde OpenRoute API'
            },
            status: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed', 'cancelled'],
              description: 'Estado actual de la orden'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación de la orden'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización de la orden'
            }
          }
        },
        UpdateOrderStatusRequest: {
          type: 'object',
          properties: {
            newStatus: {
              type: 'string',
              enum: ['pending', 'in_progress', 'completed', 'cancelled'],
              description: 'Nuevo estado de la orden'
            }
          },
          required: ['newStatus']
        },
        CreateOrderResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de confirmación'
            },
            orders: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Order'
              },
              description: 'Lista de órdenes creadas'
            }
          }
        },
        UpdateOrderStatusResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de confirmación'
            },
            order: {
              $ref: '#/components/schemas/Order'
            }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la transacción'
            },
            value: {
              type: 'number',
              description: 'Valor de la transacción (positivo para depósitos, negativo para compras/retiros)'
            },
            type: {
              type: 'string',
              enum: ['deposito', 'compra', 'retiro'],
              description: 'Tipo de transacción'
            },
            user: {
              type: 'string',
              description: 'ID del usuario propietario de la transacción'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de la transacción'
            }
          },
          required: ['value', 'type', 'user']
        },
        CreateTransactionRequest: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['deposito', 'compra', 'retiro'],
              description: 'Tipo de transacción'
            },
            value: {
              type: 'number',
              minimum: 0,
              description: 'Valor de la transacción (se aplicará signo negativo automáticamente para compras y retiros)'
            }
          },
          required: ['type', 'value']
        },
        CreateTransactionResponse: {
          type: 'object',
          properties: {
            transaction: {
              $ref: '#/components/schemas/Transaction'
            }
          }
        },
        GetTransactionsResponse: {
          type: 'object',
          properties: {
            alltransactions: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Transaction'
              },
              description: 'Lista de todas las transacciones del usuario'
            }
          }
        },
        UserInfoResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
              description: 'Información completa del usuario'
            }
          }
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Nuevo nombre de usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Nuevo correo electrónico'
            },
            phone: {
              type: 'string',
              description: 'Nuevo número de teléfono'
            },
            address: {
              type: 'string',
              description: 'Nueva dirección'
            },
            password: {
              type: 'string',
              description: 'Nueva contraseña'
            }
          }
        },
        ChangePasswordRequest: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              description: 'Contraseña actual'
            },
            newPassword: {
              type: 'string',
              description: 'Nueva contraseña'
            }
          },
          required: ['password', 'newPassword']
        },
        ChangeImageRequest: {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              description: 'URL de la nueva imagen de perfil'
            }
          },
          required: ['image']
        },
        NearbySeller: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID del vendedor'
            },
            username: {
              type: 'string',
              description: 'Nombre de usuario del vendedor'
            },
            location: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  description: 'Tipo de geometría (Point)'
                },
                coordinates: {
                  type: 'array',
                  items: {
                    type: 'number'
                  },
                  description: 'Coordenadas [longitud, latitud]'
                }
              }
            }
          }
        },
        GetNearbySellersResponse: {
          type: 'object',
          properties: {
            sellers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/NearbySeller'
              },
              description: 'Lista de vendedores cercanos'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de confirmación'
            }
          }
        }
      }
    }
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    './src/routes/*.js'
  ], 
};


const swaggerSpec = swaggerJSDoc(options);



export { swaggerUi, swaggerSpec };