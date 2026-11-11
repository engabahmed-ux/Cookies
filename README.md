# Cookies — Interactive Menu

A responsive café and cookies menu with a live price calculator. This is a menu showcase, not an online ordering or payment system.

## Features
- Responsive, mobile-first layout designed for QR-code visits.
- Animated hero and CSS-built cookie / drink illustrations.
- Category filtering and product search.
- Add products, adjust quantities, remove items, and clear the selection.
- Live item count and estimated total in EGP.
- No checkout, order submission, or payment integration.

## Run locally
Open `index.html` in a browser, or use any static web server.

## Deploy to Cloudflare Pages
Create a Pages project connected to this GitHub repository. Use:
- Framework preset: None
- Build command: leave empty
- Build output directory: `/`

## Update menu items and prices
Edit the `MENU` array at the top of `app.js`. Each product has:
`id`, `name`, `category`, `price`, `description`, `tag`, and `art`.

**Important:** The included products and prices are starter/demo content, not confirmed shop pricing. Replace them with the actual menu before publishing for customers.

## Files
- `index.html` — page structure and content regions
- `styles.css` — visual system, responsive layout, and animations
- `app.js` — menu data, filters, selection state, and calculator
