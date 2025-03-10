# Django React JWT Authentication

A simple application with Django REST Framework backend and React frontend using JWT authentication.

## Features

- User authentication with JWT tokens
- User profile viewing
- Simple menu with login/logout options
- Tailwind CSS for styling

## Project Structure

- `backend/`: Django REST Framework backend
  - `core/`: Main Django project settings
  - `users/`: Django app for user authentication and profiles
- `frontend/`: React frontend
  - `src/`: Source code
    - `components/`: Reusable React components
    - `pages/`: Page components
    - `context/`: React context for state management

## Setup and Installation

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py migrate
   ```

5. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

6. Run the development server:
   ```
   python manage.py runserver
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/users/token/`: Get JWT tokens
- `POST /api/users/token/refresh/`: Refresh JWT token
- `GET /api/users/profile/`: Get user profile
- `PUT /api/users/profile/`: Update user profile

## Technologies Used

- **Backend**:
  - Django
  - Django REST Framework
  - Simple JWT

- **Frontend**:
  - React
  - React Router
  - Axios
  - Tailwind CSS 