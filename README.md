# WSS Hotel (React)

React + Vite version of the WebWanderer hotel POC (the HTML/CSS/JS version is the `wss_hotel_ICJ` project).

## Run

1. Start Apache in XAMPP, with the `wss_hotel_ICJ` project in `htdocs` (it provides the PHP API and the pictures).
2. In this folder:

```
npm install
npm run dev
```

3. Open http://localhost:5173

Requests to `/webwanderer/...` are forwarded to `http://localhost/wss_hotel_ICJ/webwanderer/...` by the proxy in `vite.config.js`.
