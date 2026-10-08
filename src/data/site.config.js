// Configuración central del sitio. Lo marcado como PENDIENTE debe confirmarse antes de vender.
export const PENDIENTE = 'PENDIENTE DE CONFIRMAR';

export const SITE = {
  version: 'lote-01',
  idioma: 'es-ES',
  moneda: 'EUR',
  marca: {
    nombre: 'Acierto',
    esProvisional: true, // sin comprobar dominio ni registro de marca
    eslogan: 'Regalo resuelto.',
    descripcion: 'Packs de regalo para hombres con gustos reconocibles: eliges cómo es, nosotros acertamos.'
  },
  dominio: null, // p. ej. 'https://midominio.es' cuando exista
  empresa: { titular: null, nif: null, domicilio: null, email: null, telefono: null },
  precioMaximoPack: 49.9,
  iva: 0.21, // hipótesis del estudio; confirmar con asesoría
  envio: { estado: 'pendiente', costeCliente: null, plazoPreparacion: null, plazoEntrega: null, envioGratisDesde: null },
  devoluciones: { estado: 'pendiente' },
  pagos: { proveedor: null, estado: 'pendiente' },
  // Hipótesis ilustrativas del estudio de mercado (8-oct-2026). NO son costes reales: sustituir por presupuestos de proveedores.
  supuestosEconomicos: {
    costeArticulos: 8.0,
    costeCaja: 2.2,
    costePreparacion: 0.8,
    comisionPago: 1.1,
    envioAsumido: 4.5,
    reservaIncidencias: 0.7
  }
};
