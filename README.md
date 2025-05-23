# Clon de Mercado Libre

Este proyecto es un clon de Mercado Libre desarrollado con Next.js 15.3.2 y React 19, implementando las últimas características y mejores prácticas de desarrollo web moderno.
<img width="1425" alt="Captura de pantalla" src="https://github.com/user-attachments/assets/5017ccdb-b7ac-4136-a757-b899a083d47f" />

## 🚀 Tecnologías Principales

- **Next.js 15.3.2**: Framework de React para producción
- **React 19.0.0**: Biblioteca para interfaces de usuario
- **Tailwind CSS**: Framework de CSS para diseño

## 📦 Dependencias Principales

```json
{
  "@types/js-cookie": "^3.0.6", // Tipado para js-cookie
  "@uidotdev/usehooks": "^2.4.1", // Colección de hooks personalizados
  "clsx": "^2.1.1", // Utilidad para construir nombres de clase condicionales
  "js-cookie": "^3.0.5", // Manejo de cookies para los providers
  "lucide-react": "^0.511.0", // Iconos para React
  "next": "15.3.2", // Framework Next.js
  "react": "^19.0.0", // Core de React
  "react-dom": "^19.0.0", // Renderizado de React para web
  "react-icons": "^5.5.0", // Biblioteca de iconos
  "react-multi-carousel": "^2.8.6", // Componente de carrusel
  "tailwind-merge": "^3.3.0" // Utilidad para combinar clases de Tailwind
}
```

## 🏗️ Estructura del Proyecto

```
├── app/
│   ├── api/           # API routes
│   ├── auth/          # Páginas de autenticación
│   ├── cart/          # Página del carrito
│   ├── components/    # Componentes reutilizables
│   ├── product/       # Páginas de productos
│   ├── search/        # Página de búsqueda
│   ├── globals.css    # Estilos globales
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página principal
│   └── providers.tsx  # Providers de la aplicación
├── context/
│   ├── AuthContext.tsx  # Contexto de autenticación
│   └── CartContext.tsx  # Contexto del carrito
```
Credenciales de login:

const MOCK_USER = {
  email: 'meli@test.com',
  password: '123456',
  name: 'Liam Marega',
  id: '1'
};

## 🔐 Providers

### AuthContext

El AuthContext maneja la autenticación de usuarios con las siguientes características:

- Gestión de estado de autenticación
- Almacenamiento seguro de sesión en cookies
- Funciones de login/logout
- Persistencia de sesión

### CartContext

El CartContext gestiona el carrito de compras:

- Manejo del estado del carrito
- Funciones para agregar/remover productos
- Cálculo automático de totales
- Persistencia en cookies

## 📱 Páginas Principales

- **Home (page.tsx)**: Página principal con carrusel de productos y ofertas
- **Login**: Sistema de autenticación de usuarios
- **Cart**: Gestión del carrito de compras
- **Product**: Visualización detallada de productos
- **Search**: Sistema de búsqueda con query params
- **Not Found**: Página personalizada para rutas no encontradas

## 🔍 Sistema de Búsqueda

La funcionalidad de búsqueda implementa las siguientes características:

- Búsqueda mediante query params (`/search?query=producto`)
- Manejo de searchParams en Next.js
- Interfaz responsive para desktop y móvil
- Validación de términos de búsqueda

> **Nota sobre la búsqueda**: Actualmente la API utilizada (fakestoreapi.in) no proporciona endpoints para filtrado de productos por nombre. Como mejora futura, se planea implementar:
>
> - Cacheo local de productos para búsqueda y filtrado client-side
> - Sistema de filtros y ordenamiento sobre los datos almacenados
> - Búsqueda fuzzy para mejores resultados
> - Historial de búsquedas recientes

## 🎨 Estilos

El proyecto utiliza un sistema de diseño personalizado con:

- Variables CSS personalizadas para temas
- Integración con Tailwind CSS
- Fuente personalizada Proxima Nova
- Diseño responsive

## 🚀 Cómo Empezar

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📝 Notas

Este proyecto es un clon con fines educativos y de práctica, implementando las mejores prácticas de desarrollo web moderno con Next.js y React.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
