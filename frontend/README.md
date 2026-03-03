# Product Management Frontend

Angular standalone application for Product CRUD operations.

## Prerequisites
- Node.js and npm installed
- Angular CLI installed globally: `npm install -g @angular/cli`
- Spring Boot backend running on http://localhost:8080

## Setup Instructions

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open browser and navigate to:
```
http://localhost:4200
```

## Features
- Add new products
- View all products
- Edit existing products
- Delete products

## API Configuration
Backend API URL is configured in `src/environments/environment.ts`
Default: `http://localhost:8080/pro`

## Routes
- `/products/add` - Add new product
- `/products/show` - View all products (default)
- `/products/edit/:id` - Edit product by ID
