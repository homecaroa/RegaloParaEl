// Página del carrito. El pago real NO está integrado: el botón permanece desactivado.
import { PRODUCTS } from '../data/products.js';
import { SITE } from '../data/site.config.js';
import { resumenCarrito, fijarCantidad, quitar, MAX_UNIDADES } from './cart.js';
import { h, euros } from './ui.js';

export function iniciar() {
  const cont = document.getElementById('carrito-contenido');

  function pintar() {
    const r = resumenCarrito(PRODUCTS, SITE.envio.costeCliente);

    const avisoNoDisp = r.noDisponibles.length
      ? h('div', { class: 'aviso', role: 'alert' },
          h('p', { text: 'Estos packs ya no están disponibles y no se incluyen en el total:' }),
          h('ul', {}, r.noDisponibles.map((n) => h('li', {}, `${n.nombre} `,
            h('button', { class: 'enlace', type: 'button', onclick: () => quitar(n.id) }, 'Quitar')))))
      : null;

    if (!r.lineas.length) {
      cont.replaceChildren(...[avisoNoDisp, h('div', { class: 'vacio' },
        h('p', { text: 'Tu carrito está vacío.' }),
        h('a', { class: 'btn btn-primario', href: 'catalogo.html' }, 'Descubrir los packs'))].filter(Boolean));
      return;
    }

    const lineas = h('ul', { class: 'lineas' }, r.lineas.map(({ producto: p, cantidad, subtotal }) => h('li', { class: 'linea' },
      h('div', { class: 'linea-info' },
        h('a', { class: 'linea-nombre', href: `pack.html?id=${encodeURIComponent(p.slug)}`, text: p.nombre }),
        h('span', { text: `${euros.format(p.precioIva)} / unidad` })),
      h('strong', { class: 'linea-sub', text: euros.format(subtotal) }),
      h('label', { class: 'linea-cant' }, 'Cantidad ',
        h('input', {
          type: 'number', min: 1, max: MAX_UNIDADES, value: cantidad, inputmode: 'numeric',
          onchange: (e) => {
            const v = parseInt(e.target.value, 10);
            if (!(v >= 1)) return pintar();
            fijarCantidad(p.id, v);
          }
        })),
      h('button', { class: 'enlace', type: 'button', 'aria-label': `Quitar ${p.nombre}`, onclick: () => quitar(p.id) }, 'Quitar'))));

    const fila = (t, v) => h('div', {}, h('dt', { text: t }), h('dd', {}, v));
    const resumen = h('aside', { class: 'resumen', 'aria-labelledby': 't-resumen' },
      h('h2', { id: 't-resumen', text: 'Resumen' }),
      h('dl', {},
        fila('Subtotal (IVA incl.)', euros.format(r.subtotal)),
        fila('Envío', r.envio === null ? h('mark', { class: 'pendiente', text: 'Pendiente de confirmar' }) : euros.format(r.envio)),
        fila(r.envio === null ? 'Total (sin envío)' : 'Total', euros.format(r.total))),
      h('button', { class: 'btn btn-primario', type: 'button', disabled: true, 'aria-describedby': 'nota-pago' }, 'Finalizar compra'),
      h('p', { class: 'nota', id: 'nota-pago', text: 'El pago todavía no está disponible: la pasarela de pago está pendiente de integrar. No se realizará ningún cobro.' }),
      h('p', {}, h('a', { href: 'catalogo.html' }, 'Seguir viendo packs')));

    cont.replaceChildren(...[avisoNoDisp, h('div', { class: 'carrito-grid' }, lineas, resumen)].filter(Boolean));
  }

  window.addEventListener('carrito:cambio', pintar);
  pintar();
}
