const CACHE_NAME = 'quien-miente-v1';

// Lista de archivos esenciales (App Shell) que deben ser cacheados
const urlsToCache = [
  '/', // Importante para la URL raíz
  'index.html',
  'style.css',
  'script.js',
  'multiplayer.js',
  'famosos.js',
  'tematicas.js',
  'manifest.json',
  
  // Archivos de recursos (Asume que están en las rutas correctas)
  // **ADVERTENCIA:** Asegúrate de que estos archivos existan en la carpeta 'img/' y el archivo de fuente en la raíz.
  'img/iconoquienmiente.png', 
  'img/letras-quien-miente.png',
  'img/volver.svg',
  'Biennale Black.otf',
  
  // Incluye un subconjunto de imágenes de famosos si es factible,
  // o confía en la estrategia de caché en tiempo de ejecución para ellos.
  // Ejemplo: 'img/alex_pelao.jpg',
  // Es mejor no incluir TODAS las imágenes de famosos aquí ya que el tamaño del caché sería muy grande.
];


// =========================================================
// 1. INSTALACIÓN: Cachear el "App Shell"
// =========================================================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando y cacheando App Shell...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Añade todos los archivos esenciales al caché
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Forzar la activación del Service Worker inmediatamente
        return self.skipWaiting(); 
      })
  );
});


// =========================================================
// 2. ACTIVACIÓN: Limpiar cachés antiguos
// =========================================================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando y limpiando cachés antiguos...');
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Eliminar cachés que no están en la whitelist
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Tomar control de las páginas no controladas
  );
});


// =========================================================
// 3. RECUPERACIÓN (Fetch): Estrategia de Cache First / Network Fallback
// =========================================================
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones a Socket.IO para evitar errores de cacheo de conexión en tiempo real
  if (event.request.url.includes('socket.io') || event.request.url.includes('quien-miente-server.onrender.com')) {
    return;
  }

  // Estrategia: Primero buscar en el caché, si falla, ir a la red (Cache First)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si encontramos la respuesta en el caché, la devolvemos
        if (response) {
          return response;
        }
        
        // Si no está en caché, intentamos obtenerla de la red
        return fetch(event.request).catch(() => {
          // Si la red también falla y es una solicitud de HTML (navegación),
          // puedes devolver una página offline genérica (opcional)
          if (event.request.mode === 'navigate') {
              // Podrías devolver aquí un response para 'offline.html' si lo tuvieras
          }
        });
      })
  );
});
