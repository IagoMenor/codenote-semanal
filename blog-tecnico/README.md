Mi Blog Técnico - Proyecto DAM
Este proyecto es un Blog Técnico con buscador integrado desarrollado como parte de los requisitos de evaluación del ciclo de Desarrollo de Aplicaciones Multiplataforma (DAM). Permite crear, editar, eliminar y buscar artículos técnicos soportando formato Markdown.

🛠️ Requisitos Técnicos Cumplidos
He implementado los siguientes "Mínimos técnicos" requeridos para el proyecto:

Frontend y Backend: Next.js (App Router) utilizando Server Components y Server Actions para la gestión de la lógica y la interfaz.

Base de Datos: SQLite gestionado a través del ORM Drizzle.

Integración con API Externa: Consumo de la API pública de Dev.to para mostrar una sección dinámica de "Últimos artículos recomendados".

Buscador: Funcionalidad de filtrado de artículos en tiempo real mediante parámetros de URL (searchParams).

💻 Cómo arrancar el proyecto en local
Para ejecutar este proyecto en tu propia máquina, sigue estos pasos:

Clonar el repositorio:

Bash
git clone <URL_DE_TU_REPOSITORIO>
cd blog-tecnico
Instalar dependencias:

Bash
npm install
Sincronizar la base de datos (SQLite):
Esto creará el archivo local de la base de datos y aplicará los esquemas de Drizzle.

Bash
npx drizzle-kit push
Iniciar el servidor de desarrollo:

Bash
npm run dev
Abre http://localhost:3000 en tu navegador para ver la aplicación.

🧠 Decisiones Técnicas
Next.js y Server Actions: Elegidos por la facilidad de tener el frontend y backend en un mismo repositorio. Las Server Actions (en lib/actions.ts) me permiten hacer mutaciones en la base de datos sin necesidad de crear endpoints de API REST tradicionales, simplificando el código.

Buscador basado en URL: La búsqueda se gestiona leyendo los searchParams de la URL. Esto no solo mejora el rendimiento usando filtrado en memoria, sino que permite que las búsquedas sean "compartibles" (si envías un link con /?query=android, la otra persona verá esos resultados).

Arquitectura de Componentes: Se ha separado la lógica de UI externa (como el lector de la API de Dev.to) en una carpeta /components en la raíz, dejando la carpeta /app estrictamente para el enrutamiento.

🤖 Uso de IA en el desarrollo
Para este proyecto, he utilizado un asistente de IA (Gemini) como "pair programmer" y mentor técnico. El uso se ha documentado de la siguiente manera:

Generación de base y estructura: Se utilizó para entender cómo integrar Drizzle ORM con Next.js y estructurar correctamente los Server Actions.

Resolución de bugs (Debugging): Le pedí ayuda para solucionar un error de sintaxis SQL al intentar usar el operador ilike nativo en SQLite. La IA propuso cambiar la estrategia a un filtrado en memoria mediante .filter() en JavaScript, lo cual resolvió el problema y optimizó la búsqueda local.

