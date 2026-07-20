# Panel de administración (Sveltia CMS)

El sitio ahora incluye un panel en **`/admin`** donde se puede crear, editar y borrar
proyectos del portfolio y editar los textos del sitio (Portada, Sobre Mí, Contacto),
subiendo imágenes directamente. Cada cambio guardado se convierte en un commit en
GitHub y Netlify vuelve a publicar el sitio automáticamente.

- URL del panel: `https://TU-SITIO.netlify.app/admin/`
- Login: **Iniciar sesión con GitHub** (solo usuarios con acceso al repositorio pueden guardar)

## Qué se puede editar

| Sección del panel      | Qué controla                                             | Archivos                          |
| ---------------------- | -------------------------------------------------------- | --------------------------------- |
| **Portfolio**          | Crear / editar / borrar proyectos y su galería           | `src/content/portfolio/*.md`      |
| **Contenido → Portada**| Nombre, apellido, subtítulo y botón del inicio           | `src/data/hero.json`              |
| **Contenido → Sobre Mí**| Título, biografía, foto, formación y servicios          | `src/data/about.json`             |
| **Contenido → Contacto**| Encabezado, intro y datos de contacto                   | `src/data/contact.json`           |
| Imágenes subidas       | Se guardan en `public/images` y se sirven desde `/images`| `public/images/`                  |

> Las badges de "Herramientas & Plataformas" y el footer quedaron fijos en el código
> (son elementos de diseño). Si se quieren hacer editables, se pueden mover a un JSON igual que el resto.

## Configuración única del login (una sola vez)

El backend usa **GitHub como fuente de datos** y **Netlify como proveedor de OAuth**
(sin servidores extra). Pasos:

### 1. Crear una OAuth App en GitHub
1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Completar:
   - **Application name**: `Portfolio Valentina CMS`
   - **Homepage URL**: `https://TU-SITIO.netlify.app`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
3. Guardar y copiar el **Client ID** y generar/copiar el **Client Secret**.

### 2. Cargar las credenciales en Netlify
1. En el dashboard de Netlify: sitio → **Site configuration** → **Access & security** →
   **OAuth** (sección *Authentication providers*).
2. **Install provider** → **GitHub** → pegar el **Client ID** y el **Client Secret** del paso anterior.

### 3. Confirmar el repo/rama en el panel
En `public/admin/config.yml` ya está configurado:

```yaml
backend:
  name: github
  repo: FrancoGaggero/portfolio-valentina-bozzone
  branch: master
```

Si cambia el nombre del repo, el dueño o la rama principal, actualizar esos valores.

### 4. Entrar
Abrir `https://TU-SITIO.netlify.app/admin/` → **Iniciar sesión con GitHub** → autorizar.
Listo: ya se pueden gestionar los contenidos.

## Uso local (opcional, sin credenciales)

Para probar el panel en la compu sin configurar GitHub, Sveltia trae un modo local
que edita los archivos del repositorio directamente:

```bash
npm run dev
```

Luego abrir `http://localhost:4321/admin/` y elegir **"Work with Local Repository"**
(requiere un navegador basado en Chrome/Edge). Los cambios se escriben en los archivos locales.
