// Catálogo: filtros por perfil y ocasión, orden y parámetros en la URL (?perfil=&ocasion=&orden=).
import { PRODUCTS, PERFILES, OCASIONES } from '../data/products.js';
import { h, tarjetaPack } from './ui.js';

const ORDENES = {
  destacados: ['Destacados', null],
  'precio-asc': ['Precio: de menor a mayor', (a, b) => a.precioIva - b.precioIva],
  'precio-desc': ['Precio: de mayor a menor', (a, b) => b.precioIva - a.precioIva],
  nombre: ['Nombre (A-Z)', (a, b) => a.nombre.localeCompare(b.nombre, 'es')]
};

function rellenar(select, textoTodos, opciones) {
  select.replaceChildren(
    ...(textoTodos ? [h('option', { value: '', text: textoTodos })] : []),
    ...opciones.map(([valor, texto]) => h('option', { value: valor, text: texto }))
  );
}

function fijar(select, valor, porDefecto = '') {
  select.value = [...select.options].some((o) => o.value === valor) ? valor : porDefecto;
}

export function iniciar() {
  const visibles = PRODUCTS.filter((p) => p.estado !== 'borrador');
  const form = document.getElementById('filtros');
  const rejilla = document.getElementById('catalogo-lista');
  const resultado = document.getElementById('resultado');
  const { perfil, ocasion, orden } = form.elements;

  rellenar(perfil, 'Todos los perfiles', [...new Set(visibles.map((p) => p.perfil))].map((k) => [k, PERFILES[k] || k]));
  rellenar(ocasion, 'Todas las ocasiones', Object.entries(OCASIONES).filter(([k]) => visibles.some((p) => p.ocasiones.includes(k))));
  rellenar(orden, null, Object.entries(ORDENES).map(([k, [texto]]) => [k, texto]));

  const params = new URLSearchParams(location.search);
  fijar(perfil, params.get('perfil') || '');
  fijar(ocasion, params.get('ocasion') || '');
  fijar(orden, params.get('orden') || 'destacados', 'destacados');

  function quitarFiltros() {
    perfil.value = '';
    ocasion.value = '';
    orden.value = 'destacados';
    pintar();
  }

  function pintar() {
    let lista = visibles.filter((p) => (!perfil.value || p.perfil === perfil.value) && (!ocasion.value || p.ocasiones.includes(ocasion.value)));
    const comparar = ORDENES[orden.value]?.[1];
    if (comparar) lista = [...lista].sort(comparar);

    resultado.textContent = visibles.length ? `${lista.length} ${lista.length === 1 ? 'pack' : 'packs'}` : '';
    rejilla.replaceChildren(...(lista.length
      ? lista.map((p) => tarjetaPack(p, { nivel: 2 }))
      : [h('div', { class: 'vacio' },
          h('p', { text: visibles.length ? 'No hay packs con esos filtros.' : 'Todavía no hay packs publicados. Vuelve pronto.' }),
          visibles.length ? h('button', { class: 'btn btn-sec', type: 'button', onclick: quitarFiltros }, 'Quitar filtros') : null)]));

    const q = new URLSearchParams();
    if (perfil.value) q.set('perfil', perfil.value);
    if (ocasion.value) q.set('ocasion', ocasion.value);
    if (orden.value !== 'destacados') q.set('orden', orden.value);
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
  }

  form.addEventListener('change', pintar);
  form.addEventListener('submit', (e) => e.preventDefault());
  pintar();
}
