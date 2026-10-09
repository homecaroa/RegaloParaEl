// Contenido de las páginas informativas y legales (info.html?p=<clave>).
// Marcadores: {titular} {nif} {domicilio} {email} {telefono} {marca} {costeEnvio} {plazoPreparacion} {plazoEntrega}
//   → se rellenan desde site.config.js; si falta el dato aparece "Pendiente de confirmar".
// {?Texto} → dato pendiente de decidir (se muestra resaltado). [texto](info.html?p=envios) → enlace interno.
// Los textos legales son ORIENTATIVOS: deben revisarse con un profesional antes de vender.
export const INFO = {
  faq: {
    titulo: 'Preguntas frecuentes',
    descripcion: 'Respuestas a las dudas habituales sobre los packs, el envío y las devoluciones.',
    secciones: [
      { h: '¿Qué lleva cada caja?', p: ['Entre 3 y 4 artículos relacionados con un perfil o afición. La lista exacta aparece en la ficha de cada pack.'] },
      { h: '¿Y si no sé qué le gusta?', p: ['Empieza por la ocasión o por el pack más versátil del [catálogo](catalogo.html). Cada ficha indica para qué tipo de persona encaja.'] },
      { h: '¿Cuánto cuesta el envío y cuándo llega?', p: ['Gastos de envío: {costeEnvio}. Preparación: {plazoPreparacion}. Entrega: {plazoEntrega}.', 'Más detalle en [Envíos](info.html?p=envios). El importe final se muestra en el carrito antes de pagar.'] },
      { h: '¿Puedo devolver un pedido?', p: ['Consulta [Devoluciones y desistimiento](info.html?p=devoluciones).'] },
      { h: '¿Las imágenes son reales?', p: ['Durante la construcción de la web, las imágenes y los contenidos marcados como provisionales son de demostración y se sustituirán por fotografías del pack real.'] }
    ]
  },
  envios: {
    titulo: 'Envíos',
    descripcion: 'Zonas, gastos y plazos de envío de los packs de regalo.',
    secciones: [
      { h: 'Zona y transportista', p: ['Zona de entrega: {?Zona de entrega (por ejemplo, península)}.', 'Transportista: {?Transportista elegido}.'] },
      { h: 'Gastos de envío', p: ['Gastos de envío: {costeEnvio}. Se muestran en el carrito antes de pagar.'] },
      { h: 'Plazos', p: ['Preparación del pedido: {plazoPreparacion}.', 'Entrega: {plazoEntrega}.', 'Los packs en preventa indican en su ficha la fecha estimada de envío.'] },
      { h: 'Seguimiento', p: ['{?Indicar si se ofrece número de seguimiento}'] },
      { h: 'Incidencias', p: ['Si tu pedido llega dañado o con artículos que no corresponden, escríbenos a {email} indicando tu pedido.'] }
    ]
  },
  devoluciones: {
    titulo: 'Devoluciones y desistimiento',
    descripcion: 'Cómo ejercer el derecho de desistimiento y devolver un pedido.',
    revisionLegal: true,
    secciones: [
      { h: 'Derecho de desistimiento', p: ['Con carácter general, quien compra como consumidor a distancia en España y la UE dispone de 14 días naturales para desistir del contrato sin indicar motivo, desde que recibe el pedido.'] },
      { h: 'Excepciones', p: ['La ley prevé excepciones, por ejemplo bienes precintados que no sean aptos para devolver por razones de salud o higiene una vez abiertos, o bienes perecederos. Qué artículos de cada pack se ven afectados depende de su contenido final: {?Revisar según el contenido real de cada pack}.'] },
      { h: 'Cómo desistir', p: ['Comunica tu decisión por escrito a {email}. {?Modelo de formulario de desistimiento}.'] },
      { h: 'Gastos de devolución', p: ['{?Quién asume el coste de la devolución}.'] },
      { h: 'Reembolso', p: ['{?Plazo y método de reembolso conforme a la normativa}.'] },
      { h: 'Productos defectuosos', p: ['{?Garantía legal y procedimiento ante productos defectuosos}.'] }
    ]
  },
  contacto: {
    titulo: 'Contacto',
    descripcion: 'Datos de contacto y atención al cliente.',
    secciones: [
      { h: 'Escríbenos', p: ['Correo electrónico: {email}.', 'Teléfono: {telefono}.'] },
      { h: 'Atención', p: ['Horario: {?Horario de atención}.', 'Plazo de respuesta: {?Plazo de respuesta}.'] }
    ]
  },
  'aviso-legal': {
    titulo: 'Aviso legal',
    descripcion: 'Datos identificativos del titular del sitio web.',
    revisionLegal: true,
    secciones: [
      { h: 'Titular del sitio', p: ['Titular: {titular}.', 'NIF: {nif}.', 'Domicilio: {domicilio}.', 'Correo electrónico: {email}.', 'Teléfono: {telefono}.'] },
      { h: 'Objeto', p: ['Este sitio ({marca}) ofrece packs de regalo para hombres.'] },
      { h: 'Propiedad intelectual y responsabilidad', p: ['{?Redacción legal sobre propiedad intelectual, responsabilidad y legislación aplicable}.'] }
    ]
  },
  condiciones: {
    titulo: 'Condiciones de compra',
    descripcion: 'Condiciones que regulan la compra de packs en la tienda.',
    revisionLegal: true,
    secciones: [
      { h: 'Vendedor', p: ['{titular}, NIF {nif}, {domicilio}. Contacto: {email}.'] },
      { h: 'Productos y precios', p: ['Los precios se muestran en euros con IVA incluido. Los gastos de envío se muestran antes de pagar.'] },
      { h: 'Proceso de compra y pago', p: ['Añade los packs al carrito, revisa el resumen y finaliza la compra. {?Descripción del pago y de la confirmación del pedido; la pasarela de pago aún no está integrada}.'] },
      { h: 'Disponibilidad y preventa', p: ['Algunos packs pueden venderse en preventa; la ficha indica la fecha estimada de envío.'] },
      { h: 'Envío y devoluciones', p: ['Consulta [Envíos](info.html?p=envios) y [Devoluciones y desistimiento](info.html?p=devoluciones).'] },
      { h: 'Reclamaciones', p: ['{?Hojas de reclamaciones y resolución de conflictos, según normativa aplicable}.'] }
    ]
  },
  privacidad: {
    titulo: 'Política de privacidad',
    descripcion: 'Cómo se tratan los datos personales en esta tienda.',
    revisionLegal: true,
    secciones: [
      { h: 'Responsable', p: ['{titular}, NIF {nif}, {domicilio}. Contacto: {email}.'] },
      { h: 'Qué datos se tratan', p: ['Actualmente esta web no recoge datos personales: el contenido del carrito se guarda solo en tu navegador.', 'Cuando se active el pedido y el pago se tratarán datos como nombre, dirección de entrega, correo y teléfono. {?Actualizar al integrar el proceso de compra}.'] },
      { h: 'Finalidad y base legal', p: ['Gestionar pedidos, envíos y atención al cliente (ejecución del contrato) y cumplir obligaciones legales, como las fiscales.'] },
      { h: 'Destinatarios y conservación', p: ['Destinatarios: {?Transportista, pasarela de pago, asesoría, etc.}.', 'Conservación: {?Plazos de conservación}.'] },
      { h: 'Tus derechos', p: ['Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {email}. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).'] }
    ]
  },
  cookies: {
    titulo: 'Política de cookies',
    descripcion: 'Información sobre cookies y almacenamiento local en esta web.',
    revisionLegal: true,
    secciones: [
      { h: 'Qué usa esta web hoy', p: ['El código de esta web no instala cookies ni usa servicios de analítica o publicidad.', 'Usa el almacenamiento local de tu navegador (localStorage) solo para recordar el contenido de tu carrito. Es técnico y necesario para esa función.'] },
      { h: 'Si se añaden cookies no necesarias', p: ['Si se incorporan analítica o publicidad, se pedirá tu consentimiento antes de activarlas y se actualizará esta página. {?Actualizar al añadir analítica o publicidad}.'] },
      { h: 'Cómo borrar los datos', p: ['Puedes eliminar los datos del sitio desde los ajustes de tu navegador.'] }
    ]
  }
};
