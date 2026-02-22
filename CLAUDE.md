# CLAUDE.md — Contexto del Frontend (BlitzScan)

## Descripción del Frontend

Frontend del proyecto **BlitzScan**. Stack principal: **React 18 + Vite + TailwindCSS + shadcn/ui + TypeScript**, desplegado en Vercel. Se comunica con el backend vía REST API. La autenticación será manejada por **Clerk** (actualmente usa un `AuthContext` propio que será reemplazado).

---

## Componentes Reutilizables Identificados

Estos componentes **se conservan** y no deben modificarse sin instrucción explícita:

### Componentes de UI (shadcn/ui) — `src/components/ui/`

Hay **49 componentes** de shadcn/ui instalados. Los más relevantes para el proyecto son:

| Componente | Uso esperado |
|---|---|
| `button.tsx` | Botones en toda la app |
| `card.tsx` | Tarjetas de auditoría, categorías, resultados |
| `input.tsx` / `textarea.tsx` | Formularios de setup y checklist |
| `progress.tsx` | Barra de progreso del checklist |
| `tabs.tsx` | Navegación entre categorías OWASP |
| `badge.tsx` | Indicadores de estado (completado, pendiente, etc.) |
| `dialog.tsx` / `sheet.tsx` | Modales y paneles laterales |
| `select.tsx` | Selectores en formularios |
| `checkbox.tsx` / `radio-group.tsx` | Opciones en checklist |
| `toast.tsx` / `sonner.tsx` | Notificaciones al usuario |
| `table.tsx` | Tabla de auditorías en el dashboard |
| `separator.tsx` | Separadores visuales |
| `skeleton.tsx` | Estados de carga |
| `tooltip.tsx` | Ayuda contextual |
| `accordion.tsx` | Secciones colapsables en reportes |
| `chart.tsx` | Gráficas de resultados (usa Recharts) |
| `form.tsx` | Integración con react-hook-form + zod |
| `label.tsx` | Labels de formularios |
| `scroll-area.tsx` | Áreas con scroll personalizado |
| `alert.tsx` / `alert-dialog.tsx` | Alertas y confirmaciones |

Otros componentes instalados pero menos críticos: `avatar`, `breadcrumb`, `calendar`, `carousel`, `collapsible`, `command`, `context-menu`, `dropdown-menu`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `resizable`, `sidebar`, `slider`, `switch`, `toggle`, `toggle-group`.

### Componentes Custom — `src/components/`

| Componente | Descripción | Conservar |
|---|---|---|
| `Navbar.tsx` | Barra de navegación principal (11KB, incluye menú responsive) | ✅ Adaptar para nuevas rutas |
| `Footer.tsx` | Pie de página con enlaces y redes sociales | ✅ Conservar |
| `Hero.tsx` | Sección principal de la landing page | ✅ Conservar (actualizar texto) |
| `Features.tsx` | Sección de características del producto | ✅ Conservar (actualizar contenido) |
| `About.tsx` | Sección "Acerca de" | ✅ Conservar |
| `HowItWorks.tsx` | Sección "Cómo funciona" | ✅ Conservar (actualizar pasos) |
| `AccountSettings.tsx` | Configuración de cuenta del usuario | ⚠️ Revisar — adaptar a Clerk |

### Hooks — `src/hooks/`

| Hook | Descripción | Conservar |
|---|---|---|
| `use-mobile.tsx` | Detecta si el dispositivo es móvil | ✅ |
| `use-toast.ts` | Hook para mostrar notificaciones (toast) | ✅ |

### Utilidades — `src/lib/`

| Archivo | Descripción | Conservar |
|---|---|---|
| `utils.ts` | Utilidad `cn()` para merge de clases Tailwind (clsx + tailwind-merge) | ✅ |

---

## Secciones a Eliminar o Reemplazar

Estos archivos corresponden a funcionalidad vieja (scanner/pentesting) y serán **eliminados o reescritos completamente**:

### Páginas a eliminar — `src/pages/`

| Archivo | Razón |
|---|---|
| `Scanner.tsx` | Página de escaneo de seguridad — funcionalidad obsoleta |
| `Demo.tsx` | Demo del scanner viejo — ya no aplica |
| `Login.tsx` | Login propio con fetch a `localhost:3001` — será reemplazado por Clerk |
| `Register.tsx` | Registro propio con fetch a `localhost:3001` — será reemplazado por Clerk |
| `Profile.tsx` | Perfil viejo vinculado al AuthContext propio — reemplazar |

### Componentes a eliminar — `src/components/`

| Archivo | Razón |
|---|---|
| `FuzzingResult.tsx` | Muestra resultados de fuzzing — funcionalidad de pentesting |
| `NmapResult.tsx` | Muestra resultados de Nmap — funcionalidad de pentesting |
| `WhoisResult.tsx` | Muestra resultados de WHOIS — funcionalidad de pentesting |

### Utilidades a eliminar — `src/utils/`

| Archivo | Razón |
|---|---|
| `scanUtils.ts` | Contiene TODA la lógica de escaneo: fuzzing, nmap, whois, generación de PDF de escaneo, conexiones directas a `localhost:5000`. Eliminar completamente. |

### Contexto a reemplazar — `src/contexts/`

| Archivo | Razón |
|---|---|
| `AuthContext.tsx` | Autenticación propia con `fetch` directo a `localhost:3001/api/login` y `localhost:3001/api/register`. Almacena usuario en `localStorage`. **Reemplazar completamente por Clerk.** |

---

## Secciones Nuevas a Construir

### Páginas nuevas — `src/pages/`

| Página | Ruta | Descripción |
|---|---|---|
| `Dashboard.tsx` | `/dashboard` | Lista de auditorías del usuario con estado y score. Tabla con filtros. |
| `Setup.tsx` | `/setup` | Formulario de nueva auditoría (nombre + URL opcional). Crea auditoría vía API. |
| `Checklist.tsx` | `/checklist/:id` | Interfaz de preguntas paso a paso. 10 categorías OWASP. Barra de progreso. Guardado automático. |
| `Report.tsx` | `/report/:id` | Score visual, breakdown por categoría, gráficas con Recharts, botón de descarga PDF. |

### Archivo de API centralizado (NUEVO)

| Archivo | Descripción |
|---|---|
| `src/lib/api.ts` | **[NUEVO]** Todas las llamadas al backend centralizadas. Usa `axios`. Incluye token de Clerk en headers. Base URL desde `VITE_API_URL`. |

### Flujo de navegación esperado

```
Landing (/) → Login (Clerk) → Dashboard (/dashboard)
                                  ├── Setup (/setup) → Checklist (/checklist/:id)
                                  └── Auditoría existente → Checklist (/checklist/:id) → Reporte (/report/:id)
```

---

## Stack y Dependencias

### Dependencias actuales (conservar)

| Dependencia | Uso |
|---|---|
| `react` / `react-dom` (18.x) | Framework base |
| `react-router-dom` (6.x) | Navegación y rutas |
| `@tanstack/react-query` (5.x) | Cache y estado de server |
| `tailwindcss` (3.x) + `tailwindcss-animate` | Estilos |
| `@radix-ui/*` (múltiples) | Primitivas de UI (shadcn/ui) |
| `class-variance-authority` + `clsx` + `tailwind-merge` | Utilidades de clases |
| `lucide-react` | Iconos |
| `recharts` | Gráficas para reportes |
| `react-hook-form` + `@hookform/resolvers` + `zod` | Formularios con validación |
| `sonner` | Notificaciones toast |
| `date-fns` | Manejo de fechas |
| `next-themes` | Soporte de tema oscuro |
| `vite` (5.x) + `@vitejs/plugin-react-swc` | Bundler y compilador |
| `typescript` (5.x) | Tipado |

### Dependencias nuevas a instalar

| Dependencia | Uso |
|---|---|
| `@clerk/clerk-react` | Autenticación (reemplaza AuthContext) |
| `axios` | Llamadas HTTP al backend (reemplaza fetch directo) |

### Dependencias a eliminar eventualmente

| Dependencia | Razón |
|---|---|
| `gh-pages` | Ya no se despliega en GitHub Pages (se usa Vercel) |
| `embla-carousel-react` | Evaluar si se necesita en el nuevo diseño |
| `react-resizable-panels` | Evaluar si se necesita |
| `vaul` (drawer) | Evaluar si se necesita |
| `cmdk` (command palette) | Evaluar si se necesita |
| `input-otp` | Evaluar si se necesita |
| `react-day-picker` | Evaluar si se necesita |

---

## Configuración de Tailwind

### Archivo: `tailwind.config.ts`

- **Dark mode**: habilitado por clase (`darkMode: ["class"]`)
- **Fuentes custom**: `Inter`, `Poppins`, `monospace`
- **Sistema de colores**: basado en CSS variables HSL (patrón shadcn/ui)
  - `--background`, `--foreground`, `--primary`, `--secondary`, `--destructive`, `--muted`, `--accent`, `--popover`, `--card`, `--sidebar-*`
- **Border radius**: sistema con variable `--radius` (lg, md, sm)
- **Animaciones**: `accordion-down`, `accordion-up` + plugin `tailwindcss-animate`
- **Container**: centrado, `2rem` padding, max `1400px`
- **Plugin**: `@tailwindcss/typography` (dev)

> **No modificar la paleta de colores ni el tema sin instrucción explícita.**

---

## Conexión con el Backend

### Estado actual (a reemplazar)

Las conexiones actuales son directas y **están hardcodeadas**:
- `AuthContext.tsx` → `http://localhost:3001/api/login` y `/api/register`
- `scanUtils.ts` → `http://localhost:5000` (scanner backend)

### Configuración objetivo

```
Base URL:     Variable de entorno VITE_API_URL
Archivo:      src/lib/api.ts (NUEVO — centralizar todas las llamadas)
Auth header:  Authorization: Bearer <token_de_clerk>
```

**Patrón de uso:**

```typescript
// src/lib/api.ts
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para agregar token de Clerk
api.interceptors.request.use(async (config) => {
  const token = await getToken(); // Se configura con Clerk
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## Estructura del Router

### Estado actual (`App.tsx`)

```
/            → Index (landing page)
/demo        → Demo (scanner demo — ELIMINAR)
/login       → Login (propio — REEMPLAZAR por Clerk)
/register    → Register (propio — REEMPLAZAR por Clerk)
/scanner     → Scanner (pentesting — ELIMINAR)
/profile     → Profile (viejo — REEMPLAZAR)
*            → NotFound
```

### Router objetivo

```
/                   → Index (landing page — conservar)
/dashboard          → Dashboard (NUEVO — requiere auth)
/setup              → Setup (NUEVO — requiere auth)
/checklist/:id      → Checklist (NUEVO — requiere auth)
/report/:id         → Report (NUEVO — requiere auth)
*                   → NotFound (conservar)
```

Providers en `App.tsx`: `QueryClientProvider` → `ClerkProvider` → `TooltipProvider` → `BrowserRouter` → `Routes`

---

## Convenciones

- Componentes en **PascalCase** (ej: `Dashboard.tsx`, `ChecklistItem.tsx`)
- Hooks personalizados en `src/hooks/` (ej: `useAudits.ts`, `useChecklist.ts`)
- Utilidades y API en `src/lib/` (ej: `api.ts`, `utils.ts`)
- Código y comentarios en **español**
- **No lógica de negocio en componentes** — solo presentación y llamadas a `api.ts`
- Validación de formularios con **zod + react-hook-form**
- Estado del servidor con **@tanstack/react-query**
- Tipos e interfaces en el mismo archivo o en `src/types/` si son compartidos

---

## Lo que Claude Code NO debe hacer en este repo

1. ❌ **No tocar componentes de `src/components/ui/`** sin instrucción explícita (son shadcn/ui)
2. ❌ **No cambiar la paleta de colores** ni el tema de Tailwind (`tailwind.config.ts`, `index.css`)
3. ❌ **No instalar dependencias de escaneo o pentesting** (nmap, whois, fuzzing, etc.)
4. ❌ **No conectar directamente a la base de datos** — todo va por el backend vía `api.ts`
5. ❌ **No usar `fetch` directo** — usar `axios` a través de `src/lib/api.ts`
6. ❌ **No hardcodear URLs de backend** — usar siempre `VITE_API_URL`
7. ❌ **No crear lógica de autenticación propia** — usar Clerk
8. ❌ **No modificar** `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `Features.tsx`, `About.tsx`, `HowItWorks.tsx` sin instrucción explícita
