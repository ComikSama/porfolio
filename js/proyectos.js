/* ============================================================
   COMIK SAMA — proyectos.js
   Agregá proyectos NUEVOS al PRINCIPIO de cada array.
   El paginador los ordena y renderiza automáticamente.
   ============================================================ */

/* ----------------------------------------------------------
   PROYECTOS WEB
   Campos:
     name     — nombre del proyecto
     img      — ruta de la imagen (dentro de img/web/)
     desc     — descripción corta
     url      — link al proyecto (o '#' si no hay)
     tags     — array de tecnologías
   ---------------------------------------------------------- */
const WEB_PROJECTS = [
  // ← NUEVOS PROYECTOS VAN ACÁ ARRIBA
  {
    name: 'Hipoteca Segura',
    img: 'img/web/010.webp',
    desc: 'Sitio corporativo para estudio de defensa hipotecaria. Servicios, casos de éxito, equipo y formulario de consulta gratuita integrado.',
    url: 'https://www.hipotecasegura.cl',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Hermes Gestión Inmobiliaria',
    img: 'img/web/009.webp',
    desc: 'Sitio inmobiliario de proyectos de parcelas, formulario de agendamiento, indicadores en tiempo real y dashboard de gestión.',
    url: 'https://hermesgestionin.cl',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
  },
  {
    name: "Angelo's Pizza",
    img: 'img/web/011.webp',
    desc: 'Sitio para cadena de pizzerías con catálogo de variedades, armador de pizza, promociones por canal y pedido vía WhatsApp.',
    url: 'https://angelospizza.cl',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap'],
  },
  {
    name: 'WSAM Rediseño',
    img: 'img/web/004.webp',
    desc: 'Migración desde WordPress a código propio. Mejora notable en SEO, velocidad de carga y experiencia de usuario.',
    url: 'https://www.wsam.cl',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    name: 'Inmobiliaria a medida',
    img: 'img/web/007.webp',
    desc: 'Plataforma sin CMS con panel de administración propio. Gestión de propiedades, estados de venta y arriendo.',
    url: 'https://www.lsweb.cl/tienda',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
  },
  {
    name: 'E-commerce a medida',
    img: 'img/web/006.webp',
    desc: 'Tienda online construida desde cero sin CMS. Carrito, checkout y gestión de productos con control total del código y cero dependencias externas.',
    url: 'https://www.lsweb.cl/tienda',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
  },
  {
    name: 'CV Builder Free',
    img: 'img/web/008.webp',
    desc: 'Generador de CV en tiempo real. El usuario ve los cambios al instante y exporta a PDF optimizado formato A4.',
    url: 'https://comiksama.github.io/cv-builder-free/',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    name: 'LsWeb',
    img: 'img/web/005.webp',
    desc: 'Mi proyecto personal de diseño y desarrollo web. Optimizado para SEO, rendimiento y conversión.',
    url: 'https://www.lsweb.cl',
    tags: ['PHP', 'MySQL', 'JavaScript'],
  },
  {
    name: 'Arancio Publicidad',
    img: 'img/web/001.webp',
    desc: 'Sitio corporativo para agencia publicitaria. Galería de productos, catálogo y sistema de cotizaciones integrado.',
    url: 'https://www.aranciopublicidad.cl',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
  },
  {
    name: 'CotizaFácil — Arancio',
    img: 'img/web/002.webp',
    desc: 'Cotizador dinámico en tiempo real. Selección de productos y materialidad con precio total instantáneo.',
    url: 'https://www.aranciopublicidad.cl/cotizafacil/',
    tags: ['JavaScript', 'PHP', 'MySQL'],
  },
  {
    name: 'SIM — Soluciones Integrales de Mantenimiento',
    img: 'img/web/003.webp',
    desc: 'Landing page para empresa de mantenimiento. Galería de trabajos, integración con Google Maps y formulario de contacto.',
    url: 'https://mantencionessim.cl/',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
  },
];

/* ----------------------------------------------------------
   PROYECTOS DE DISEÑO
   Campos:
     label    — nombre del grupo/proyecto
     images   — array de fotos del proyecto:
       { src, title, caption }
   ---------------------------------------------------------- */
const DESIGN_GROUPS = [
  // ← NUEVOS GRUPOS VAN ACÁ ARRIBA
  {
    label: 'Letreros Volumétricos de Acrílico',
    images: [
      {
        src: 'img/diseno/009.jpg',
        title: 'Alquimia',
        caption:
          'Creacion e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/015.jpg',
        title: 'Pub El Muelle',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/016.jpg',
        title: 'Pub El Muelle',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/017.jpg',
        title: 'Minimarket Dominga',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/018.jpg',
        title: 'Brasas King',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/019.jpg',
        title: 'Johnny´s BBQ y Ahumados',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/020.jpg',
        title: 'Entre Tacos y Brasas',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/026.jpg',
        title: 'Playa Paraiso',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/027.jpg',
        title: 'Importadora Universo',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
      {
        src: 'img/diseno/028.jpg',
        title: 'Importadora Universo',
        caption:
          'Creación e instalación de letrero volumétrico de acrílico con iluminación LED',
      },
    ],
  },
  {
    label: 'Vinil vehicular',
    images: [
      {
        src: 'img/diseno/010.jpg',
        title: 'Vinilado flota CCU',
        caption:
          'Instalación de vinilo en camiones de distribución de bebidas CCU',
      },
      {
        src: 'img/diseno/011.jpg',
        title: 'Vinilado flota CCU',
        caption:
          'Instalación de vinilo en camiones de distribución de bebidas CCU',
      },
    ],
  },
  {
    label: 'Telas PVC',
    images: [
      {
        src: 'img/diseno/012.jpg',
        title: 'Telas PVC',
        caption: 'Savoy - Instalación de telas PVC en local comercial',
      },
      {
        src: 'img/diseno/013.jpg',
        title: 'Telas PVC',
        caption: 'Gigantografia',
      },
      {
        src: 'img/diseno/022.jpg',
        title: 'Telas PVC',
        caption: 'Savoy - Instalación de telas PVC en local comercial',
      },
      {
        src: 'img/diseno/023.jpg',
        title: 'Telas PVC',
        caption: 'Venta Store - Instalación de telas PVC en bastidor métalico',
      },
      {
        src: 'img/diseno/024.jpg',
        title: 'Telas PVC',
        caption: 'Vicuña - Instalación de telas PVC en bastidor',
      },
      {
        src: 'img/diseno/021.jpg',
        title: 'Telas PVC',
        caption: 'Savory - Impresión de telas PVC',
      },
    ],
  },
  {
    label: 'Diseño de Local',
    images: [
      {
        src: 'img/diseno/005.jpg',
        title: 'Identidad visual completa',
        caption: 'Tujina - Diseño de local y aplicaciones',
      },
      {
        src: 'img/diseno/006.jpg',
        title: 'Identidad visual completa',
        caption: 'Tujina - Diseño de local y aplicaciones',
      },
      {
        src: 'img/diseno/007.jpg',
        title: 'Identidad visual completa',
        caption: 'Angelo´s Pizza - Diseño de local y aplicaciones',
      },
      {
        src: 'img/diseno/008.jpg',
        title: 'Identidad visual completa',
        caption: 'Angelo´s Pizza - Diseño de local y aplicaciones',
      },
    ],
  },
  {
    label: 'Branding & Logotipos',
    images: [
      {
        src: 'img/diseno/001.jpg',
        title: 'Logotipo',
        caption: 'Logotipo Angelo´s Pizza',
      },
      {
        src: 'img/diseno/002.jpg',
        title: 'Logotipo',
        caption: 'Logotipo Ovalle-kon',
      },
      {
        src: 'img/diseno/003.jpg',
        title: 'Logotipo',
        caption: 'Logotipo Belmario FMTV Online',
      },
      {
        src: 'img/diseno/004.jpg',
        title: 'Logotipo',
        caption: 'Logotipo Kuromi',
      },
    ],
  },
];
