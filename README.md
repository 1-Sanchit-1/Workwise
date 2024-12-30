## Table of Contents

1. [Problem Description](#problem-description)
2. [Features](#features)
3. [Built With](#built-with)
4. [Installation and Setup](#installation-and-setup)

- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)

5. [Usage](#usage)
6. [Contact](#contact)
7. [Project Links](#project-links)

---

## Problem Description

The Train Seat Booking System allows users to:

- Book seats in a single-coach train with 80 seats.
- Reserve up to 7 seats at a time.
- Automatically allocate seats in the same row, or nearby if unavailable.
- Log in or sign up to access the system.

**Seat Arrangement:**

- 80 seats per coach.
- Rows of 7 seats each, except the last row with 3 seats.

---

## Features

- Efficient seat allocation system.
- User authentication (login and signup).
- Support for booking up to 7 seats in one transaction.
- Booking management (reset bookings by admin({email:sanchit@gmail.com,password:102030})).

---

## Built With

- **Frontend**: Next.js , Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (Deployment : Vercel Postgres)
- **Backend Deployment**: Render  
  URL: [Backend on Render](https://workwise-backend-zf1b.onrender.com/)
- **Frontend Deployment**: Vercel  
  URL: [Frontend on Vercel](https://workwise-e4nq.vercel.app/)

---

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables in a `.env` file:
   ```env
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Run the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Update the API base URL in the index.js file:
   ```javascript
   API_BASE_URL=<backend_api_url>
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. **Login or Signup**:

- Enter your email and password to log in or sign up.
- Upon successful login, you'll receive a token for further actions.

2. **View Seats**:

- After logging in, see the available and booked seats displayed in a grid.

3. **Book Seats**:

- Enter the number of seats to book (maximum 7).
- Click "Book Seat(s)" to confirm the booking.

4. **Admin Functionality**:

- Admins can reset all seat bookings using the "Reset Seats" button.

5. **Logout**:

- Click the "Logout" button to end the session.

---

## Contact

- **Name**: Sanchit Gupta
- **Email**: [sanchitguptaiiitl@gmail.com](mailto:sanchitguptaiiitl@gmail.com)
- **GitHub**: [1-Sanchit-1](https://github.com/1-Sanchit-1)

---

## Project Links

- **Frontend Repository**: [GitHub Link](https://github.com/1-Sanchit-1/Workwise)
- **Live Frontend**: [Frontend on Vercel](https://workwise-e4nq.vercel.app/)
- **Live Backend**: [Backend on Render](https://workwise-backend-zf1b.onrender.com/)

---
