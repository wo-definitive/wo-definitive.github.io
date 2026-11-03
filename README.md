# WO Definitive Edition

Sitio web de **WO Definitive Edition**, un juego de artillería por turnos desarrollado por F.R.R. Entertainment. La página presenta las partidas en línea de hasta seis jugadores, la personalización de mascotas y el modo de práctica.

**[Visitar el sitio](https://wodefinitiveedition.com/)**

## Estructura del sitio

- [`index.html`](index.html) reúne las características del juego, las capturas, las plataformas y los requisitos del sistema.
- [`Css/style.css`](Css/style.css) contiene los estilos.
- [`Js/i18n.js`](Js/i18n.js) gestiona los textos en español e inglés y guarda el idioma elegido en el navegador.
- [`Js/main.js`](Js/main.js) controla las interacciones de la página.
- [`CNAME`](CNAME) configura el dominio personalizado en GitHub Pages.

## Vista previa local

Con Python 3 instalado, ejecutá desde la raíz del repositorio:

```sh
python3 -m http.server 8000
```

Abrí [la vista previa local](http://localhost:8000/) o [la versión en inglés](http://localhost:8000/?lang=en). Si cambiás un texto de la interfaz, revisá ambas versiones y mantené las mayúsculas de las rutas `Css/` y `Js/` al enlazar recursos.
