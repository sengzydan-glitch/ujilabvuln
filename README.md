# VulnLab — Web Security Playground

Static browser-only security training simulator. Files are separated:

- `index.html` — dashboard and parameter/input/query demonstrations
- `login.html` — separate fictional login lab
- `css/style.css`, `css/login.css` — styling
- `js/app.js`, `js/login.js` — client-side demonstrations

## Run

Open `index.html` in a browser, or serve this folder locally:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Login lab

Open `login.html` or click **Login Lab** in the top navigation.

Fictional demo accounts:
- `admin` / `admin123`
- `member` / `member123`

The login page demonstrates username enumeration, weak demo passwords, and a simple in-page failed-attempt lockout counter. All logic runs in browser JavaScript; it does not send credentials to a server or perform password guessing.

## Parameter 7

In Record Viewer on the dashboard, load ID `7` to see the simulated missing-object-authorization scenario.

## Scope

All scenarios are client-side simulations. There is no backend, database, real authentication, executable XSS, or real SQL injection. For a real application, enforce authorization server-side, use generic login errors, store salted password hashes with a suitable password-hashing algorithm, and apply server-side rate limiting.
