# SEC+ Operator

A mobile-first study app for the **CompTIA Security+ SY0-701** certification exam. Built as a Progressive Web App (PWA) with a native Android wrapper via Capacitor — ready for Google Play Store distribution.

## Features

- **Practice Exam** — 20 randomized questions, 45-minute timer, full domain coverage
- **Quick Fire** — 10 questions, 15-minute rapid drill
- **Lessons** — 6 in-depth topic modules (encryption, network security, IAM, IR, GRC, wireless)
- **Intel Feed** — Rotating security briefings with deep-dive details
- **Performance Labs** — Interactive hands-on exercises:
  - Attack Classification (drag & drop)
  - Port Number Recall (fill-in)
  - Crypto Tool Matching (drag & drop)
  - Firewall Rule Builder (ACL scenarios)
  - Incident Response Sequencing (PICERL ordering)
  - Threat Scenario Analysis (multi-part cases)
- **Offline Support** — Full offline capability via Service Worker
- **Study Reminders** — Push notifications with security tidbits
- **Progress Tracking** — Persistent stats, domain breakdowns, missed question review

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| PWA | Service Worker, Web App Manifest |
| Native Android | Capacitor 6 |
| State | localStorage |
| Fonts | Orbitron, Rajdhani, Share Tech Mono |

## Project Structure

```
SecurePlus/
├── www/                        # Web source (PWA)
│   ├── index.html              # Main app (home, quizzes, lessons, intel)
│   ├── labs.html               # Performance labs
│   ├── sw.js                   # Service Worker (caching + notifications)
│   ├── manifest.json           # PWA manifest
│   └── assets/
│       └── icons/              # App icons (48–512px, maskable variants)
├── android/                    # Capacitor Android project
│   └── app/                    # Android Studio app module
├── capacitor.config.json       # Capacitor configuration
├── package.json
└── .gitignore
```

## Getting Started

### Run in Browser

```bash
npm install
npm run serve
# Open http://localhost:3000
```

### Build for Android (Play Store)

**Prerequisites**: [Android Studio](https://developer.android.com/studio) + JDK 17+

```bash
npm install

# Sync web assets to Android project
npm run cap:sync

# Open in Android Studio to build APK/AAB
npm run cap:android
```

In Android Studio:
1. **Build → Generate Signed Bundle/APK**
2. Choose **Android App Bundle (.aab)** for Play Store
3. Create or use an existing keystore
4. Upload the `.aab` to [Google Play Console](https://play.google.com/console)

### Add More Questions / Content

Questions are in `www/index.html` in the `QUESTIONS` array. Each entry:

```javascript
{
  id: 75,
  domain: 'Implementation',  // One of the 5 SY0-701 domains
  text: 'Question text here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correct: 0,                // Index of correct answer
  explanation: 'Why this is correct...'
}
```

Lessons are in the `LESSONS` array. Intel tidbits are in `TIDBITS`.

## Play Store Checklist

- [x] PWA manifest with proper icons (192px + 512px, maskable)
- [x] Service Worker with offline support
- [x] Capacitor Android project initialized
- [x] App ID: `com.tyerish.secplusoperator`
- [ ] App signing keystore (generate with: `keytool -genkey -v -keystore secplus.keystore -alias secplus -keyalg RSA -keysize 2048 -validity 10000`)
- [ ] Privacy Policy URL (required for Play Store)
- [ ] Play Store screenshots (phone + 7" tablet)
- [ ] Play Store listing: title, description, category (Education)

## Domains Covered (SY0-701)

| Domain | Weight |
|--------|--------|
| Threats, Attacks & Vulnerabilities | 22% |
| Architecture & Design | 18% |
| Implementation | 25% |
| Operations & Incident Response | 16% |
| Governance, Risk & Compliance | 19% |

## License

MIT — see [LICENSE](LICENSE) for details.
