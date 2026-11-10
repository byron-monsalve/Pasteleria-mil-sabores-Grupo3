Markdown
# Pastelería Mil Sabores

Plataforma web para la pastelería tradicional **Mil Sabores**, desarrollada con **React**, **TypeScript** y **Vite**. La aplicación permite explorar el catálogo de productos por categorías, consultar detalles específicos, gestionar un carrito de compras interactivo, acceder a contenido informativo de la marca, todo respaldado por persistencia local y pruebas unitarias automatizadas.

---

## 🚀 Características Principales

* **Catálogo Dinámico y Persistencia:** Carga inicial de productos con soporte para persistencia en `localStorage`, garantizando disponibilidad de datos sin depender de un backend externo.
* **Componentes Reutilizables y Modulares:** Tarjetas de productos simétricas, barra de navegación institucional y vistas desacopladas.
* **Experiencia de Usuario y Diseño:** Paleta cromática corporativa, tipografías temáticas y maquetación responsiva apoyada en Bootstrap 5.
* **Secciones Informativas:** Reseña histórica de los 50 años de tradición, registro fotográfico de hitos, blog con recetas destacadas y formulario de contacto.
* **Flujo Transaccional:** Carrito de compras en tiempo real, resumen de pedidos y emisión de comprobantes.
* **Garantía de Calidad:** Pruebas unitarias integradas con Vitest y React Testing Library para componentes críticos.

---

## 🛠️ Stack Tecnológico

* **Core:** React 19, TypeScript
* **Herramienta de Construcción:** Vite
* **Diseño y Estilos:** Bootstrap 5.3, CSS3 Custom Properties
* **Testing:** Vitest, React Testing Library, `@testing-library/jest-dom`
* **Control de Versiones:** Git & GitHub

---

## 📁 Estructura del Proyecto


```text
pasteleria-mil-sabores/
├── public/                     # Recursos multimedia estáticos (imágenes del catálogo y registros)
├── src/
│   ├── assets/                 # Recursos gráficos vectoriales e íconos SVG
│   ├── components/
│   │   ├── common/             # Componentes transversales y reutilizables (ej. ProductCard)
│   │   └── layout/             # Componentes estructurales de interfaz (ej. Navbar)
│   ├── data/                   # Servicios de datos, modelos y lógica de almacenamiento local
│   ├── views/                  # Vistas principales de la aplicación (Inicio, Nosotros, Blogs, etc.)
│   ├── App.css                 # Reglas de maquetación y contenedores globales
│   ├── App.tsx                 # Enrutamiento y orquestación general de la aplicación
│   ├── index.css               # Variables de estilo, fuentes institucionales y normalización
│   ├── main.tsx                # Punto de entrada de la aplicación
│   └── setupTests.ts           # Configuración global del entorno de pruebas
├── package.json                # Definición de dependencias y scripts del proyecto
├── tsconfig.app.json           # Configuración de compilación TypeScript
└── vite.config.ts              # Configuración del entorno Vite y suite Vitest


⚙️ Instalación y Uso
Clonar el repositorio:

Bash
git clone [https://github.com/byron-monsalve/Pasteleria-mil-sabores-Grupo3.git](https://github.com/byron-monsalve/Pasteleria-mil-sabores-Grupo3.git)
cd Pasteleria-mil-sabores-Grupo3
Instalar dependencias:

Bash
npm install
Ejecutar en entorno de desarrollo:

Bash
npm run dev
Compilar para producción:

Bash
npm run build
🧪 Pruebas Unitarias
Para ejecutar la suite de pruebas automatizadas:

Bash
npm test --run
Para correr las pruebas en modo observador (watch):

Bash
npm test
