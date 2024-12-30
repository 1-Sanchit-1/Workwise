````markdown
---

## Hints for Seat Booking Logic

**Validate Input**:
   - Ensure `numOfSeats` is a positive number.
   - Reject requests for more than 7 seats with an appropriate error message.

**Retrieve Available Seats**:
   - Fetch all unbooked seats (`isBooked: false`) from the database.
   - Sort seats by `rowNumber` and `seatNumber` for logical ordering.

**Check Availability**:
   - If the number of available seats is less than the requested `numOfSeats`, reject the request with the available seat count.

**Prioritize Same Row Allocation**:
   - Loop through each row.
   - Check if the row has enough unbooked seats to satisfy the request.
   - If yes, select those seats and stop searching.

**Fallback to Nearby Allocation**:
   - If no single row has enough seats, pick the closest `numOfSeats` seats from the sorted list.

**Mark Seats as Booked**:
   - Update the selected seats in the database to `isBooked: true` and associate them with the user.
   - Double-check seat availability during the update to avoid race conditions.

**Update User’s Booking History**:
   - Append the newly booked seats to the user's booking record.

**Respond to the User**:
    - If successful, return a success message with the booked seat details.
    - If an error occurs, send an appropriate error response.

---

## API Endpoints

### **User Management**

1. **Signup**  
   **Endpoint**: `POST /signup`  
   **Controller**: `signupController`  
   **Description**: Registers a new user with email and password.  
   **Request Body**:
   ```json
   {
     "email": "user@example.com",
     "password": "securepassword"
   }
   ```
````

2. **Login**  
   **Endpoint**: `POST /login`  
   **Controller**: `loginController`  
   **Description**: Authenticates a user and returns a JWT token and user role.  
   **Request Body**:
   ```json
   {
     "email": "user@example.com",
     "password": "securepassword"
   }
   ```

---

### **Seat Management**

1. **Get Seats**  
   **Endpoint**: `GET /seats`  
   **Controller**: `getSeats`  
   **Description**: Retrieves all seat data, including availability and booking status.  
   **Authentication Required**: Yes (Any user).

```GET /seats
{
  "seats": [
    {
      "id": 161,
      "seatNumber": 1,
      "isBooked": true,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:46:21.116Z"
    },
    {
      "id": 162,
      "seatNumber": 2,
      "isBooked": true,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:46:21.235Z"
    },
    {
      "id": 163,
      "seatNumber": 3,
      "isBooked": true,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:46:21.345Z"
    },
    {
      "id": 164,
      "seatNumber": 4,
      "isBooked": false,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 165,
      "seatNumber": 5,
      "isBooked": false,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 166,
      "seatNumber": 6,
      "isBooked": false,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 167,
      "seatNumber": 7,
      "isBooked": false,
      "rowNumber": 1,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 168,
      "seatNumber": 8,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 169,
      "seatNumber": 9,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 170,
      "seatNumber": 10,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 171,
      "seatNumber": 11,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 172,
      "seatNumber": 12,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 173,
      "seatNumber": 13,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 174,
      "seatNumber": 14,
      "isBooked": false,
      "rowNumber": 2,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 175,
      "seatNumber": 15,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 176,
      "seatNumber": 16,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 177,
      "seatNumber": 17,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 178,
      "seatNumber": 18,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 179,
      "seatNumber": 19,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 180,
      "seatNumber": 20,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 181,
      "seatNumber": 21,
      "isBooked": false,
      "rowNumber": 3,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 182,
      "seatNumber": 22,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 183,
      "seatNumber": 23,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 184,
      "seatNumber": 24,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 185,
      "seatNumber": 25,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 186,
      "seatNumber": 26,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 187,
      "seatNumber": 27,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 188,
      "seatNumber": 28,
      "isBooked": false,
      "rowNumber": 4,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 189,
      "seatNumber": 29,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 190,
      "seatNumber": 30,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 191,
      "seatNumber": 31,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 192,
      "seatNumber": 32,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 193,
      "seatNumber": 33,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 194,
      "seatNumber": 34,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 195,
      "seatNumber": 35,
      "isBooked": false,
      "rowNumber": 5,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 196,
      "seatNumber": 36,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 197,
      "seatNumber": 37,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 198,
      "seatNumber": 38,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 199,
      "seatNumber": 39,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 200,
      "seatNumber": 40,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 201,
      "seatNumber": 41,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 202,
      "seatNumber": 42,
      "isBooked": false,
      "rowNumber": 6,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 203,
      "seatNumber": 43,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 204,
      "seatNumber": 44,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 205,
      "seatNumber": 45,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 206,
      "seatNumber": 46,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 207,
      "seatNumber": 47,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 208,
      "seatNumber": 48,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 209,
      "seatNumber": 49,
      "isBooked": false,
      "rowNumber": 7,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 210,
      "seatNumber": 50,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 211,
      "seatNumber": 51,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 212,
      "seatNumber": 52,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 213,
      "seatNumber": 53,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 214,
      "seatNumber": 54,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 215,
      "seatNumber": 55,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 216,
      "seatNumber": 56,
      "isBooked": false,
      "rowNumber": 8,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 217,
      "seatNumber": 57,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 218,
      "seatNumber": 58,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 219,
      "seatNumber": 59,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 220,
      "seatNumber": 60,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 221,
      "seatNumber": 61,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 222,
      "seatNumber": 62,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 223,
      "seatNumber": 63,
      "isBooked": false,
      "rowNumber": 9,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 224,
      "seatNumber": 64,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 225,
      "seatNumber": 65,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 226,
      "seatNumber": 66,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 227,
      "seatNumber": 67,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 228,
      "seatNumber": 68,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 229,
      "seatNumber": 69,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 230,
      "seatNumber": 70,
      "isBooked": false,
      "rowNumber": 10,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 231,
      "seatNumber": 71,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 232,
      "seatNumber": 72,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 233,
      "seatNumber": 73,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 234,
      "seatNumber": 74,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 235,
      "seatNumber": 75,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 236,
      "seatNumber": 76,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 237,
      "seatNumber": 77,
      "isBooked": false,
      "rowNumber": 11,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 238,
      "seatNumber": 78,
      "isBooked": false,
      "rowNumber": 12,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 239,
      "seatNumber": 79,
      "isBooked": false,
      "rowNumber": 12,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    },
    {
      "id": 240,
      "seatNumber": 80,
      "isBooked": false,
      "rowNumber": 12,
      "createdAt": "2024-12-30T08:19:10.524Z",
      "updatedAt": "2024-12-30T08:19:10.524Z"
    }
  ]
}
```

2. **Book Seats**  
   **Endpoint**: `POST /seats/book`  
   **Controller**: `bookingController`  
   **Description**: Books the specified number of seats.  
   **Authentication Required**: Yes (Roles: `user`, `admin`).  
   **Request Body**:

   ```json
   {
     "numOfSeats": 5
   }
   ```

3. **Reset Seats**  
   **Endpoint**: `POST /seats/reset`  
   **Controller**: `resetSeatsController`  
   **Description**: Resets all seat bookings (admin-only).  
   **Authentication Required**: Yes (Role: `admin`).

---

## Authentication Middleware

### `auth(roles)`

- Validates the JWT token provided in the `Authorization` header.
- Ensures the user has the required role to access the endpoint.  
  **Roles**:
  - `"user"`: General users who can book seats.
  - `"admin"`: Admin users who can manage seat bookings (e.g., reset seats).

---

## Dependencies

- **Express**: Web framework for building the backend.
- **jsonwebtoken**: For JWT-based authentication.
- **PostgreSQL**: Database for storing user and seat information.
- **dotenv**: For managing environment variables.

---

```

```
