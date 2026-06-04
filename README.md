# AMDEX - Plataforma Escolar RPG Pixel Art

## 🎮 Descripción

AMDEX es una plataforma web de gamificación escolar inspirada en Stardew Valley y Codédex. Implementa un sistema RPG completo con pixel art donde los estudiantes pueden completar tareas, ganar experiencia, moneda virtual y gestionar inventarios.

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- **Admin**: `adminamazonica` / `adminamazonica123`
- Roles: Administrador, Profesor, Estudiante
- Sin registro público (solo el admin crea cuentas)
- Sistema de login seguro

### 🎯 Sistema de Tareas
- **Tareas Globales**: Disponibles para todos los estudiantes
- **Tareas de Curso**: Asignadas a estudiantes específicos (duración: 7 días)
- Validación por profesores
- Recompensas instantáneas (Básica, Intermedia, Difícil)

### ⚔️ Sistema de Personajes
- 15 personajes iniciales (Fuerza, Agilidad, Inteligencia)
- Sistema de atributos personalizable
- Sprites en formato emoji (Pixel Art)

### 📈 Sistema de Experiencia
- Niveles: 1 a 100
- Fórmula: XP = 100 × (Nivel^1.5)
- Progresión acelerada al inicio, difícil cerca del nivel 100
- Tiers de recompensas según nivel

### 💰 Economía
- Moneda: **AMZ V** (Amazonicas Virtuales)
- Sistema de compra/venta configurable
- Gestión económica por administrador

### 🎒 Sistema de Mochilas
- Nivel 1: 5 slots
- Nivel 2: 10 slots
- Nivel 3: 15 slots
- Restricción de compra sin mochila

### 📦 Inventario
- 30 objetos configurables
- Tipos: Consumibles, Reutilizables, No Utilizables
- Gestión completa por administrador

### 🏆 Leaderboard
- Ordenado por: Nivel → Tareas Completadas → Cantidad de Objetos
- Actualización automática

### 🔔 Sistema de Notificaciones
- Notificaciones de objetos usados para profesores
- Historial persistente
- Información: Estudiante, Objeto, Fecha y Hora

### 🎨 Personalización
- Imágenes en Base64
- Cambio de avatares
- Modificación de objetos
- Persistencia total en localStorage

## 💾 Almacenamiento

Todo se guarda en **localStorage** del navegador:
- Usuarios y autenticación
- Tareas y recompensas
- Inventarios
- Configuración
- Imágenes (Base64)
- Notificaciones

**Nota**: Los datos persisten después de recargar la página.

## 🚀 Cómo Usar

### 1. Iniciar Sesión
```
Usuario: adminamazonica
Contraseña: adminamazonica123
```

### 2. Panel Administrador
- Crear profesores y estudiantes
- Modificar catálogo de objetos
- Gestionar economía (AMZ V)
- Cambiar avatares e imágenes

### 3. Panel Profesor
- Crear tareas globales o de curso
- Validar tareas de estudiantes
- Otorgar recompensas
- Recibir notificaciones de objetos usados

### 4. Panel Estudiante
- Ver tareas disponibles
- Completar tareas
- Reclamar recompensas
- Usar objetos del inventario
- Comprar objetos en la tienda
- Subir de nivel

## 📊 Tiers de Recompensas

| Tier | Nivel | Recompensas |
|------|-------|-------------|
| 1 | 1-20 | Cosméticos, Insignias, Títulos |
| 2 | 21-60 | Acceso prioritario a biblioteca |
| 3 | 61-99 | Selección de asiento |
| 4 | 100 | Receso Premium, Prioridad en filas |

## 🎁 Recompensas de Tareas

| Tipo | AMZ V | XP | Atributo |
|------|-------|-----|----------|
| Básica | 1 | 10 | Aleatorio |
| Intermedia | 2 | 20 | Aleatorio |
| Difícil | 3 | 30 | Aleatorio |

## 🛠️ Tecnología

- **Frontend**: React.js 18
- **Estilos**: Tailwind CSS
- **Fuente**: Press Start 2P (Pixel Art)
- **Almacenamiento**: localStorage
- **Arquitectura**: SPA (Single Page Application)

## 📋 Requisitos Cumplidos

✅ Plataforma RPG estilo Pixel Art
✅ Sistema de autenticación con 3 roles
✅ Almacenamiento exclusivamente en localStorage
✅ Persistencia de datos después de recargar
✅ Sistema de tareas con expiración
✅ Validación de tareas por profesores
✅ Recompensas instantáneas
✅ Sistema de experiencia y niveles
✅ Moneda virtual (AMZ V)
✅ Sistema de mochilas con capacidad limitada
✅ Inventario con múltiples copias
✅ Catálogo de 30 objetos
✅ Sistema de notificaciones
✅ Leaderboard dinámico
✅ Personalización de imágenes en Base64
✅ Gestión económica por admin
✅ Atributos y estadísticas
✅ Interfaz Pixel Art responsiva
✅ Trazabilidad profesional

## 🎮 Experiencia de Usuario

- Interfaz intuitiva y clara
- Diseño Pixel Art retro inspirado en Stardew Valley
- Navegación simplificada por tabs
- Retroalimentación visual de acciones
- Animaciones sutiles de flotación
- Colores cálidos y acogedores

## 📝 Notas

- El admin puede modificar todos los aspectos del juego
- Las tareas de curso tienen exactamente 7 días de duración
- La progresión de niveles es exponencial
- Todas las transacciones quedan registradas en localStorage
- El sistema soporta múltiples sesiones simultáneas (diferente navegador)

---

**Creado para**: AMAZONICASCHOOL
**Plataforma**: AMDEX (Amazónica Digital Experience)
**Fecha**: 2026
