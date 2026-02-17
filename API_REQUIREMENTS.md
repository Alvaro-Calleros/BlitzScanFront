# Requerimientos de API para Blitz Scan

Basado en la implementación del frontend, estos son los endpoints requeridos para Autenticación y Gestión de Usuarios.

## URL Base
Todos los endpoints deben tener el prefijo `/api` (ej: `http://localhost:3001/api`).

## Modelos de Datos

### Usuario (User)
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;          // ej: 'user', 'admin'
  organizacion: string;  // Nota: El frontend usa 'organizacion' en la interfaz User.
  creado_en: string;     // Fecha en formato ISO string
  profileImage?: string; // Ruta URL a la imagen
}
```

## Endpoints

### 1. Iniciar Sesión (Login)
**Endpoint:** `POST /api/login`

**Cuerpo de la Petición (Request Body):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "role": "user",
    "organizacion": "Empresa Acme",
    "creado_en": "2023-01-01T00:00:00.000Z",
    "profileImage": "/uploads/profile-1.jpg"
  }
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "Credenciales incorrectas"
}
```

---

### 2. Registro (Register)
**Endpoint:** `POST /api/register`

**Cuerpo de la Petición:**
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "organization": "Empresa Acme"
}
```

**Respuesta Exitosa (200 OK o 201 Created):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
```
*Nota: El frontend intenta hacer login automático después de un registro exitoso.*

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "El correo ya está registrado"
}
```

---

### 3. Actualizar Imagen de Perfil
**Endpoint:** `POST /api/update-profile`

**Cuerpo de la Petición:** `FormData`
- `id`: ID del Usuario
- `profileImage`: Archivo binario (la imagen)

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "profileImage": "/path/to/new/image.jpg",
  "message": "Foto de perfil actualizada"
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "Error al actualizar la imagen"
}
```

---

### 4. Cambiar Contraseña
**Endpoint:** `POST /api/change-password`

**Cuerpo de la Petición:**
```json
{
  "id": "1",
  "oldPassword": "passwordActual",
  "newPassword": "passwordNuevaSegura"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Contraseña actualizada"
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "La contraseña actual es incorrecta"
}
```

## Notas Adicionales
- El frontend asume nombres de campo específicos como `firstName`, `lastName`, y `organizacion`.
- Se espera que las imágenes de perfil sean servidas por el backend (ej: `http://localhost:3001/uploads/imagen.jpg`).
