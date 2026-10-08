# ESTADO DEL PROYECTO · Acierto (marca provisional)

Última actualización: Lote 04+05 · 8 oct 2026

## Objetivo
Construir la web de una tienda de packs de regalo para hombres (3–4 artículos por caja), España, español de España. Foco actual: solo la página (no ventas, marketing, proveedores ni precios). El usuario aportará la información de cada lote de productos poco a poco. Precio máximo por pack: 49,90 €.

## Arquitectura y tecnologías
- HTML/CSS/JS vanilla con módulos ES6, sin build ni dependencias. GitHub Pages (repo público), rutas relativas.
- Datos en `src/data/products.js` y `src/data/site.config.js`.
- Cada página: `<body data-page="...">` + `src/js/main.js` (cabecera, pie, validación) + módulo `src/js/<pagina>.js` con `iniciar()`, registrado en `PAGINAS` de main.js.
- Carrito en localStorage (clave `acierto-carrito`, líneas {id, cantidad}, máx. 10 por pack); precios siempre leídos de products.js; importes calculados en céntimos.
- Pago real NO integrado: botón "Finalizar compra" desactivado y señalizado. Pagos sin autorizar.
- Paleta: tinta #17262B, papel #F6F1E7, acción #8F5524, acento #B5703A (decorativo), salvia #5E7A6B. Fuentes del sistema.

## Árbol actual
README.md · .gitignore · index.html · catalogo.html · pack.html · carrito.html · assets/favicon.svg · docs/ESTADO.md
src/css/base.css · components.css · paginas.css
src/data/site.config.js · products.js
src/js/main.js · ui.js · layout.js · cart.js · home.js · catalog.js · product.js · carrito.js · validar.js
Previstos: info.html, robots.txt, sitemap.xml, src/js/info.js (o seo.js), src/data/info-pages.js, herramientas/margenes.html

## Registro de archivos
| Ruta | Estado | Versión |
|---|---|---|
| README.md, .gitignore, assets/favicon.svg, src/data/site.config.js, src/data/products.js | entregado | L01 |
| src/css/base.css, components.css, src/js/ui.js, validar.js, home.js, index.html | entregado | L02-L03 |
| catalogo.html, pack.html, carrito.html, src/css/paginas.css, src/js/catalog.js, product.js, carrito.js | entregado | L04-L05 |
| src/js/cart.js, layout.js, main.js | entregado (sustituyen versiones previas) | L04-L05 |
| docs/ESTADO.md | entregado | L04-L05 |
Ninguno marcado como subido ni verificado hasta que el usuario lo confirme.

## Funcionalidades implementadas
Inicio completo; catálogo con filtros por perfil/ocasión, orden y URL compartible; ficha con contenido, disponibilidad, cantidad, añadir al carrito, envío/devoluciones pendientes marcados, ocasiones y relacionados; carrito editable con subtotal, envío pendiente y total; contador en cabecera en vivo; estados vacíos, agotado y pack no encontrado; JSON-LD de producto solo si `provisional: false`.

## Pendientes
info.html (FAQ, envíos, devoluciones, privacidad, cookies, aviso legal, condiciones, contacto), SEO (robots, sitemap, canonical, prerenderizado), pruebas finales y calculadora de márgenes (L06–L07). Datos reales de packs del usuario. Quitar `noindex` al lanzar.

## Decisiones técnicas
- Ficha: `pack.html?id=<slug>`; catálogo: `?perfil=&ocasion=&orden=`.
- Un pack `borrador` no aparece en catálogo, inicio ni ficha. Es comprable solo si estado `publicado` y disponibilidad ≠ `sin-stock`.
- Para añadir/cambiar packs solo se edita `src/data/products.js`.

## Errores conocidos
Los enlaces a info.html (pie y menú "Preguntas") dan 404 hasta el Lote 06.

## Pruebas realizadas
- Node + jsdom: catálogo (filtros, orden, URL, vacío), ficha (contenido, añadir al carrito, contador, pack borrador → no encontrado), carrito (cantidades, totales, quitar, no disponibles, pago desactivado), 0 errores de consola; sintaxis de todos los módulos.
- No probado en navegador real: diseño visual, responsive y GitHub Pages.

## Próxima tarea exacta
Lote 06: info.html + src/js/info.js + src/data/info-pages.js (contenidos con datos pendientes marcados), robots.txt, sitemap.xml. Antes, el usuario confirma que catálogo, ficha y carrito funcionan y aporta (si quiere) los datos del primer lote de productos.

## Cómo continuar sin rehacer trabajo
Nueva conversación: pegar este archivo, products.js, site.config.js y main.js, e indicar el lote.
