# G43_4 Proyecto de Programación Web Y Móvil: Red Social de Películas y Series

Red social de cine. Incluye un foro con opiniones de los usuarios sobre películas y series. La página contiene un catálogo con una sinopsis y datos sobre cada serie y película y permite al usuario crear una lista con las películas y series vistas y aquellas que tiene pendiente por ver. Tambien permite descubrir de una manera interactiva, al estilo de tinder,películas y series. Esta aplicación web esta dirigida para todo tipo de público interesado en el mundo cinematográfico.

<img src="/img/Logo_ChatGPT.png" width="300">

## Tecnologías usadas
- Angular 19, TypeScript, HTML5, CSS
- FireBase
- Git & GitHub
- WebStorm
- Figma, Trello

## Descripción
La aplicación implementa una interfaz moderna y dinámica basada en Angular 19. Incluye componentes reutilizables y estructura modular, lo que facilita la escalabilidad y el mantenimiento del código. Se han utilizado las buenas prácticas de desarrollo frontend y se ha seguido una arquitectura limpia basada en componentes.


## Funcionalidades
- Navegación entre diferentes vistas mediante el enrutamiento de Angular.
- Interfaz responsive adaptada a distintos dispositivos.
- Lógica implementada en TypeScript para separación clara de estructura (HTML), estilos (CSS) y comportamiento (TS).
- Gestión de datos y estados a través de servicios.

## Página de inicio de la aplicación web
- Index.html (Se recomienda abrirlo con Microsoft Edge)

## Listado de páginas del proyecto.
### Páginas HTML integradas (convertidas a componentes Angular):
- `main` – Página principal de inicio
- `Login` / `Register` – Autenticación de usuarios
- `miperfil` – Perfil del usuario
- `Blog` – Foro de reseñas
- `Películas-Series` – Catálogo principal
- `Descripto-rPeliculas` – Página de detalles
- `Descubrir` – Explorador 
- `Shared` – Templates compartidas entre componentes

## Estructura de los Datos de firebase
- Actores:
  - foto: string
  - nombre: stirng

- SeriesyPeliculas:
  - actores: array[num] 
  - portada: string
  - sinopsis: stirng
  - título: stirng

- Usuarios:
  - lsita_de_peliculas: array[num]

- hilos:
  - contenido: string
  - usuario: stirng
  - título: stirng
  - comentarios: colección
    - contenido: string
    - usuario: string


## Enlaces a Figma y Trello
- Figma: https://www.figma.com/design/bMKqhD6sfSjKfoi870g1Mo/PWM-CINEMATCH?node-id=0-1&t=xYLLmyg0bByeW2k0-1
- Trello: https://trello.com/invite/b/67a62a3daedbacea0267ef03/ATTIdfc187405ce43a6a97bdd12868c9d893A5CEBF80/trabjao-pwm

## Autores
- Dario Acuña Soutullo
- Carlos Serradilla Rodriguez
- Gabriel López García
