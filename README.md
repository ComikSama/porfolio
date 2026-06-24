# ComikSama Portfolio

Portfolio personal de Christian "Comik" Tapia — Frontend Dev & Diseñador Digital.

## Estructura

```
portfolio/
├── index.html          ← página principal
├── css/
│   └── style.css       ← todos los estilos
├── js/
│   └── main.js         ← lógica: tema, filtros, formulario, scroll reveal
├── img/
│   └── perfil.jpg      ← tu foto (agregar manualmente)
└── CV_CHRISTIAN_TAPIA_2026.pdf  ← tu CV (agregar manualmente)
```

## Archivos que debes agregar tú

1. **`img/perfil.jpg`** — tu foto de perfil (cuadrada, mínimo 200×200px)
2. **`CV_CHRISTIAN_TAPIA_2026.pdf`** — tu CV en PDF

## Activar el formulario de contacto (gratis)

1. Entra a [formspree.io](https://formspree.io) y crea una cuenta gratis
2. Crea un nuevo formulario con tu email
3. Copia el ID que te dan (algo como `xpzgkwqr`)
4. En `index.html`, busca esta línea:
   ```html
   <form ... action="https://formspree.io/f/XXXXXXXX"
   ```
   Y reemplaza `XXXXXXXX` por tu ID real

## Subir a GitHub Pages

```bash
# 1. Clona o entra a tu repo
git clone https://github.com/ComikSama/porfolio.git
cd porfolio

# 2. Copia todos los archivos de esta carpeta al repo
# (reemplaza los existentes)

# 3. Commit y push
git add .
git commit -m "Nuevo diseño portfolio v2"
git push origin main
```

GitHub Pages publicará automáticamente en:
`https://comiksama.github.io/porfolio/`

## Personalización rápida

- **Colores** → `css/style.css`, sección `:root` y `[data-theme="light"]`
- **Proyectos** → `index.html`, sección `PROYECTOS`, agrega/edita los `<article class="proj-card">`
- **Stack** → `index.html`, sección `STACK`, edita los `<span class="chip">`
- **Textos** → directamente en `index.html`
