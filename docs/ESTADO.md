# ESTADO DEL PROYECTO · Acierto (marca provisional)

Última actualización: Lote 06 (info, legales, SEO base) · 8 oct 2026

## Objetivo
Construir la web de una tienda de packs de regalo para hombres (3–4 artículos por caja), España, español de España. Foco actual: solo la página (no ventas, marketing, proveedores ni precios). El usuario aportará la información de cada lote de productos poco a poco. Precio máximo por pack: 49,90 €.

## Arquitectura y tecnologías
- HTML/CSS/JS vanilla con módulos ES6, sin build ni dependencias. GitHub Pages (repo público), rutas relativas.
- Datos en `src/data/products.js` y `src/data/site.config.js`.
- Cada página: `<body data-page="...">` + `src/js/main.js` (cabecera, pie, validación) + módulo `src/js/<pagina>.js` con `iniciar()`, registrado en `PAGINAS` de main.js.
- Carrito en localStorage (clave `acierto-carrito`, líneas {id, cantidad}, máx. 10 por pack); precios siempre leídos de products.js; importes calculados en céntimos.
- Pago real NO integrado: botón "Finalizar compra" desactivado y señalizado. Pagos sin autorizar.
- Paleta (base clara cálida): papel #F7F3EA, texto #17233B; azul navy #1E3153 (estructura, pie), verde loden #56643A (apoyo, chips), rojo burdeos #7A1F2E (acciones y detalles). Cada color tiene variante clara (-claro) para fondos. Variables en `src/css/base.css`. Fuentes del sistema.

## Árbol actual
README.md · .gitignore · robots.txt · index.html · catalogo.html · pack.html · carrito.html · info.html · assets/favicon.svg · docs/ESTADO.md
herramientas/sitemap.html (generador interno de sitemap.xml)
src/css/base.css · components.css · paginas.css
src/data/site.config.js · products.js · info-pages.js
src/js/main.js · ui.js · layout.js · cart.js · home.js · catalog.js · product.js · carrito.js · info.js · seo.js · validar.js
Previstos: herramientas/margenes.html (calculadora de márgenes), prerenderizado de fichas (opcional)

## Registro de archivos
| Ruta | Estado | Versión |
|---|---|---|
| README.md, .gitignore, assets/favicon.svg, src/data/site.config.js, src/data/products.js | entregado | L01 |
| src/css/base.css, components.css, src/js/ui.js, validar.js, home.js, index.html | entregado | L02-L03 |
| catalogo.html, pack.html, carrito.html, src/css/paginas.css, src/js/catalog.js, product.js, carrito.js | entregado | L04-L05 |
| src/js/cart.js, layout.js, main.js | entregado (sustituyen versiones previas) | L04-L05 |
| src/css/base.css, components.css, assets/favicon.svg (nueva paleta) | entregado | Paleta v2 |
| info.html, robots.txt, herramientas/sitemap.html, src/data/info-pages.js, src/js/info.js, seo.js, main.js, src/css/paginas.css, docs/ESTADO.md | entregado | L06 |
Ninguno marcado como subido ni verificado hasta que el usuario lo confirme.

## Funcionalidades implementadas
Inicio completo; catálogo con filtros por perfil/ocasión, orden y URL compartible; ficha con contenido, disponibilidad, cantidad, añadir al carrito, envío/devoluciones pendientes marcados, ocasiones y relacionados; carrito editable con subtotal, envío pendiente y total; contador en cabecera en vivo; estados vacíos, agotado y pack no encontrado; JSON-LD de producto solo si `provisional: false`.

## Lote 06 (entregado)
info.html?p=faq|envios|devoluciones|contacto|aviso-legal|condiciones|privacidad|cookies (contenido en src/data/info-pages.js; marcadores {dato} se rellenan desde site.config.js, {?texto} = pendiente de decidir). Textos legales orientativos con aviso visible: revisar con profesional. seo.js: Open Graph y canonical (solo si SITE.dominio está definido). herramientas/sitemap.html genera sitemap.xml cuando hay dominio. robots.txt solo surte efecto con dominio propio en la raíz.

## Pendientes
Datos reales de packs del usuario; datos de empresa, envío y devoluciones en site.config.js; generar sitemap.xml y quitar `noindex` al lanzar; calculadora de márgenes y revisión final (L07); pasarela de pago (sin autorizar).

## Decisiones técnicas
- Ficha: `pack.html?id=<slug>`; catálogo: `?perfil=&ocasion=&orden=`.
- Un pack `borrador` no aparece en catálogo, inicio ni ficha. Es comprable solo si estado `publicado` y disponibilidad ≠ `sin-stock`.
- Para añadir/cambiar packs solo se edita `src/data/products.js`.

## Errores conocidos
Ninguno detectado. Las FAQ de la portada (HTML) y de info.html (datos) están duplicadas: si se editan, cambiar ambas.

## Pruebas realizadas
- Node + jsdom: catálogo (filtros, orden, URL, vacío), ficha (contenido, añadir al carrito, contador, pack borrador → no encontrado), carrito (cantidades, totales, quitar, no disponibles, pago desactivado), 0 errores de consola; sintaxis de todos los módulos.
- Chromium (Playwright) en local: inicio (escritorio y móvil), catálogo, ficha, carrito y las 8 páginas de info (más clave inexistente) renderizan sin errores de consola; canonical y sitemap probados con dominio simulado; sitemap sin dominio muestra aviso. No probado en GitHub Pages.

## Próxima tarea exacta
Lote 07: revisión final (accesibilidad, enlaces, datos reales) y checklist de lanzamiento. Antes, el usuario aporta los datos del primer lote de productos y los datos de empresa/envío.

## Cómo continuar sin rehacer trabajo
Nueva conversación: pegar este archivo, products.js, site.config.js y main.js, e indicar el lote.
