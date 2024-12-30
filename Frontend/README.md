````markdown
---

## **Authentication Handlers**:

- `const handleLogin = () => {}`: Handles user login, stores token and role, and displays success or error messages.
- `const handleSignup = () => {}`: Handles user signup and shows success or error notifications.
- `const handleLogout = () => {}`: Logs out the user, clears all stored data, and resets the UI.

## **Seat Management Handlers**:

- `const fetchSeats = () => {}`: Fetches seat data from the backend, updates available and booked seat counts, and refreshes the seat grid.
- `const handleBookSeats = () => {}`: Books the specified number of seats and refreshes the seat grid.
- `const handleResetSeats = () => {}`: Resets all seat bookings (admin-only functionality).

## **State Management**:

- Updates various states (`email`, `password`, `token`, `role`, `seats`, `availableSeats`, `bookedSeats`, `numOfSeats`) using React’s `useState`.

## **Error Handling**

- Displays notifications for:
  - Invalid credentials during login or signup.
  - Unauthorized actions (e.g., booking without logging in).
  - Booking more than 7 seats in one transaction.
  - Server errors or connection issues.

```javascript
const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        toast.error(data.message || "Cannot book more than 7 seats at once ");
        break;
      case 401:
        toast.error(data.message || "Unauthorized: Please log in again.");
        handleLogout();
        break;
      case 403:
        toast.error(
          data.message ||
            "Forbidden: You don't have permission for this action."
        );
        break;
      case 404:
        toast.error(data.message || "User Not Found: Please Signup.");
        break;
      case 500:
        toast.error(data.message || "Server Error: Please try again later.");
        break;
      default:
        toast.error(`Error: ${status} - ${data.message || "Unknown error"}`);
    }
  } else if (error.request) {
    toast.error("No response from server. Please check your connection.");
  } else {
    toast.error(`Unexpected Error: ${error.message}`);
  }
  console.error("Error:", error);
};
```
````

---

## Dependencies

- **Nextjs**: Frontend framework for building UI components.
- **Axios**: For making API requests.
- **React Toastify**: For displaying notifications.
- **dotenv**: For environment variable management.

---

```

```
