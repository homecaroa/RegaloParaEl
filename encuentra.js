// "Encuentra tu regalo": tres preguntas -> solo packs reales y comprables. Si no hay coincidencia, lo dice.
import { PRODUCTS, PERFILES, OCASIONES } from '../data/products.js';
import { esComprable } from './cart.js';
import { h, tarjetaPack } from './ui.js';

const PRESUPUESTOS = [['', 'Sin límite'], ['25', 'Hasta 25 €'], ['35', 'Hasta 35 €'], ['50', 'Hasta 50 €']];
const ETIQUETA = { perfil: 'tipo de hombre', ocasion: 'ocasión', presupuesto: 'presupuesto' };

function rellenar(select, opciones) {
  select.replaceChildren(...opciones.map(([valor, texto]) => h('option', { value: valor, text: texto })));
}

function fijar(select, valor) {
  select.value = [...select.options].some((o) => o.value === valor) ? valor : '';
}

function fallos(p, f) {
  const r = [];
  if (f.perfil && p.perfil !== f.perfil) r.push('perfil');
  if (f.ocasion && !p.ocasiones.includes(f.ocasion)) r.push('ocasion');
  if (f.max && p.precioIva > f.max) r.push('presupuesto');
  return r;
}

export function iniciar() {
  const comprables = PRODUCTS.filter(esComprable);
  const form = document.getElementById('encuentra-form');
  const salida = document.getElementById('encuentra-resultado');
  const { perfil, ocasion, presupuesto } = form.elements;

  rellenar(perfil, [['', 'No lo sé'], ...[...new Set(comprables.map((p) => p.perfil))].map((k) => [k, PERFILES[k] || k])]);
  rellenar(ocasion, [['', 'Cualquiera'], ...Object.entries(OCASIONES).filter(([k]) => comprables.some((p) => p.ocasiones.includes(k)))]);
  rellenar(presupuesto, PRESUPUESTOS);

  const params = new URLSearchParams(location.search);
  fijar(perfil, params.get('perfil') || '');
  fijar(ocasion, params.get('ocasion') || '');
  fijar(presupuesto, params.get('presupuesto') || '');

  const envolver = (p, aviso) => h('div', { class: 'sugerencia' }, tarjetaPack(p), aviso ? h('p', { class: 'nota-falla', text: aviso }) : null);

  function mostrar(enfocar) {
    const f = { perfil: perfil.value, ocasion: ocasion.value, max: Number(presupuesto.value) || 0 };
    let titulo;
    let nodos = [];
    let extra = null;

    if (!comprables.length) {
      titulo = 'Todavía no hay packs disponibles';
      extra = h('p', { text: 'Vuelve pronto: estamos preparando los primeros packs.' });
    } else {
      const exactos = comprables.filter((p) => fallos(p, f).length === 0);
      if (exactos.length) {
        if (!f.perfil) exactos.sort((a, b) => (b.perfil === 'comodin') - (a.perfil === 'comodin'));
        titulo = exactos.length === 1 ? '1 pack encaja con lo que buscas' : `${exactos.length} packs encajan con lo que buscas`;
        nodos = exactos.map((p) => envolver(p));
      } else {
        const cercanos = comprables.map((p) => ({ p, f: fallos(p, f) })).filter((x) => x.f.length === 1);
        if (cercanos.length) {
          titulo = 'No tenemos ahora un pack que cumpla las tres cosas';
          extra = h('p', { text: 'Estos son los que más se acercan:' });
          nodos = cercanos.map((x) => envolver(x.p, `Se aleja en: ${ETIQUETA[x.f[0]]}`));
        } else {
          titulo = 'Ahora mismo no tenemos un pack adecuado para esa combinación';
          extra = h('p', {}, 'Prueba a cambiar alguna respuesta o ', h('a', { href: 'catalogo.html' }, 'mira todos los packs'), '.');
        }
      }
    }

    salida.replaceChildren(h('h2', { text: titulo }), extra, nodos.length ? h('div', { class: 'rejilla' }, nodos) : null);

    const q = new URLSearchParams();
    if (f.perfil) q.set('perfil', f.perfil);
    if (f.ocasion) q.set('ocasion', f.ocasion);
    if (presupuesto.value) q.set('presupuesto', presupuesto.value);
    history.replaceState(null, '', q.toString() ? `?${q}` : location.pathname);
    if (enfocar) salida.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    mostrar(true);
  });
  if ([...params.keys()].some((k) => ['perfil', 'ocasion', 'presupuesto'].includes(k))) mostrar(false);
}
