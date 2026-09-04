# CampusConnect

CampusConnect is a responsive university events platform built for students, staff, faculty, visitors, and event coordinators. It brings campus activities into one place so users can discover events, browse details, save favorites, explore the gallery, and contact the university community.

The project was built by **Eng. Anas Al-Rifai**.

## Project Overview

The application provides a clear and accessible way to:

- Discover academic, cultural, research, alumni, and workshop events.
- Search events by title, description, or tags.
- Filter and sort the event catalogue.
- Open a complete event details view.
- Save favorite events in the browser.
- Browse event images through the gallery.
- Explore events through an interactive monthly calendar.
- Read about the university, its strategy, traditions, and organizing bodies.
- Contact the university community through email, phone, WhatsApp, Facebook, and a campus map.
- Submit event feedback with a five-star rating.
- Register interest in joining the university community.

## Main Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage with banners, highlights, and upcoming events. |
| `/about` | University information, vision, strategy, traditions, and organizing bodies. |
| `/events` | Searchable and filterable event catalogue. |
| `/events/:id` | Details for one event. |
| `/calendar` | Interactive monthly calendar with event images and details. |
| `/gallery` | Event image gallery with filtering and preview behavior. |
| `/feedback` | Event feedback form with rating and comments. |
| `/contact` | Contact details, coordinators, social links, and map. |
| `/register` | Registration form for joining the community. |

## Features

### Event Catalogue

The events page supports text search, category filtering, sorting, progressive loading, bookmarks, and event detail navigation. Event data is loaded from JSON files in `public/data`.

### Interactive Calendar

The calendar includes:

- Previous and next month navigation.
- A button to return to the current month.
- Search and category filters.
- Event count for the selected month.
- Event images shown directly inside calendar cells.
- A detail dialog with the event image, description, date, location, and links.

### Feedback Delivery

The feedback form collects the user's name, email, user type, attended event, rating, and optional comments. Submissions are sent through FormSubmit to:

`anasahmedmohammedkasem@gmail.com`

The first submission requires confirming the recipient email through the activation message sent by FormSubmit. A local copy is also stored in the browser under `campusconnect-feedback`.

### Contact and Social Links

The contact page and footer include:

- Email: `anasahmedmohammedkasem@gmail.com`
- WhatsApp link using the configured number.
- Official Facebook website link.
- University phone and address.
- Google Maps embed and coordinator information.

## Technology Stack

- React 18
- React Router 6
- Create React App and `react-scripts`
- Bootstrap 5
- React Icons
- CSS with responsive media queries
- JSON files as the main content source
- Browser `localStorage` for bookmarks, likes, and submitted feedback copies
- FormSubmit for feedback delivery

This is primarily a client-side application. It does not include a custom backend or database.

## Project Structure

```text
src/
├── models/                 Data access and event filtering logic
├── viewmodels/             Hooks and view state logic
├── views/
│   ├── components/         Reusable interface components
│   ├── pages/              Application pages
│   └── styles/             Page and component stylesheets
├── App.js                  Global layout with navbar, routes, and footer
├── index.js                React entry point
└── routes.js               Route definitions and page titles

public/
├── data/                   JSON content files
├── images/                 Local image assets
└── index.html              Public HTML template
```

## Data Sources

The application reads content from these public files:

- `public/data/Events.json` - main event catalogue.
- `public/data/calendar.json` - calendar event data.
- `public/data/gallery.json` - gallery entries.
- `public/data/About.json` - about page content.
- `public/data/contacts.json` - contact information.
- `public/data/coordinators.json` - coordinator profiles.
- `public/data/banners.json` - homepage banner content.

Keep file names and letter casing unchanged. This is important when deploying to Linux-based hosting.

## Local Development

### Requirements

- Node.js and npm.
- Internet access for external images, the map embed, and FormSubmit feedback delivery.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Open `http://localhost:3000`. If the port is already in use, Create React App can use another port such as `3001`.

### Create a production build

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Deployment Notes

- Deploy the generated `build` directory to a static hosting provider.
- Configure the host to redirect unknown routes to `index.html` so React Router routes work after refresh.
- Do not commit `.env` files, credentials, API keys, or private configuration.
- `node_modules`, `.env`, and `build` are excluded through `.gitignore`.
- External image URLs must remain reachable for event and gallery images to display.

## Browser Storage

The following browser storage values are used by the application:

- `localStorage` bookmarks for saved events.
- `localStorage` values for local likes and event interactions.
- `campusconnect-feedback` for locally saved feedback copies.

Clearing browser storage removes these local values. It does not remove the original JSON content.

## Project Status

The application is a frontend-focused university events platform with static JSON content and lightweight external form delivery. A future backend could replace the JSON files, provide authenticated administration, and store feedback in a central database.

## Author

**Eng. Anas Al-Rifai**

CampusConnect is built for the university community.
