# MarineLink Portal – Frontend

MarineLink Portal Frontend is a lightweight, role-based web interface built using **HTML**, **CSS**, and **Vanilla JavaScript**. It connects to the **MarineLink Portal Backend** (Spring Boot + PostgreSQL) and provides dashboards and management tools for Admins, Fishers, Buyers, and Regulators.

---

## Features

### Authentication
- Login using JWT token
- Role-based redirection (Admin, Fisher, Buyer, Regulator)
- LocalStorage session handling

### Admin Panel
- Manage users (view, edit, delete)
- View all listings
- View all transactions
- System-wide dashboard analytics

### Fisher Panel
- Create listings
- Manage own listings
- View transactions involving their listings
- Fisher dashboard analytics (revenue, orders, listings)

### Buyer Panel
- Browse listings
- Purchase listings
- View order history
- Buyer dashboard analytics (spending, orders)

### Regulator Panel
- View system-wide listings and transactions
- Compliance dashboard

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- LocalStorage
- JWT Authentication

---

## Project Structure

```
frontend/
│
├── css/                 → Stylesheets
├── js/                  → API handlers, dashboards, UI logic
├── pages/                → HTML pages for each role
│   ├── admin/
│   ├── fisher/
│   ├── buyer/
│   └── regulator/
├── assets/               → Images/icons
└── index.html            → Login page
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Hades3942/marinelink-portal-frontend.git
cd marinelink-portal-frontend
```

### 2. Configure the API base URL
Update the API endpoint in your `js/` config/API handler file to point to your running backend, e.g.:
```js
const API_BASE_URL = "http://localhost:8080/api";
```

### 3. Run the frontend
Since this is a static HTML/CSS/JS app, you can serve it with any static server, for example:
```bash
# Using VS Code Live Server extension
# or
npx serve .
```

Open `index.html` (or the served URL) in your browser to access the login page.

---

## Authentication Flow

1. User logs in via `index.html` with credentials.
2. Backend returns a JWT token on successful authentication.
3. Token is stored in `localStorage` along with the user's role.
4. User is redirected to their role-specific dashboard (`pages/admin/`, `pages/fisher/`, `pages/buyer/`, or `pages/regulator/`).
5. All subsequent API requests include the JWT token in the `Authorization` header.

---

## Related

- [MarineLink Portal – Backend](#) *(Spring Boot + PostgreSQL API)*
