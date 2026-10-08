// Ficha de pack: pack.html?id=<slug>.
import { PRODUCTS, PERFILES, OCASIONES } from '../data/products.js';
import { SITE } from '../data/site.config.js';
import { anadir, esComprable, MAX_UNIDADES } from './cart.js';
import { h, euros, imagenPack, tarjetaPack, DISPONIBILIDAD } from './ui.js';

const pendiente = (texto = 'Pendiente de confirmar') => h('mark', { class: 'pendiente', text: texto });

function noEncontrado(cont) {
  document.title = `Pack no encontrado | ${SITE.marca.nombre}`;
  cont.replaceChildren(
    h('h1', { text: 'No hemos encontrado ese pack' }),
    h('p', { text: 'Puede que haya cambiado de enlace o que ya no esté disponible.' }),
    h('a', { class: 'btn btn-primario', href: 'catalogo.html' }, 'Ver todos los packs'));
}

function migas(p) {
  return h('nav', { 'aria-label': 'Migas de pan' }, h('ol', { class: 'migas' },
    h('li', {}, h('a', { href: 'index.html' }, 'Inicio')),
    h('li', {}, h('a', { href: 'catalogo.html' }, 'Packs')),
    h('li', { 'aria-current': 'page', text: p.nombre })));
}

function disponibilidad(p) {
  if (p.estado === 'agotado' || p.disponibilidad === 'sin-stock') return h('p', { class: 'disp disp-no', text: 'Agotado' });
  if (p.disponibilidad === 'preventa') {
    return h('p', { class: 'disp' }, 'Preventa. Envío estimado: ', p.fechaEnvioEstimada || pendiente());
  }
  return h('p', { class: 'disp', text: DISPONIBILIDAD[p.disponibilidad] || '' });
}

function compra(p) {
  const comprable = esComprable(p);
  const estado = h('p', { class: 'aviso-ok', role: 'status' });
  const cantidad = h('input', { id: 'cantidad', name: 'cantidad', type: 'number', min: 1, max: MAX_UNIDADES, value: 1, inputmode: 'numeric', disabled: !comprable });
  return h('div', {},
    h('form', {
      class: 'compra',
      onsubmit: (e) => {
        e.preventDefault();
        const n = Math.min(Math.max(parseInt(cantidad.value, 10) || 1, 1), MAX_UNIDADES);
        const ok = anadir(p.id, n);
        estado.replaceChildren(...(ok
          ? ['Añadido al carrito. ', h('a', { href: 'carrito.html' }, 'Ver carrito')]
          : ['No se ha podido guardar el carrito. Comprueba que el navegador permite guardar datos del sitio.']));
      }
    },
      h('div', { class: 'campo' }, h('label', { for: 'cantidad', text: 'Cantidad' }), cantidad),
      h('button', { class: 'btn btn-primario', type: 'submit', disabled: !comprable }, comprable ? 'Añadir al carrito' : 'Agotado')),
    estado);
}

function cabecera(p) {
  return h('div', { class: 'ficha' },
    imagenPack(p),
    h('div', {},
      h('p', { class: 'chip', text: PERFILES[p.perfil] || p.perfil }),
      h('h1', { text: p.nombre }),
      h('p', { class: 'lead', text: p.resumen }),
      h('p', { class: 'precio' }, euros.format(p.precioIva), h('small', { text: ' IVA incluido' })),
      disponibilidad(p),
      compra(p),
      p.provisional ? h('p', { class: 'badge', text: 'Contenido provisional: se sustituirá por datos y fotos reales' }) : null));
}

function bloque(titulo, ...contenido) {
  return h('section', { class: 'bloque' }, h('h2', { text: titulo }), ...contenido);
}

function incluye(p) {
  return bloque(`Qué incluye (${p.articulos.length} artículos)`,
    h('ul', { class: 'incluye' }, p.articulos.map((a) => h('li', {},
      h('strong', { text: a.nombre }),
      a.detalle ? h('span', { class: 'det', text: a.detalle }) : null,
      a.verificado ? null : h('span', { class: 'badge', text: 'Por confirmar' })))));
}

function envio() {
  const e = SITE.envio;
  const fila = (titulo, valor) => h('li', {}, h('strong', { text: `${titulo}: ` }), valor ?? pendiente());
  return bloque('Envío, plazos y devoluciones',
    h('ul', { class: 'datos' },
      fila('Gastos de envío', typeof e.costeCliente === 'number' ? euros.format(e.costeCliente) : null),
      fila('Preparación', e.plazoPreparacion),
      fila('Entrega', e.plazoEntrega),
      fila('Devoluciones', SITE.devoluciones.estado === 'pendiente' ? null : 'Consulta las condiciones')),
    h('p', {}, h('a', { href: 'info.html?p=envios' }, 'Más sobre envíos'), ' · ', h('a', { href: 'info.html?p=devoluciones' }, 'Devoluciones y desistimiento')));
}

function relacionados(p) {
  const otros = PRODUCTS.filter((x) => x.id !== p.id && x.estado !== 'borrador')
    .sort((a, b) => (b.perfil === p.perfil) - (a.perfil === p.perfil));
  if (!otros.length) return null;
  return bloque('Otros packs que pueden gustarte', h('div', { class: 'rejilla' }, otros.slice(0, 3).map(tarjetaPack)));
}

// Datos estructurados solo cuando el pack ya no es provisional (deben coincidir con lo que ve el usuario).
function jsonLd(p) {
  const agotado = p.estado === 'agotado' || p.disponibilidad === 'sin-stock';
  const disp = agotado ? 'OutOfStock' : p.disponibilidad === 'preventa' ? 'PreOrder' : 'InStock';
  const datos = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.nombre, description: p.descripcion, sku: p.id,
    ...(p.imagen ? { image: new URL(p.imagen, location.href).href } : {}),
    offers: { '@type': 'Offer', priceCurrency: SITE.moneda, price: p.precioIva.toFixed(2), availability: `https://schema.org/${disp}`, url: location.href }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(datos);
  document.head.append(script);
}

export function iniciar() {
  const cont = document.getElementById('pack-contenido');
  const slug = new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find((x) => x.slug === slug && x.estado !== 'borrador');
  if (!p) return noEncontrado(cont);

  document.title = `${(p.seo && p.seo.titulo) || p.nombre} | ${SITE.marca.nombre}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', (p.seo && p.seo.descripcion) || p.resumen);

  cont.replaceChildren(...[
    migas(p),
    cabecera(p),
    bloque('¿Por qué es un buen regalo?', h('p', { text: p.descripcion }), h('p', {}, h('strong', { text: 'Ideal para: ' }), p.paraQuien)),
    incluye(p),
    bloque('Presentación', h('p', { text: p.presentacion })),
    bloque('Ocasiones recomendadas', h('div', { class: 'chips' }, p.ocasiones.map((k) => h('a', { class: 'chip', href: `catalogo.html?ocasion=${encodeURIComponent(k)}`, text: OCASIONES[k] || k })))),
    envio(),
    relacionados(p)
  ].filter(Boolean));

  if (!p.provisional) jsonLd(p);
}
