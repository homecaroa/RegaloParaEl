// Metadatos compartidos: Open Graph y canonical (la canonical solo se añade cuando SITE.dominio está definido).
import { SITE } from '../data/site.config.js';

function meta(atributo, nombre, contenido) {
  let nodo = document.head.querySelector(`meta[${atributo}="${nombre}"]`);
  if (!nodo) {
    nodo = document.createElement('meta');
    nodo.setAttribute(atributo, nombre);
    document.head.append(nodo);
  }
  nodo.setAttribute('content', contenido);
}

export function aplicarSeo() {
  const descripcion = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  meta('property', 'og:title', document.title);
  meta('property', 'og:description', descripcion);
  meta('property', 'og:type', 'website');
  meta('property', 'og:site_name', SITE.marca.nombre);
  meta('property', 'og:locale', 'es_ES');

  if (!SITE.dominio) return;
  const base = SITE.dominio.replace(/\/$/, '');
  const archivo = location.pathname.split('/').pop() || 'index.html';
  const claves = { 'pack.html': ['id'], 'info.html': ['p'] }[archivo] || [];
  const params = new URLSearchParams(location.search);
  const q = new URLSearchParams();
  for (const k of claves) if (params.has(k)) q.set(k, params.get(k));
  const url = `${base}/${archivo === 'index.html' ? '' : archivo}${q.toString() ? `?${q}` : ''}`;

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = url;
  meta('property', 'og:url', url);
}
