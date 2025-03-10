# conatumexServer

<h2> Documentación</h2>
<span>La documentación de la API la encuentras en:</span>  
<a href="http://localhost:3000/api-docs/">http://localhost:3000/api-docs/</a>

---

## Modelos de Respuesta

Este documento describe las clases utilizadas para representar los modelos de respuesta en la aplicación.

---

### `DirectionModelRes`

Representa la dirección de un cliente.

#### Propiedades:
- **calle** (`string`): Nombre de la calle.
- **numeroCasa** (`string`): Número de casa o domicilio.
- **colonia** (`ColoniaModelRes`): Objeto que representa la colonia (opcional).
- **ciudad** (`CiudadModelRes`): Objeto que representa la ciudad (opcional).
- **estado** (`EstadoModelRes`): Objeto que representa el estado (opcional).
- **entreCalles** (`string`): Calles entre las que se encuentra la dirección (opcional).
- **referencia** (`string`): Referencia adicional de la dirección (opcional).

#### Ejemplo de uso:
```javascript
const direction = new DirectionModelRes({
  calle: "Av. Principal",
  numeroCasa: "123",
  coloniaId: { id: 1, name: "Centro" },
  ciudadId: { id: 1, name: "Ciudad de México" },
  estadoId: { id: 1, name: "CDMX" },
  entreCalles: "Calle 1 y Calle 2",
  referencia: "Cerca del parque"
});