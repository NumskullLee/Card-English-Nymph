# 🔗 Página de Links

Una página estilo Linktree para GitHub Pages con fondo animado.

## Cómo usar

### 1. Personalizar tus links

Abre `index.html` y edita la sección de links. Cada botón es un bloque `<a>`:

```html
<a href="https://TU-URL-AQUI" class="link-btn" target="_blank" rel="noopener">
    Texto del botón
</a>
```

- Para **agregar** un botón: copia y pega uno de los bloques `<a>` existentes.
- Para **quitar** un botón: elimina el bloque `<a>` correspondiente.
- Para **cambiar el link**: modifica el `href`.
- Para **cambiar el texto**: modifica el texto entre las etiquetas.

### 2. Personalizar tu perfil

En `index.html`, cambia:
- La imagen del avatar (atributo `src` del `<img>`)
- Tu nombre (dentro del `<h1>`)
- Tu bio (dentro del `<p class="bio">`)

### 3. Deploy en GitHub Pages

1. Crea un repositorio en GitHub (puede ser `tu-usuario.github.io` o cualquier nombre).
2. Sube estos archivos al repositorio.
3. Ve a **Settings → Pages** y selecciona la rama `main` como source.
4. Tu página estará disponible en `https://tu-usuario.github.io/nombre-repo/`.

### 4. Dominio personalizado

1. Edita el archivo `CNAME` y pon tu dominio (ej: `links.tudominio.com`).
2. En tu proveedor de DNS, agrega un registro:
   - **CNAME** → `tu-usuario.github.io` (para subdominios como `links.tudominio.com`)
   - **A** → IPs de GitHub Pages (para dominio raíz):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. En GitHub → Settings → Pages, escribe tu dominio custom y activa "Enforce HTTPS".

### 5. Personalizar colores del fondo

Edita `background.js` y cambia los colores en el array `COLORS` y en los gradientes.
Edita `style.css` para cambiar los estilos de los botones.

## Estructura

```
├── index.html      ← Página principal (edita tus links aquí)
├── style.css       ← Estilos visuales
├── background.js   ← Animación del fondo
├── CNAME           ← Dominio personalizado
└── README.md       ← Este archivo
```
