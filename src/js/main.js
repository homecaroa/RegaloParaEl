// Arranque común: monta cabecera y pie y carga el módulo de la página (body[data-page]).
import { montarCabecera, montarPie } from './layout.js';
import { validarProductos } from './validar.js';
import { aplicarSeo } from './seo.js';
import { h } from './ui.js';

const PAGINAS = {
  home: () => import('./home.js'),
  catalogo: () => import('./catalog.js'),
  pack: () => import('./product.js'),
  carrito: () => import('./carrito.js'),
  info: () => import('./info.js')
};

async function arrancar() {
  const pagina = document.body.dataset.page;
  const esFaq = pagina === 'info' && new URLSearchParams(location.search).get('p') === 'faq';
  montarCabecera(esFaq ? 'faq' : pagina);
  montarPie();

  for (const { producto, errores } of validarProductos()) {
    if (errores.length) console.warn(`[products.js] ${producto.id || '(sin id)'}: ${errores.join(', ')}`);
  }

  const cargar = PAGINAS[pagina];
  if (cargar) {
    try {
      (await cargar()).iniciar();
    } catch (error) {
      console.error(error);
      document.getElementById('contenido')?.prepend(h('p', { class: 'aviso', role: 'alert', text: 'No se ha podido cargar esta sección. Recarga la página.' }));
    }
  }
  aplicarSeo();
}

if (typeof document !== 'undefined') arrancar();
