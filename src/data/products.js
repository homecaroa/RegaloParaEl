// Fuente única de datos de los packs. Todo el contenido es PROVISIONAL (provisional: true)
// hasta verificar productos, proveedores, precios y fotografías reales.
export const ESTADOS = ['borrador', 'publicado', 'agotado'];
export const DISPONIBILIDADES = ['preventa', 'bajo-pedido', 'en-stock', 'sin-stock'];

export const PERFILES = {
  cafetero: 'El cafetero',
  barbero: 'El barbero',
  gamer: 'El gamer',
  aventurero: 'El aventurero',
  cocinillas: 'El cocinillas',
  comodin: 'El difícil de regalar'
};

export const OCASIONES = {
  cumpleanos: 'Cumpleaños',
  navidad: 'Navidad',
  'dia-del-padre': 'Día del Padre',
  aniversario: 'Aniversario',
  'amigo-invisible': 'Amigo invisible'
};

// precioIva = precio final al cliente con IVA incluido (€).
// costes = null hasta tener presupuestos reales (ver supuestosEconomicos en site.config.js).
export const PRODUCTS = [
  {
    id: 'pk-cafetero-01',
    slug: 'pack-cafetero',
    nombre: 'Pack Cafetero',
    perfil: 'cafetero',
    categoria: 'cafe',
    resumen: 'Para el que no empieza el día sin su café.',
    descripcion: 'Una taza, café para estrenarla y un accesorio para prepararlo: un regalo que usará mañana mismo.',
    precioIva: 29.9,
    articulos: [
      { nombre: 'Taza de cerámica', detalle: 'Modelo por definir', verificado: false },
      { nombre: 'Café envasado', detalle: 'Proveedor y formato por definir', verificado: false },
      { nombre: 'Cuchara medidora o accesorio sencillo', detalle: 'Por definir', verificado: false }
    ],
    presentacion: 'Caja de cartón con relleno de papel y tarjeta con mensaje (por definir).',
    paraQuien: 'Hombres que disfrutan del café en casa o en la oficina.',
    ocasiones: ['cumpleanos', 'navidad', 'dia-del-padre', 'amigo-invisible'],
    imagen: null,
    estado: 'publicado',
    disponibilidad: 'preventa',
    fechaEnvioEstimada: null,
    provisional: true,
    costes: null,
    seo: { titulo: 'Pack Cafetero: regalo para hombre cafetero', descripcion: 'Caja de regalo para hombres que disfrutan del café: taza, café y accesorio. Elige y regala sin complicarte.' }
  },
  {
    id: 'pk-barbero-01',
    slug: 'pack-barbero',
    nombre: 'Pack Barbero',
    perfil: 'barbero',
    categoria: 'cuidado-personal',
    resumen: 'Cuidado personal básico, ordenado y listo para regalar.',
    descripcion: 'Neceser, peine, paño y un producto de cuidado para quien se toma en serio su rutina.',
    precioIva: 34.9,
    articulos: [
      { nombre: 'Neceser', detalle: 'Modelo por definir', verificado: false },
      { nombre: 'Peine o accesorio de afeitado', detalle: 'Por definir', verificado: false },
      { nombre: 'Paño', detalle: 'Por definir', verificado: false },
      { nombre: 'Producto cosmético', detalle: 'Proveedor trazable y etiquetado por revisar', verificado: false }
    ],
    presentacion: 'Caja de cartón con relleno de papel y tarjeta con mensaje (por definir).',
    paraQuien: 'Hombres que cuidan barba, pelo o afeitado.',
    ocasiones: ['cumpleanos', 'navidad', 'dia-del-padre', 'aniversario'],
    imagen: null,
    estado: 'publicado',
    disponibilidad: 'preventa',
    fechaEnvioEstimada: null,
    provisional: true,
    costes: null,
    seo: { titulo: 'Pack Barbero: regalo de cuidado personal para hombre', descripcion: 'Caja de regalo para hombres con neceser, accesorio, paño y producto de cuidado. Regalo listo para entregar.' }
  },
  {
    id: 'pk-comodin-01',
    slug: 'pack-comodin',
    nombre: 'Pack Comodín',
    perfil: 'comodin',
    categoria: 'versatil',
    resumen: 'Para el hombre al que nunca sabes qué regalar.',
    descripcion: 'Tres detalles útiles que funcionan casi siempre: para amigo invisible, compañeros o cuando falta tiempo.',
    precioIva: 24.9,
    articulos: [
      { nombre: 'Libreta', detalle: 'Por definir', verificado: false },
      { nombre: 'Taza o botella', detalle: 'Por definir', verificado: false },
      { nombre: 'Snack envasado', detalle: 'Proveedor y alérgenos por revisar', verificado: false }
    ],
    presentacion: 'Caja de cartón con relleno de papel y tarjeta con mensaje (por definir).',
    paraQuien: 'Hombres de gustos poco claros: compañeros, amigos, familiares lejanos.',
    ocasiones: ['cumpleanos', 'navidad', 'amigo-invisible'],
    imagen: null,
    estado: 'publicado',
    disponibilidad: 'preventa',
    fechaEnvioEstimada: null,
    provisional: true,
    costes: null,
    seo: { titulo: 'Pack Comodín: regalo para hombre difícil de regalar', descripcion: 'Caja de regalo versátil para hombres a los que cuesta regalar. Ideal para amigo invisible y cumpleaños.' }
  },
  {
    id: 'pk-escapada-01',
    slug: 'pack-escapada',
    nombre: 'Pack Escapada',
    perfil: 'aventurero',
    categoria: 'aire-libre',
    resumen: 'Para el de las escapadas de fin de semana.',
    descripcion: 'Botella, libreta y un organizador para llevar lo justo. Borrador: pendiente de decidir si se lanza.',
    precioIva: 29.9,
    articulos: [
      { nombre: 'Botella o taza de viaje', detalle: 'Por definir', verificado: false },
      { nombre: 'Libreta', detalle: 'Por definir', verificado: false },
      { nombre: 'Accesorio organizador', detalle: 'Por definir', verificado: false }
    ],
    presentacion: 'Por definir.',
    paraQuien: 'Hombres aficionados a escapadas y actividades al aire libre.',
    ocasiones: ['cumpleanos', 'navidad'],
    imagen: null,
    estado: 'borrador',
    disponibilidad: 'sin-stock',
    fechaEnvioEstimada: null,
    provisional: true,
    costes: null,
    seo: { titulo: 'Pack Escapada: regalo para hombre aventurero', descripcion: 'Caja de regalo para hombres que viven de escapada en escapada.' }
  }
];
