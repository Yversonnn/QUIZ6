# Plumbing and Drain Services Platform

Combined repository for the frontend and backend of a Plumbing and Drain Services marketplace platform.

## Repository Structure

- [src](src): React frontend source
- [public](public): frontend static assets
- [backend](backend): Django REST backend source

## Frontend

The frontend is a React application using React Bootstrap and Bootswatch.

### Main Features

- Services list and detail pages
- User sign in and sign up
- Seller application flow
- Admin user management
- Seller dashboard
- User profile and orders
- Subscription screens
- PayPal transaction pages
- AI chatbot interface

### Frontend Setup

1. Install dependencies

	npm install

2. Create a local environment file from [.env.sample](.env.sample)

3. Start frontend

	npm start

4. Run tests

	npm test -- --watchAll=false

5. Build production bundle

	npm run build

## Backend

The backend is a Django REST API with JWT authentication.

### Backend Apps

- `users`: authentication, JWT, custom user model, profile, admin users
- `applications`: seller application lifecycle
- `services`: service CRUD and local image uploads
- `orders`: PayPal transaction logging and order history
- `subscription`: tiers and active subscription tracking
- `chat`: AI chatbot endpoint with subscription-based usage limits

### Backend Setup

1. Go to backend folder

	cd backend

2. Create a local environment file from [backend/.env.sample](backend/.env.sample)

3. Install backend dependencies

	.venv\Scripts\python.exe -m pip install -r requirements.txt

4. Run migrations

	.venv\Scripts\python.exe manage.py migrate

5. Start backend server

	.venv\Scripts\python.exe manage.py runserver

### Backend Base Routes

- `/api/v1/users/`
- `/api/v1/applications/`
- `/api/v1/services/`
- `/api/v1/orders/`
- `/api/v1/subscription/`
- `/api/v1/chat/`

## Environment Files

Sample files only are included in this repository:

- [.env.sample](.env.sample)
- [backend/.env.sample](backend/.env.sample)

Do not commit real `.env` files.

## Repository Notes

- Use one combined repository for frontend and backend
- Keep only `main` or `master` branch
- Use concise commit messages
