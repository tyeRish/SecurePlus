const CACHE_NAME = 'secplus-v2';
const ASSETS = [
  './',
  './index.html',
  './labs.html',
  './manifest.json',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// INSTALL — cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// PUSH NOTIFICATIONS — receive and display
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'SEC+ OPS', body: 'Time to drill.' };
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './assets/icons/icon-192.png',
      badge: './assets/icons/icon-96.png',
      tag: 'secplus-tidbit',
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: 'Deep Dive →' },
        { action: 'dismiss', title: 'Later' }
      ]
    })
  );
});

// NOTIFICATION CLICK — open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// SCHEDULED TIDBITS — check every hour via sync
self.addEventListener('periodicsync', e => {
  if (e.tag === 'tidbit-reminder') {
    e.waitUntil(sendTidbitNotification());
  }
});

const NOTIFICATION_TIDBITS = [
  { title: "⚡ CRYPTO BRIEF", body: "ECB mode is broken — identical plaintext = identical ciphertext. Always use GCM." },
  { title: "⚡ ATTACK BRIEF", body: "MFA Fatigue: attacker spams push notifications until you approve one. Defense: number matching." },
  { title: "⚡ FORENSICS BRIEF", body: "Collect RAM before pulling the plug. Fileless malware lives only in memory." },
  { title: "⚡ AUTH BRIEF", body: "FIDO2/Passkeys are phishing-proof. The key won't auth on a fake domain — architecturally impossible." },
  { title: "⚡ PROTOCOL BRIEF", body: "SFTP=port 22. HTTPS=443. LDAPS=636. RDP=3389. Know your ports cold." },
  { title: "⚡ GOVERNANCE BRIEF", body: "RTO = max downtime. RPO = max data loss. BCP is the plan, DRP is the technical restore." },
  { title: "⚡ ATTACK BRIEF", body: "Smishing = SMS phishing. Vishing = voice phishing. Channel determines the name." },
  { title: "⚡ CRYPTO BRIEF", body: "Rainbow tables are defeated by salting. Unique random salt per password = precomputed tables useless." }
];

async function sendTidbitNotification() {
  const t = NOTIFICATION_TIDBITS[Math.floor(Math.random() * NOTIFICATION_TIDBITS.length)];
  return self.registration.showNotification(t.title, {
    body: t.body,
    tag: 'secplus-tidbit',
    actions: [{ action: 'open', title: 'Deep Dive →' }]
  });
}
