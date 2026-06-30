// v4 — cache-clearing only, no fetch interception
// This ensures users always get fresh files from the server

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  // Wipe every cache version so nothing stale is ever served
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// No fetch handler — browser fetches everything fresh from network.
// This trades offline support for always-up-to-date files during development.

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/OtterQuests/');
    })
  );
});
