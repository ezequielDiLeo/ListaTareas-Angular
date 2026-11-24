# Lista de tareas — Doable

Aplicación web para crear y organizar tareas del día a día. Permite agregar, editar, completar, eliminar y buscar tareas, además de mostrar el progreso general y guardar la información directamente en el navegador.

Desarrollada con Angular 17 y TypeScript.

## Características

- Agregar nuevas tareas.
- Marcar tareas como completadas o pendientes.
- Editar el texto de una tarea.
- Eliminar tareas individuales.
- Eliminar todas las tareas completadas.
- Filtrar por todas, pendientes o completadas.
- Buscar tareas por texto.
- Visualizar el porcentaje de progreso.
- Mostrar mensajes de confirmación mediante notificaciones temporales.
- Guardar y recuperar automáticamente las tareas con `localStorage`.
- Migrar automáticamente datos de la versión anterior del almacenamiento.
- Diseño adaptable para escritorio y dispositivos móviles.

## Tecnologías

- Angular 17
- TypeScript 5.4
- RxJS 7.8
- CSS
- Angular Standalone Components
- Local Storage
- Karma y Jasmine

## Requisitos

- Node.js
- npm
- Angular CLI

Angular CLI se puede instalar globalmente con:

```bash
npm install -g @angular/cli
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/ezequielDiLeo/ListaTareas-Angular.git
```

2. Entrar al directorio del proyecto:

```bash
cd ListaTareas-Angular
```

3. Instalar las dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm start
```

5. Abrir la aplicación en el navegador:

```text
http://localhost:4200/
```

## Uso

1. Escribe una tarea en el campo principal y presiona **Agregar**.
2. Usa el círculo a la izquierda de cada tarea para cambiar su estado.
3. Utiliza los botones visibles al pasar el cursor sobre una tarea para editarla o eliminarla.
4. Usa los filtros para mostrar todas las tareas, las pendientes o las completadas.
5. Escribe en el buscador para encontrar una tarea por su texto.
6. Presiona **Limpiar completadas** para eliminar todas las tareas finalizadas.

Las tareas se conservan entre sesiones gracias a `localStorage`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run watch` | Compila continuamente en modo de desarrollo. |
| `npm test` | Ejecuta las pruebas unitarias con Karma. |

También puedes ejecutar los scripts directamente con Angular CLI:

```bash
ng serve
ng build
ng test
```

## Estructura del proyecto

```text
src/
├── app/
│   ├── components/
│   │   └── nav-bar/
│   │       ├── nav-bar.component.ts
│   │       ├── nav-bar.component.html
│   │       └── nav-bar.component.css
│   ├── services/
│   │   └── tareas.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── main.ts
├── styles.css
└── index.html
```

## Persistencia de datos

El servicio `TareasService` administra las tareas y las almacena bajo la clave `listaTareas.v2` en `localStorage`.

Cada tarea contiene:

- `id`: identificador único.
- `texto`: contenido de la tarea.
- `completada`: estado de finalización.
- `creadaEn`: fecha de creación en formato timestamp.
- `completadaEn`: fecha opcional de finalización.

Si se detectan datos creados con la versión anterior, el servicio los migra automáticamente desde la clave `listaTareas`.

## Construcción para producción

Para generar los archivos optimizados:

```bash
npm run build
```

La compilación se crea dentro de la carpeta:

```text
dist/lista-tareas-app
```

## Licencia

Este proyecto no incluye actualmente un archivo de licencia.
