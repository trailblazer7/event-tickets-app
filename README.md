# Event Tickets App

## Overview

Simplified MVP-style web application that utilizes React, ReactQuery, TypeScript, Tailwind CSS, Vite and Express server

The deployed version can be found at [`https://event-tickets-app.vercel.app/`](https://event-tickets-app.vercel.app/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/trailblazer7/event-tickets-app.git
cd event-tickets-app
npm install
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env (which will be ignored by Git). Set **VITE_API_URL** variable (the url where your server will work) inside your environment

```
cp .env.local.example .env
```

### 3. Run the API server

```bash
npm run server
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Run tests

```bash
npm run test
```

### 6. Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result

## Key Features

- Infinite scroll(pagination). Each time when user scroll down we'll call API for next tickets(10 by default)
- Search Bar. When typing a search query in the input, a search for matching tickets by title and description will be performed
- Layout change based on the **?userType** query parameter: **?userType=local** - show tickets in a grid layout, **?userType=tourist** - show tickets in a list layout(local by default). Example: **http://localhost:5173/?userType=tourist**
