# 語 · Estudio de japonés — instalación

App personal, sin conexión, para estudiar tu vocabulario y gramática a diario.
Todos tus datos se guardan solo en tu teléfono.

## Camino A — el más rápido (un solo archivo)
Usa `japones-estudio.html`.
1. Pásalo a tu teléfono (por correo, WhatsApp, AirDrop, Google Drive, etc.) y ábrelo.
2. Ábrelo con el navegador (Safari en iPhone, Chrome en Android).
3. Añádelo a la pantalla de inicio:
   - iPhone (Safari): botón Compartir → "Añadir a pantalla de inicio".
   - Android (Chrome): menú ⋮ → "Añadir a pantalla de inicio" / "Instalar app".
4. Ábrelo desde el icono 語. Funciona sin internet.

## Camino B — como app "de verdad" (recomendado, PWA instalable)
Usa la carpeta completa (index.html, manifest.json, sw.js, iconos). Necesita estar
servida por HTTPS. La forma gratis más fácil es GitHub Pages:
1. Crea una cuenta en github.com.
2. Crea un repositorio nuevo (público), por ejemplo `japones`.
3. Sube TODOS los archivos de esta carpeta (Add file → Upload files → arrastra todo → Commit).
4. Settings → Pages → Branch: `main` / carpeta `/root` → Save.
5. Espera 1-2 min. Te dará una URL tipo `https://tu-usuario.github.io/japones/`.
6. Abre esa URL en el móvil y "Añadir a pantalla de inicio" / "Instalar".
   Con este camino la app se instala como PWA y guarda todo para uso sin conexión.

## Guardar tu progreso
En "Progreso" → "Exportar copia" descargas un archivo con todo tu avance y
tus palabras/gramática añadidas. Con "Importar copia" lo restauras o lo pasas a otro móvil.
Hazlo de vez en cuando: si borras el navegador, los datos locales se pierden.
